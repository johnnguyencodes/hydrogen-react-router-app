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
    // Fancybox only builds/lazy-loads slides near the current index (its
    // own `Lazyload.preload` just widens that window, it can't eagerly
    // fetch the whole gallery). Warm the browser's HTTP cache for every
    // image as soon as the gallery opens so swiping is served from cache
    // instead of waiting on a fresh request. Prefetch the same
    // viewport-appropriate size the modal `<img>` will actually request,
    // not the raw original, so this doesn't undo the responsive sizing.
    initSlides: (_fb, slides) => {
      const width = pickWidthForViewport();
      for (const slide of slides) {
        if (slide.src) {
          const img = new Image();
          img.src = buildResponsiveImageUrl(slide.src, width);
        }
      }
    },
  },
  placeFocusBack: false,
  Carousel: {
    on: {
      // Fires whenever slides are (re)rendered/positioned, giving us
      // direct access to each slide's DOM element and its raw `src`.
      render: (_carousel, slides) => {
        for (const slide of slides) {
          const img = slide.el?.querySelector(
            'img, picture img',
          ) as HTMLImageElement | null;
          if (!img || !slide.src) continue;

          img.loading = 'eager'; // don’t lazy the modal image
          // @ts-ignore – new attribute in modern browsers
          img.fetchPriority = 'high'; // promote in Chromium
          img.decoding = 'sync'; // decode sooner

          if (!img.dataset.responsiveApplied) {
            img.dataset.responsiveApplied = 'true';
            img.sizes = '100vw';
            img.srcset = buildResponsiveSrcSet(slide.src);
            img.src = buildResponsiveImageUrl(
              slide.src,
              pickWidthForViewport(),
            );
          }
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
