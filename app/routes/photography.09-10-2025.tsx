import {Gallery} from '../../app/components/react-grid-gallery/Gallery';
import useFancybox from '~/lib/useFancybox';
import type {Route} from './+types/photography.09-10-2025';
import type {MetaFunction} from 'react-router';
import {getSeoMeta} from '@shopify/hydrogen';

export const photographyArticleSeoData = {
  title: 'My first two rolls that I developed and scanned myself.',
  description:
    'Description about my experiences shooting, developing, and scanning my first two rolls of film.',
  url: 'https://www.johnnguyen.codes/photography/09-10-2025',
  relativeUrlPath: '/photography/09-10-2025',
  pageType: 'photography',
  updatedAt: '2025-11-26T12:53:28-08:00',
  publishedAt: '2020-05-07T03:20:10-07:00',
  media: [
    {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/750x600.jpg?v=1763844438',
      width: 750,
      height: 600,
      altText: 'This is the photography page featured image',
    },
  ],
};

export function loader() {
  return {
    seo: photographyArticleSeoData,
  };
}

export const meta: MetaFunction<typeof loader> = ({data, matches}) => {
  const rootSeo = (matches as any)[1].data?.seo;
  const pageSeo = data?.seo;

  return getSeoMeta(rootSeo, pageSeo);
};

export default function Photography() {
  const [fancyboxRef] = useFancybox({
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
        preload: 9,
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
  });
  const images = [
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-04--001--full-frame--nikon-f2--35mm-105mm-zoom-ais--kodak-gold--200--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-04--002--full-frame--nikon-f2--35mm-105mm-zoom-ais--kodak-gold--200--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-04--003--full-frame--nikon-f2--35mm-105mm-zoom-ais--kodak-gold--200--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-04--004--full-frame--nikon-f2--35mm-105mm-zoom-ais--kodak-gold--200--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-04--005--full-frame--nikon-f2--35mm-105mm-zoom-ais--kodak-gold--200--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-04--006--full-frame--nikon-f2--35mm-105mm-zoom-ais--kodak-gold--200--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-04--007--full-frame--nikon-f2--35mm-105mm-zoom-ais--kodak-gold--200--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-05--001--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-05--002--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-05--003--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-05--004--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-05--005--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-05--006--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-05--007--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
  ];

  return (
    <div className="photography-container" ref={fancyboxRef}>
      <Gallery images={images} rowHeight={360} />
    </div>
  );
}
