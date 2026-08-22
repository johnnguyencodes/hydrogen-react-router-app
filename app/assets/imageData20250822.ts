// Masonry gallery layout for photography.20250822.tsx. Each entry only
// carries the grid-position className plus the (date, index) needed to look
// up the actual photo -- the photo's own url/width/height/meta now live in
// Shopify as `photo` metaobjects and are resolved at request time, instead
// of being duplicated here by hand.

export const masonryLayoutGroups: Record<string, MasonryLayoutEntry[]> = {
  masonryImagesGroup0: [
    {
      date: '2025-08-22',
      index: '012',
      className:
        'col-span-12 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4',
    },
  ],
  masonryImagesGroup1: [
    {
      date: '2025-08-22',
      index: '014',
      className: 'col-span-6 md:col-span-4 md:col-start-3',
    },
    {date: '2025-08-22', index: '016', className: 'col-span-6 md:col-span-4'},
  ],
  masonryImagesGroup15: [
    {
      date: '2025-08-22',
      index: '013',
      className: 'col-span-6 md:col-span-4 md:col-start-3',
    },
    {date: '2025-08-22', index: '017', className: 'col-span-6 md:col-span-4'},
  ],
  masonryImagesGroup2: [
    {
      date: '2025-08-22',
      index: '038',
      className: 'col-span-12 lg:col-span-6 lg:col-start-3',
    },
    {date: '2025-08-22', index: '040', className: 'col-span-6 lg:col-span-3'},
    {date: '2025-08-22', index: '018', className: 'col-span-6 lg:col-span-3'},
  ],
  masonryImagesGroup3: [
    {
      date: '2025-08-22',
      index: '042',
      className: 'col-span-12 lg:col-span-8 lg:col-start-3',
    },
    {
      date: '2025-08-22',
      index: '058',
      className: 'col-span-12 lg:col-span-8 lg:col-start-3',
    },
  ],
  masonryImagesGroup4: [
    {
      date: '2025-08-22',
      index: '062',
      className: 'col-span-12 lg:col-span-6 lg:col-start-4',
    },
  ],
  masonryImagesGroup5: [
    {
      date: '2025-09-10',
      index: '006',
      className: 'col-span-6 md:col-span-4 md:col-start-3',
    },
    {date: '2025-09-10', index: '008', className: 'col-span-6 md:col-span-4'},
  ],
  masonryImagesGroup6: [
    {date: '2025-09-10', index: '020', className: 'col-span-12 md:col-span-4'},
    {date: '2025-09-10', index: '022', className: 'col-span-12 md:col-span-4'},
    {date: '2025-09-10', index: '014', className: 'col-span-12 md:col-span-4'},
    {date: '2025-09-10', index: '024', className: 'col-span-12 md:col-span-8'},
    {date: '2025-09-10', index: '028', className: 'col-span-12 md:col-span-4'},
  ],
  masonryImagesGroup7: [
    {
      date: '2025-09-10',
      index: '030',
      className: 'col-span-6 md:col-span-4 md:col-start-3',
    },
    {date: '2025-09-10', index: '032', className: 'col-span-6 md:col-span-4'},
    {
      date: '2025-09-10',
      index: '038',
      className: 'col-span-12 md:col-span-8 md:col-start-3',
    },
  ],
  masonryImagesGroup8: [
    {date: '2025-09-10', index: '040', className: 'col-span-12 sm:col-span-6'},
    {date: '2025-09-10', index: '044', className: 'col-span-12 sm:col-span-6'},
    {date: '2025-09-10', index: '046', className: 'col-span-6 md:col-span-3'},
    {date: '2025-09-10', index: '048', className: 'col-span-6 md:col-span-3'},
    {date: '2025-09-10', index: '056', className: 'col-span-6 md:col-span-3'},
    {date: '2025-09-10', index: '058', className: 'col-span-6 md:col-span-3'},
  ],
  masonryImagesGroup9: [
    {date: '2025-09-10', index: '049', className: 'col-span-6 sm:col-span-3'},
    {date: '2025-09-10', index: '050', className: 'col-span-6 sm:col-span-3'},
    {date: '2025-09-10', index: '052', className: 'col-span-12 sm:col-span-6'},
  ],
  masonryImagesGroup10: [
    {
      date: '2025-09-10',
      index: '068',
      className: 'col-span-6 md:col-span-4 md:col-start-3',
    },
    {date: '2025-09-10', index: '070', className: 'col-span-6 md:col-span-4'},
  ],
  masonryImagesGroup11: [
    {
      date: '2025-09-10',
      index: '071',
      className: 'col-span-6 md:col-span-4 md:col-start-3',
    },
    {date: '2025-09-10', index: '072', className: 'col-span-6 md:col-span-4'},
    {
      date: '2025-09-10',
      index: '073',
      className: 'col-span-12 md:col-span-8 md:col-start-3',
    },
  ],
};
