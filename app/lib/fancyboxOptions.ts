// The trigger anchors always point at the raw, untransformed Shopify CDN
// image (no `?width=` param), so Fancybox's modal `<img>` would otherwise
// always load the full original regardless of viewport/DPR. Build a real
// srcset from Shopify's `width` transform param so the lightbox picks an
// appropriately sized image, same as the on-page thumbnails do.
const RESPONSIVE_IMAGE_WIDTHS = [640, 960, 1280, 1600, 1920, 2400, 3000];

function buildResponsiveImageUrl(src: string, width: number): string {
  const url = new URL(src);
  url.searchParams.set('width', String(width));
  return url.href;
}

function buildResponsiveSrcSet(src: string): string {
  return RESPONSIVE_IMAGE_WIDTHS.map(
    (width) => `${buildResponsiveImageUrl(src, width)} ${width}w`,
  ).join(', ');
}

function pickWidthForViewport(): number {
  const needed = Math.round(
    window.innerWidth * (window.devicePixelRatio || 1),
  );
  return (
    RESPONSIVE_IMAGE_WIDTHS.find((width) => width >= needed) ??
    RESPONSIVE_IMAGE_WIDTHS[RESPONSIVE_IMAGE_WIDTHS.length - 1]
  );
}

// Per-phase content for the zoom toggle button - what each phase's *next*
// click will do. `label` shows the target zoom level below the icon, on
// hover only; the 3rd phase only zooms back out, so it gets no label.
const ZOOM_BUTTON_CONTENT = {
  base: {label: 'Full', direction: 'in'},
  cover: {label: '100%', direction: 'in'},
  full: {label: '', direction: 'out'},
} as const;

type ZoomPhase = keyof typeof ZOOM_BUTTON_CONTENT;

// `.f-button` is a fixed-size square icon button with `overflow:hidden` -
// this positions the label as a floating pill below it (not affecting the
// button's own box or the icon's centering) and fades it in only on
// hover. Also adds a small right margin so the button doesn't sit flush
// against the adjacent close button in the toolbar's right-hand group.
// Needs a real stylesheet rather than inline styles since inline styles
// can't express `:hover`; injected once, client-side only (this module's
// top-level code also runs during SSR, where `document` doesn't exist),
// and only from a callback that's guaranteed to run in the browser once
// the lightbox has actually opened.
function ensureZoomToggleStyles(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById('zoom-toggle-label-style')) return;
  const style = document.createElement('style');
  style.id = 'zoom-toggle-label-style';
  style.textContent = `
    [data-fb-zoom-toggle] { overflow: visible; margin-right: 8px; }
    [data-fb-zoom-toggle] .zoom-toggle-label {
      position: absolute;
      top: 100%;
      left: 50%;
      margin-top: 4px;
      box-sizing: border-box;
      width: var(--f-button-width, 46px);
      padding: 2px 0;
      border-radius: var(--f-button-border-radius, 0);
      background: var(--f-button-bg, rgba(54, 54, 54, 0.75));
      color: var(--f-button-color, #ddd);
      font-size: 11px;
      font-weight: 600;
      line-height: 1.2;
      letter-spacing: 0.02em;
      text-align: center;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transform: translateX(-50%) translateY(-4px);
      transition: opacity 0.15s ease, transform 0.15s ease;
    }
    [data-fb-zoom-toggle]:hover .zoom-toggle-label {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  `;
  document.head.appendChild(style);
}

function zoomButtonInnerHtml(phase: ZoomPhase): string {
  const {label, direction} = ZOOM_BUTTON_CONTENT[phase];
  const plus =
    direction === 'in' ? '<line x1="11" y1="8" x2="11" y2="14"/>' : '';
  const labelSpan = label
    ? `<span class="zoom-toggle-label">${label}</span>`
    : '';
  return `<svg>${plus}<circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>${labelSpan}`;
}

function zoomButtonTpl(phase: ZoomPhase): string {
  return `<button data-fb-zoom-toggle class="f-button">${zoomButtonInnerHtml(phase)}</button>`;
}

function updateZoomButton(button: HTMLElement, phase: ZoomPhase): void {
  button.innerHTML = zoomButtonInnerHtml(phase);
}

// Shared by both the "back to fit" click branch and the slide-change
// handler below: restores the capped srcset and clears the true-original
// width/height attributes, so a slide left zoomed-in doesn't keep holding
// the full-resolution original in memory once it's no longer showing it.
function resetSlideZoom(slide: any): void {
  const img = slide?.panzoomRef?.getContent();
  if (!img) return;
  if (slide.srcset) {
    img.srcset = slide.srcset;
    img.sizes = slide.sizes || '';
  }
  img.removeAttribute('width');
  img.removeAttribute('height');
  slide.zoomPhase = 'base';
}

// The single 3-stop zoom cycle (fit -> full/"cover" -> 100% -> back to
// fit), shared by the toolbar button and by clicking the image directly -
// both should behave identically, so both just call this. `center`
// (client coordinates) anchors the zoom-in around wherever the user
// actually clicked on the image, rather than always the middle - passed
// through untouched to Panzoom's own `zoomTo` action, which already
// supports this. Not used for the final "back to fit" step, where
// recentering the whole image is what you'd actually want.
function advanceZoomPhase(
  carousel: any,
  center?: {x: number; y: number},
): void {
  const slide = carousel.getPage?.()?.slides?.[0];
  const panzoom = slide?.panzoomRef;
  const img = panzoom?.getContent();
  if (!panzoom || !slide || !img) return;

  // Panzoom only finishes creating its zoom/pan tween once the image has
  // actually finished loading - execute() is a silent no-op before that.
  // Without this guard, tapping the image while it's still loading (rare
  // locally, where these images are already warm in the browser cache
  // from repeated dev testing, but common on a real visitor's first,
  // real-network production load) would still advance slide.zoomPhase
  // and the button's label even though nothing visibly changed - so the
  // next tap, and Panzoom's own first real render once loading finishes,
  // both land a step ahead of what the user actually sees. That's what
  // produces a phantom zoom-in-then-bounce-back on that first tap only.
  if (!panzoom.getTween()) return;

  const button = carousel
    .getContainer?.()
    ?.querySelector('[data-fb-zoom-toggle]');
  const phase: ZoomPhase = slide.zoomPhase || 'base';

  if (phase === 'base') {
    slide.zoomPhase = 'cover';
    if (button) updateZoomButton(button, 'cover');
    panzoom.execute('zoomTo', {scale: panzoom.getScale('cover'), center});
    return;
  }

  if (phase === 'cover') {
    slide.zoomPhase = 'full';
    if (button) updateZoomButton(button, 'full');

    // Our srcset caps out at RESPONSIVE_IMAGE_WIDTHS' largest tier
    // (3000px), which is still short of most source photos' true
    // resolution. Swap in the uncapped original (slide.src, never
    // touched by the srcset-building above) and derive the target scale
    // from values we already know: the viewport's currently-rendered
    // pixel width is always (current scale) * (fit-width in CSS px), so
    // fit-width = renderedPx / current. The scale that shows the
    // swapped-in image's true native width in that same fit-width box is
    // trueNaturalWidth * current / renderedPx.
    const current = panzoom.getTransform(true).scale;
    const viewport = panzoom.getViewport();
    const renderedPx = parseFloat(viewport.style.width) || 0;

    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
    img.src = slide.src;

    // This element previously had srcset/sizes for responsive selection,
    // and even after clearing those attributes its own naturalWidth
    // keeps reporting a density-adjusted size instead of the true file
    // dimensions - so probe the real size with a brand new, stateless
    // Image (resolves instantly, already in the HTTP cache from the swap
    // above).
    //
    // Just computing our own correct scale from that isn't enough on its
    // own, though: Panzoom's *internal* zoom ceiling (maxScale=1, i.e.
    // its own idea of "full") is computed from this same element's
    // contaminated naturalWidth too, via width/height attributes it
    // checks before falling back to naturalWidth. Left cleared, our
    // correct (larger) target scale exceeds Panzoom's own (wrongly
    // small) ceiling and its bounds-safety logic snaps it back down.
    // Setting the attributes to the *true* probed dimensions makes
    // Panzoom's internal ceiling agree with our target instead of
    // fighting it.
    const probe = new Image();
    const zoomToTrueFull = (trueWidth: number, trueHeight: number) => {
      if (trueWidth && trueHeight) {
        img.setAttribute('width', String(trueWidth));
        img.setAttribute('height', String(trueHeight));
      }
      const trueScale =
        renderedPx && trueWidth
          ? (trueWidth * current) / renderedPx
          : panzoom.getScale('full');
      panzoom.execute('zoomTo', {scale: trueScale, center});
    };
    probe.onload = () =>
      zoomToTrueFull(probe.naturalWidth, probe.naturalHeight);
    probe.onerror = () => zoomToTrueFull(0, 0);
    probe.src = slide.src;
    return;
  }

  // phase === 'full' -> back to fit. Restore the capped srcset so we're
  // not holding a multi-megabyte original in memory while zoomed out,
  // and clear the true-original width/height attributes set above - left
  // in place, they'd make the next visit to this slide's getScale
  // ('cover') think the true original is still loaded.
  resetSlideZoom(slide);
  if (button) updateZoomButton(button, 'base');
  panzoom.execute('zoomTo', {scale: panzoom.getScale('base')});
}

export const fancyboxOptions = {
  on: {
    // Fires before Carousel builds each slide's <img>, so mutating the
    // slide objects here (rather than the DOM later) is race-free: the
    // Zoomable plugin reads `srcset`/`sizes` straight off the slide when
    // it constructs the modal image the first and only time.
    //
    // This also warms the browser's HTTP cache for every image as soon as
    // the gallery opens (Fancybox itself only builds/lazy-loads slides near
    // the current index) so swiping is served from cache instead of
    // waiting on a fresh request — using the same viewport-appropriate
    // size the modal <img> will actually request, not the raw original.
    //
    // All of these prefetches fire before the Carousel below has built the
    // visible slide's real <img> (which is what sets fetchPriority "high"
    // in the `render` handler), so without help here every other slide's
    // fetch — issued at default priority in plain array order — can end up
    // competing with, or effectively winning over, the one image the user
    // is actually waiting to see. Explicitly prioritize the opened slide's
    // request first, then its immediate neighbors (fetched right away at
    // normal priority, since swiping to either is the most likely next
    // action), and defer/deprioritize everything else so the visible image
    // always wins the race.
    initSlides: (_fb, slides) => {
      const width = pickWidthForViewport();
      const startIndex = _fb.getOptions().startIndex || 0;
      const total = slides.length;

      for (const slide of slides) {
        if (!slide.src) continue;
        slide.srcset = buildResponsiveSrcSet(slide.src);
        slide.sizes = '100vw';
      }

      const prefetch = (src: string, priority: 'high' | 'auto' | 'low') => {
        const img = new Image();
        // @ts-ignore – new attribute in modern browsers
        img.fetchPriority = priority;
        img.src = buildResponsiveImageUrl(src, width);
      };

      // The carousel wraps (`infinite: true`), so "next"/"previous" wrap
      // around the ends of the array too.
      const neighborIndexes =
        total > 1
          ? new Set([(startIndex - 1 + total) % total, (startIndex + 1) % total])
          : new Set<number>();
      const priorityIndexes = new Set([startIndex, ...neighborIndexes]);

      const currentSrc = slides[startIndex]?.src;
      if (currentSrc) prefetch(currentSrc, 'high');

      for (const index of neighborIndexes) {
        const src = slides[index]?.src;
        if (src) prefetch(src, 'auto');
      }

      for (const [index, slide] of slides.entries()) {
        if (priorityIndexes.has(index) || !slide.src) continue;
        const src = slide.src;
        const deferredPrefetch = () => prefetch(src, 'low');

        if (typeof requestIdleCallback === 'function') {
          requestIdleCallback(deferredPrefetch);
        } else {
          setTimeout(deferredPrefetch, 0);
        }
      }
    },
  },
  placeFocusBack: false,
  Carousel: {
    on: {
      // Fires whenever slides are (re)rendered/positioned. Only used for
      // loading hints here — the responsive srcset/sizes are already set
      // on the slide objects above.
      render: (_carousel, slides) => {
        ensureZoomToggleStyles();
        for (const slide of slides) {
          const img = slide.el?.querySelector(
            'img, picture img',
          ) as HTMLImageElement | null;
          if (!img) continue;

          img.loading = 'eager'; // don’t lazy the modal image
          // @ts-ignore – new attribute in modern browsers
          img.fetchPriority = 'high'; // promote in Chromium
          img.decoding = 'sync'; // decode sooner
        }

        // Clicking the image itself should cycle through the same 3
        // stops as the toolbar button - Panzoom's own default click
        // behavior is disabled below (clickAction: false) specifically so
        // this is the only thing that runs on click, rather than both
        // firing and fighting over the scale.
        //
        // Delegated on the carousel's own (stable, never recreated)
        // container rather than bound directly to each slide's content
        // element: Panzoom can recreate that element between renders,
        // which would silently defeat a per-element "already bound" flag
        // and end up attaching a second listener - causing one real click
        // to fire the cycle twice. Guarded on the container itself so this
        // still only gets attached once per gallery session.
        const container = _carousel.getContainer?.();
        if (container && !container.dataset.zoomClickBound) {
          container.dataset.zoomClickBound = 'true';
          container.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            if (!target) return;
            if (target.closest('[data-fb-zoom-toggle]')) return; // toolbar button handles its own click
            if (!target.closest('.f-panzoom__viewport')) return; // only clicks on the actual image
            advanceZoomPhase(_carousel, {x: event.clientX, y: event.clientY});
          });
        }
      },
      // Fires when the active slide changes. Panzoom already resets a
      // slide's *visual* zoom back to fit once it's no longer active, but
      // doesn't know about our own zoomPhase tracking or the srcset/
      // width/height swaps the zoom button makes - without this, swiping
      // away from a zoomed-in slide and back would leave it still holding
      // the full-resolution original in memory, and the toggle button
      // would keep describing whatever phase that slide was left in
      // rather than the newly-active slide's actual state.
      change: (carousel: any) => {
        const activeSlide = carousel.getPage?.()?.slides?.[0];
        for (const slide of carousel.getSlides?.() ?? []) {
          if (slide !== activeSlide) resetSlideZoom(slide);
        }
        const button = carousel
          .getContainer?.()
          ?.querySelector('[data-fb-zoom-toggle]');
        if (button) {
          updateZoomButton(button, activeSlide?.zoomPhase || 'base');
        }
      },
    },
    Lazyload: {
      preload: 2,
    },
    infinite: true,
    Thumbs: {
      type: 'classic',
    },
    Toolbar: {
      items: {
        // Replaces the built-in `iterateZoom` action with an explicit
        // 3-stop cycle: fit -> full (fills the viewport by whichever of
        // width/height needs it, cropping the other - Panzoom calls this
        // "cover") -> 100% (one image pixel per screen pixel) -> back to
        // fit. The phase is tracked explicitly per-slide (slide.zoomPhase)
        // rather than inferred from the current scale value: Panzoom's own
        // "full" (1:1 with whatever capped srcset candidate is currently
        // loaded) is computed from an image deliberately sized close to
        // the viewport already (sizes="100vw"), so it very often nearly
        // coincides with "cover" - comparing scale numbers to decide the
        // next stop would silently collapse those into one step. Explicit
        // phase tracking always advances through exactly 3 real stops
        // regardless of what the scale values happen to be.
        zoomToggle: {
          tpl: zoomButtonTpl('base'),
          click: (carousel: any) => advanceZoomPhase(carousel),
        },
      },
      display: {
        left: ['counter'],
        right: ['zoomToggle', 'close'],
      },
    },
    Zoomable: {
      Panzoom: {
        mouseMoveFactor: 1.0,
        // 100% (one image pixel per screen pixel) is the ceiling for every
        // zoom path - click cycle, wheel, and pinch - not just this button.
        // Default maxScale (4) lets pinch-zoom go up to 4x past 100%, which
        // just blurs/upscales since we only load enough resolution to fill
        // the viewport (see buildResponsiveSrcSet above).
        maxScale: 1,
        // Disables Panzoom's own default click-to-zoom (toggle between fit
        // and its own idea of "full") - our click listener on the image
        // (see the `render` handler above) replaces it with the same
        // 3-stop cycle as the toolbar button. Without this, both would
        // fire on every click and fight over the scale.
        clickAction: false,
      },
    },
  },
};
