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
          tpl: '<button data-fb-zoom-toggle class="f-button" title="Zoom"><svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg></button>',
          click: (carousel: any) => {
            const slide = carousel.getPage()?.slides?.[0];
            const panzoom = slide?.panzoomRef;
            const img = panzoom?.getContent();
            if (!panzoom || !slide || !img) return;

            const phase = slide.zoomPhase || 'base';

            if (phase === 'base') {
              slide.zoomPhase = 'cover';
              panzoom.execute('zoomTo', {scale: panzoom.getScale('cover')});
              return;
            }

            if (phase === 'cover') {
              slide.zoomPhase = 'full';

              // Our srcset caps out at RESPONSIVE_IMAGE_WIDTHS' largest
              // tier (3000px), which is still short of most source
              // photos' true resolution. Swap in the uncapped original
              // (slide.src, never touched by the srcset-building above)
              // and derive the target scale from values we already know:
              // the viewport's currently-rendered pixel width is always
              // (current scale) * (fit-width in CSS px), so fit-width =
              // renderedPx / current. The scale that shows the swapped-in
              // image's true native width in that same fit-width box is
              // trueNaturalWidth * current / renderedPx.
              const current = panzoom.getTransform(true).scale;
              const viewport = panzoom.getViewport();
              const renderedPx = parseFloat(viewport.style.width) || 0;

              img.removeAttribute('srcset');
              img.removeAttribute('sizes');
              img.src = slide.src;

              // This element previously had srcset/sizes for responsive
              // selection, and even after clearing those attributes its
              // own naturalWidth keeps reporting a density-adjusted size
              // instead of the true file dimensions - so probe the real
              // size with a brand new, stateless Image (resolves
              // instantly, already in the HTTP cache from the swap above).
              //
              // Just computing our own correct scale from that isn't
              // enough on its own, though: Panzoom's *internal* zoom
              // ceiling (maxScale=1, i.e. its own idea of "full") is
              // computed from this same element's contaminated
              // naturalWidth too, via width/height attributes it checks
              // before falling back to naturalWidth. Left cleared, our
              // correct (larger) target scale exceeds Panzoom's own
              // (wrongly small) ceiling and its bounds-safety logic snaps
              // it back down. Setting the attributes to the *true* probed
              // dimensions makes Panzoom's internal ceiling agree with our
              // target instead of fighting it.
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
                panzoom.execute('zoomTo', {scale: trueScale});
              };
              probe.onload = () =>
                zoomToTrueFull(probe.naturalWidth, probe.naturalHeight);
              probe.onerror = () => zoomToTrueFull(0, 0);
              probe.src = slide.src;
              return;
            }

            // phase === 'full' -> back to fit. Restore the capped srcset
            // so we're not holding a multi-megabyte original in memory
            // while zoomed out, and clear the true-original width/height
            // attributes set above - left in place, they'd make the next
            // visit to this slide's getScale('cover') think the true
            // original is still loaded.
            slide.zoomPhase = 'base';
            if (slide.srcset) {
              img.srcset = slide.srcset;
              img.sizes = slide.sizes || '';
            }
            img.removeAttribute('width');
            img.removeAttribute('height');
            panzoom.execute('zoomTo', {scale: panzoom.getScale('base')});
          },
        },
      },
      display: {
        left: ['counter'],
        middle: ['zoomToggle'],
        right: ['close'],
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
      },
    },
  },
};
