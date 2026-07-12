export const fancyboxOptions = {
  on: {
    '*': (_fb, slide) => {
      const img = slide.$el?.querySelector(
        'img, picture img',
      ) as HTMLImageElement | null;
      if (img) {
        img.loading = 'eager'; // don’t lazy the modal image
        // @ts-ignore – new attribute in modern browsers
        img.fetchPriority = 'high'; // promote in Chromium
        img.decoding = 'sync'; // decode sooner
      }
    },
    // Fancybox only builds/lazy-loads slides near the current index (its
    // own `Lazyload.preload` just widens that window, it can't eagerly
    // fetch the whole gallery). Warm the browser's HTTP cache for every
    // image as soon as the gallery opens so swiping is served from cache
    // instead of waiting on a fresh request.
    initSlides: (_fb, slides) => {
      for (const slide of slides) {
        if (slide.src) {
          const img = new Image();
          img.src = slide.src;
        }
      }
    },
  },
  placeFocusBack: false,
  Carousel: {
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
