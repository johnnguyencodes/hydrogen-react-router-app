import {Link, type LoaderFunctionArgs, type MetaFunction} from 'react-router';
import type {Route} from './+types/photography._index';
import {formatTimeStampToMDY} from '~/lib/plantPageUtils';
import {getSeoMeta, Image} from '@shopify/hydrogen';
import {PhotographyArticleSection} from '~/components/PhotographyArticleSection';
import {photographyPhotos as pageSeoData} from '~/lib/photographyLandingPageSeoData';
import {photographyArticleSeoData} from '~/lib/photographyArticleSeoData';
import {photographyLensSeoData} from '~/lib/photographyLensSeoData';
import {photographyFilmStockSeoData} from '~/lib/photographyFilmStockSeoData';
import {photographyFilmFormatSeoData} from '~/lib/photographyFilmFormatSeoData';
import {photographyCameraBodySeoData} from '~/lib/photographyCameraBodySeoData';

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
  ...photographyArticleSeoData,
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

const photoMedia = [
  {
    url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/750x600.jpg?v=1763844438',
    width: 750,
    height: 600,
    altText: 'This is the photography page featured image',
  },
];

export default function Photography() {
  return (
    <div className="photography xxs:mx-5 2xl:mx-0">
      <HeroCarousel
        items={carouselItems}
        autoPlay={true}
        autoPlayInterval={15000}
      />
      <div className="sm:columns-1 lg:columns-3 gap-5">
        <div className="col-span-1 mb-3">
          <div className="rounded-md bg-[var(--color-bg-1)] overflow-hidden flex-shrink-0 w-full p-2">
            <Link className="featured-product" to="/photography/film-and-gear">
              <div className="p-2">
                <Image
                  data={photoMedia[0]}
                  aspectRatio="1/1"
                  sizes="(min-width: 45em) 20vw, 50vw"
                />
                <div className="pt-2">
                  <h4 className="text-2xl font-medium text-[var(--color-fg-green)]">
                    Film and Gear
                  </h4>
                  <div className="text-[var(--color-fg-text)] text-lg">
                    <p className="py-1">Page about my film and gear</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-span-1 mb-3">
          <div className="rounded-md bg-[var(--color-bg-1)] overflow-hidden flex-shrink-0 w-full p-2">
            <Link className="featured-product" to="/photography/photos">
              <div className="p-2">
                <Image
                  data={photoMedia[0]}
                  aspectRatio="1/1"
                  sizes="(min-width: 45em) 20vw, 50vw"
                />
                <div className="pt-2">
                  <h4 className="text-2xl font-medium text-[var(--color-fg-green)]">
                    Photos
                  </h4>
                  <div className="text-[var(--color-fg-text)] text-lg">
                    <p className="py-1">Page for my photos</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-span-1 mb-3">
          <div className="rounded-md bg-[var(--color-bg-1)] overflow-hidden flex-shrink-0 w-full p-2">
            <Link className="featured-product" to="/photography/journal">
              <div className="p-2">
                <Image
                  data={photoMedia[0]}
                  aspectRatio="1/1"
                  sizes="(min-width: 45em) 20vw, 50vw"
                />
                <div className="pt-2">
                  <h4 className="text-2xl font-medium text-[var(--color-fg-green)]">
                    Journal
                  </h4>
                  <div className="text-[var(--color-fg-text)] text-lg">
                    <p className="py-1">
                      Page about my reflections on photography
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <PhotographyArticleSection
        photographyArticleSectionProps={articleProps}
      />
    </div>
  );
}
