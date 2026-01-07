import {Link, type LoaderFunctionArgs, type MetaFunction} from 'react-router';
import type {Route} from './+types/photography._index';
import {formatTimeStampToMDY} from '~/lib/plantPageUtils';
import {getSeoMeta, Image} from '@shopify/hydrogen';
import {PhotographyArticleSection} from '~/components/PhotographyArticleSection';
import {photographyPhotos as pageSeoData} from '~/lib/photographyLandingPageSeoData';
import {photographyJournalSeoData} from '~/lib/photographyJournalSeoData';
import {photographyLensSeoData} from '~/lib/photographyLensSeoData';
import {photographyFilmStockSeoData} from '~/lib/photographyFilmStockSeoData';
import {photographyFilmFormatSeoData} from '~/lib/photographyFilmFormatSeoData';
import {photographyCameraBodySeoData} from '~/lib/photographyCameraBodySeoData';
import {photographyLandingPageSeoData} from '~/lib/photographyLandingPageSeoData';

import HeroCarousel from '~/components/HeroCarousel';

export async function loader(args: LoaderFunctionArgs) {
  const criticalData = await loadCriticalData(args);

  return {...criticalData};
}

async function loadCriticalData({context}: LoaderFunctionArgs) {
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

// update seodata to include titleTag for titles used on the website

// Gear and Film
// 	Lenses
// 		F-Mount lenses
// 			AIS 28 f2.8
// 			AIS 50 f1.8
// 			AIS 105 f2.5
// 			AIS 35-105mm f3.5-4.5
// 			AIS 80mm-200mm f4
// 			Sigma 105mm lens
// 			AF-S 16-35mm
// 			AF-S 28-300mm
// 			AF-S 200-500mm
// 		V-Series
// 			50mm
// 			80mm
// 			150mm
// 		Misc
// 		  Pentax 17 lens
// 		  Polaroid 120 lens
// 	Film
// 		Gold 200
// 		Fuji 400
// 		Tmax 400
// 		Kodak Double-X 5222
// 		P3200
// 		Vision 3 200T
// 		Vision 3 500T
// 		Vision 3 50D
// 	Camera bodies
// 		Nikon F2
// 		Nikon D850
// 		Nikon F6
// 		Pentax 17
// 		Hasselblad 501c/m
// 		Polaroid 120
// 	Equipment
// 		Veo Active 53
// 		Veo Vanguard Tripod
// 		Sekonic L-758DR light meter
// 	Development kits and Scanning
// 	  C41
// 	  ECN-2
// 	  Xtol
// 		Valoi 365
// 		Copy Stand
// 		D850 Sigma 105mm lens
// 	Photos
// 	Magazine

const allSeoData = [
  ...photographyJournalSeoData,
  ...photographyLensSeoData,
  ...photographyFilmStockSeoData,
  ...photographyFilmFormatSeoData,
  ...photographyCameraBodySeoData,
];

const articleProps: PhotographyArticleSectionProps = {
  pageSeoDataArray: allSeoData,
  sectionTitle: 'This is the title',
  sectionDescription: 'This is the description',
};

export default function Photography() {
  return (
    <div className="photography xxs:mx-5 2xl:mx-0 w-full">
      <HeroCarousel
        items={carouselItems}
        autoPlay={true}
        autoPlayInterval={15000}
      />

      <div className="sm:columns-1 lg:columns-3 gap-5">
        {photographyLandingPageSeoData.map((page: PageSeoData) => {
          return page.title !== 'Photography Home Page' ? (
            <Link to={page.relativeUrlPath} key={page.relativeUrlPath}>
              <article className="relative flex flex-col overflow-hidden rounded-md bg-[var(--color-bg-2)] mb-3">
                <div className="px-4 py-2 flex flex-col flex-1">
                  <h3 className="mt-2 text-3xl font-[400]  text-[var(--color-fg-green)]">
                    {page.title}
                  </h3>
                </div>
                <div className="w-full">
                  <Image
                    data={page.media[0]}
                    aspectRatio={`${page.media[0].width.toString()}/${page.media[0].height.toString()}`}
                    sizes="(min-width: 45em) 20vw, 50vw"
                    className="block w-full h-auto object-contain"
                  />
                </div>
                <div className="px-4 pt-0.5 flex flex-col flex-1 bg-[var(--color-bg-0)]">
                  <p className="mt-1 line-clamp-3 text-sm/6 text-[var(--color-fg-text)]">
                    {page.description}
                  </p>
                </div>
              </article>
            </Link>
          ) : null;
        })}
      </div>
      <PhotographyArticleSection
        photographyArticleSectionProps={articleProps}
      />
    </div>
  );
}
