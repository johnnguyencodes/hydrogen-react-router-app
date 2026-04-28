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
  },
  placeFocusBack: false,
  Carousel: {
    Lazyload: {
      preload: 999,
    },
    preload: 999,
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
