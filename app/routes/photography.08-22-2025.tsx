import {Gallery} from '../../app/components/react-grid-gallery/Gallery';
import useFancybox from '~/lib/useFancybox';
import type {Route} from './+types/photography.08-22-2025';
import {getSeoMeta} from '@shopify/hydrogen';
import type {MetaFunction} from 'react-router';
import {fancyboxOptions} from '~/lib/fancyboxOptions';

export const photographyArticleSeoData = {
  title: 'My first two rolls of 35mm film ever with my Pentax 17',
  description:
    'Description about my experiences using this camera as a beginner photographer',
  url: 'https://www.johnnguyen.codes/photography/08-22-2025',
  relativeUrlPath: '/photography/08-22-2025',
  pageType: 'photography',
  updatedAt: '2025-11-25T12:53:28-08:00',
  publishedAt: '2020-05-06T03:20:10-07:00',
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
  const [fancyboxRef] = useFancybox(fancyboxOptions);
  const images = [
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-08-22--012--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-08-22--013--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-08-22--014--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-08-22--016--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-08-22--017--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-08-22--018--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-08-22--038--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-08-22--040--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-08-22--042--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-08-22--058--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-08-22--062--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--006--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--008--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--009--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--010--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--012--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--013--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--014--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--020--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--022--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--024--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--026--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--028--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--030--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--032--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--038--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--040--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--044--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--046--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--048--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--049--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--050--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--052--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--056--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--058--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--068--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--070--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--071--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--072--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
    {
      src: 'https://files.johnnguyen.codes/cdn/shop/files/photography--2025-09-10--073--half-frame--pentax-17--25mm--fujifilm--400--unknown--unknown.jpg',
    },
  ];

  return (
    <div className="photography-container" ref={fancyboxRef}>
      <Gallery images={images} rowHeight={360} />
    </div>
  );
}
