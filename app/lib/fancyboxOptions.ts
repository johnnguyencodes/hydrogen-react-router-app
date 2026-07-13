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
    initSlides: (_fb, slides) => {
      const width = pickWidthForViewport();
      for (const slide of slides) {
        if (!slide.src) continue;

        slide.srcset = buildResponsiveSrcSet(slide.src);
        slide.sizes = '100vw';

        const img = new Image();
        img.src = buildResponsiveImageUrl(slide.src, width);
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
