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
      display: {
        left: ['counter'],
        right: ['close'],
      },
    },
    Zoomable: {
      Panzoom: {
        mouseMoveFactor: 1.0,
      },
    },
  },
};
