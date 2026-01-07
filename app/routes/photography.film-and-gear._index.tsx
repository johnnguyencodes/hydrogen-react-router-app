import {Link, type LoaderFunctionArgs, type MetaFunction} from 'react-router';
import type {Route} from './+types/photography._index';
import {photographyJournalSeoData} from '~/lib/photographyJournalSeoData';
import {formatTimeStampToMDY} from '~/lib/plantPageUtils';
import {getSeoMeta} from '@shopify/hydrogen';
import {PhotographyArticleSection} from '~/components/PhotographyArticleSection';
import HeroCarousel from '~/components/HeroCarousel';
import {photographyLensSeoData} from '~/lib/photographyLensSeoData';
import {photographyFilmStockSeoData} from '~/lib/photographyFilmStockSeoData';
import {photographyFilmFormatSeoData} from '~/lib/photographyFilmFormatSeoData';
import {photographyCameraBodySeoData} from '~/lib/photographyCameraBodySeoData';
import {photographyFilmAndGear as pageSeoData} from '~/lib/photographyLandingPageSeoData';

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

const lensArticleProps: PhotographyArticleSectionProps = {
  pageSeoDataArray: photographyLensSeoData,
  sectionTitle: 'Lens',
  sectionDescription: 'Check out my cool lens checkout',
};

const filmStockArticleProps: PhotographyArticleSectionProps = {
  pageSeoDataArray: photographyFilmStockSeoData,
  sectionTitle: 'Film',
  sectionDescription: 'Check out my film stocks',
};

const filmFormatArticleProps: PhotographyArticleSectionProps = {
  pageSeoDataArray: photographyFilmFormatSeoData,
  sectionTitle: 'Film Formats',
  sectionDescription: 'Check out my film formats',
};

const cameraArticleProps: PhotographyArticleSectionProps = {
  pageSeoDataArray: photographyCameraBodySeoData,
  sectionTitle: 'Cameras',
  sectionDescription: 'Check out my cool cameras',
};

export default function Photography() {
  return (
    <div className="photography">
      <HeroCarousel
        items={carouselItems}
        autoPlay={true}
        autoPlayInterval={15000}
      />
      <PhotographyArticleSection
        photographyArticleSectionProps={lensArticleProps}
      />
      <PhotographyArticleSection
        photographyArticleSectionProps={filmStockArticleProps}
      />
      <PhotographyArticleSection
        photographyArticleSectionProps={filmFormatArticleProps}
      />
      <PhotographyArticleSection
        photographyArticleSectionProps={cameraArticleProps}
      />
    </div>
  );
}
