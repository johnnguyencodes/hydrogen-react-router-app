import {Gallery} from '../../app/components/react-grid-gallery/Gallery';
import useFancybox from '~/lib/useFancybox';
import type {Route} from './+types/photography.10-25-2025';
import type {MetaFunction} from 'react-router';
import {getSeoMeta} from '@shopify/hydrogen';

export const photographyArticleSeoData = {
  title: 'My first pictures shot with my Nikon D850',
  description:
    'Description about my experiences shooting pictures with my Nikon D850',
  url: 'https://www.johnnguyen.codes/photography/10-25-2025',
  relativeUrlPath: '/photography/10-25-2025',
  pageType: 'photography',
  updatedAt: '2025-11-27T12:53:28-08:00',
  publishedAt: '2020-05-08T03:20:10-07:00',
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
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-25--001--full-frame--nikon-d850--sigma-105mm-macro--45mp--iso-64--f8--1-30s.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-25--002--full-frame--nikon-d850--nikkor-28mm-ais--45mp--iso-400--f8--1-250s.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-25--003--full-frame--nikon-d850--sigma-105mm-macro--45mp--iso-64--f8--1-30s.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-25--004--full-frame--nikon-d850--sigma-105mm-macro--45mp--iso-64--f8--1-50s.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-25--005--full-frame--nikon-d850--sigma-105mm-macro--45mp--iso-400--f8--1-800s.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-25--006--full-frame--nikon-d850--sigma-105mm-macro--45mp--iso-200--f8--1-100s.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-25--007--full-frame--nikon-d850--sigma-105mm-macro--45mp--iso-1000--f8--1-1600s.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-25--008--full-frame--nikon-d850--sigma-105mm-macro--45mp--iso-64--f8--1-400s.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-25--009--full-frame--nikon-d850--nikkor-50mm-ais--45mp--iso-64--f4--1-640s.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-25--010--full-frame--nikon-d850--nikkor-50mm-ais--45mp--iso-64--f4--1-800s.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-25--011--full-frame--nikon-d850--nikkor-50mm-ais--45mp--iso-64--f4--1-500s.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-25--012--full-frame--nikon-d850--sigma-105mm-macro--45mp--iso-200--f8--1-400s.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-25--013--full-frame--nikon-d850--sigma-105mm-macro--45mp--iso-400--f8--1-640s.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-10-25--014--full-frame--nikon-d850--sigma-105mm-macro--45mp--iso-400--f8--1-640s.jpg',
    },
  ];

  return (
    <div className="photography-container" ref={fancyboxRef}>
      <Gallery images={images} rowHeight={360} />
    </div>
  );
}
