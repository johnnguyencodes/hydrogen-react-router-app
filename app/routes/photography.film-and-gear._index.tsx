import {Link, type LoaderFunctionArgs, type MetaFunction} from 'react-router';
import type {Route} from './+types/photography._index';
import {photographyArticleSeoData} from '~/lib/photographyArticleSeoData';
import {formatTimeStampToMDY} from '~/lib/plantPageUtils';
import {getSeoMeta} from '@shopify/hydrogen';
import {PhotographyArticleSection} from '~/components/PhotographyArticleSection';
import HeroCarousel from '~/components/HeroCarousel';
import {photographyLensSeoData} from '~/lib/photographyLensSeoData';
import {photographyFilmSeoData} from '~/lib/photographyFilmSeoData';
import {photographyCameraSeoData} from '~/lib/photographyCameraSeoData';

export const pageSeoData = {
  title: 'Photography Film and Gear',
  description: 'My home page for my photography film and gear',
  url: 'https://www.johnnguyen.codes/photography/film-and-gear',
  relativeUrlPath: '/photography/film-and-gear',
  pageType: 'photography',
  updatedAt: '2025-11-26T12:53:28-08:00',
  publishedAt: '2020-05-05T03:20:10-07:00',
  media: [
    {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/750x600.jpg?v=1763844438',
      width: 750,
      height: 600,
      altText: 'This is the photagraphy film and gear page featured image',
    },
  ],
};

export function loader() {
  return {
    seo: pageSeoData,
  };
}

export const meta: MetaFunction<typeof loader> = ({data, matches}) => {
  const rootSeo = (matches as any)[1].data?.seo;
  const pageSeo = data?.seo;

  return getSeoMeta(rootSeo, pageSeo);
};

const carouselItems = [
  <div
    key="1"
    className="flex h-96 items-center justify-center bg-[url('https://files.johnnguyen.codes/cdn/shop/files/photography--2025-11-13--001--full-frame--nikon-d850--35mm-105mm-zoom-ais--45mp--iso-1000--f8--1-250s.jpg')] bg-cover bg-center text-[var(--color-fg-text)]"
  >
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-2">The Photography Shelf</h1>
      <p className="text-lg">Welcome to my page all about my photography</p>
    </div>
  </div>,
  <div
    key="2"
    className="flex h-96 items-center justify-center bg-[url('https://files.johnnguyen.codes/cdn/shop/files/photography--2025-11-13--002--full-frame--nikon-d850--35mm-105mm-zoom-ais--45mp--iso-64--f56--1-3s.jpg')] bg-cover bg-center text-[var(--color-fg-text)]"
  >
    <div className="text-center">
      <h2 className="text-5xl font-bold mb-2">Slide 2</h2>
      <p className="text-lg">Navigate with arrows or dots</p>
    </div>
  </div>,
  <div
    key="3"
    className="flex h-96 items-center justify-center bg-[url('https://files.johnnguyen.codes/cdn/shop/files/photography--2025-11-13--013--full-frame--nikon-d850--35mm-105mm-zoom-ais--45mp--iso-200--f56--1-3s.jpg')] bg-cover bg-center text-[var(--color-fg-text)]"
  >
    <div className="text-center">
      <h2 className="text-5xl font-bold mb-2">Slide 3</h2>
      <p className="text-lg">Smooth transitions included</p>
    </div>
  </div>,
];

export default function Photography() {
  return (
    <div className="photography xxs:mx-5 2xl:mx-0">
      <HeroCarousel
        items={carouselItems}
        autoPlay={true}
        autoPlayInterval={15000}
      />
      <PhotographyArticleSection seoData={photographyLensSeoData} />
      <PhotographyArticleSection seoData={photographyFilmSeoData} />
      <PhotographyArticleSection seoData={photographyCameraSeoData} />
    </div>
  );
}
