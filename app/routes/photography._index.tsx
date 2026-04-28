import {
  Link,
  useLoaderData,
  type LoaderFunctionArgs,
  type MetaFunction,
} from 'react-router';
import type {Route} from './+types/photography._index';
import {formatTimeStampToMDY} from '~/lib/plantPageUtils';
import {getSeoMeta, Image} from '@shopify/hydrogen';
import {PhotographyArticleSection} from '~/components/PhotographyArticleSection';
import {photographyPhotos as pageSeoData} from '~/lib/photographyLandingPageSeoData';
import {photographyJournalSeoData} from '~/lib/photographyJournalSeoData';
// import {photographyLensSeoData} from '~/lib/photographyLensSeoData';
// import {photographyFilmStockSeoData} from '~/lib/photographyFilmStockSeoData';
// import {photographyFilmFormatSeoData} from '~/lib/photographyFilmFormatSeoData';
// import {photographyCameraBodySeoData} from '~/lib/photographyCameraBodySeoData';
import {photographyLandingPageSeoData} from '~/lib/photographyLandingPageSeoData';
import {Gallery} from '../components/react-grid-gallery/';
import {fancyboxOptions} from '~/lib/fancyboxOptions';
import useFancybox from '~/lib/useFancybox';
import {PHOTOGRAPHY_METAOBJECT_QUERY} from '~/lib/photographyPageUtils';

import HeroCarousel from '~/components/HeroCarousel';
import PhotographyPage from '~/components/PhotographyPage';
import {useMemo} from 'react';
import {Button} from '~/components/ui/button';

export async function loader(args: LoaderFunctionArgs) {
  const criticalData = await loadCriticalData(args);

  return criticalData;
}

async function loadCriticalData(args: LoaderFunctionArgs) {
  const {context} = args;

  const metaobjectType = 'allphotos';
  const metaobjectHandle = 'allphotos';

  const metaobject = await context.storefront.query(
    PHOTOGRAPHY_METAOBJECT_QUERY,
    {
      variables: {type: metaobjectType, handle: metaobjectHandle},
    },
  );

  return {
    criticalData: {
      metaobject,
      seo: pageSeoData,
    },
  };
}

export const meta: MetaFunction<typeof loader> = ({data, matches}) => {
  const rootSeo = (matches as any)[1].data?.seo;
  const pageSeo = data?.criticalData.seo;

  return getSeoMeta(rootSeo, pageSeo);
};

const carouselItems = [
  <div
    key="1"
    className="relative flex h-[600px] items-end-safe justify-end bg-[linear-gradient(rgba(0,0,0,0.40),rgba(0,0,0,0.40)),url('https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-10-04--001--full-frame--nikon-f2--nikkor-35mm-105mm-f35-f45-ais--kodak-gold--200--unknown--unknown.webp')] bg-cover bg-center text-[var(--color-bg-dim)] dark:text-[var(--color-fg-text)]"
  >
    <div className="z-10 relative bottom-20 right-20 text-end">
      <h1 className="text-5xl font-bold mb-2">The Photography Shelf</h1>
      <p className="text-lg">Welcome to my page all about my photographyyyyy</p>
      <Link to="/photography/20251004">
        <Button variant="banner">Read more</Button>
      </Link>
    </div>
  </div>,
  <div
    key="2"
    className="relative flex h-[600px] items-end-safe justify-start bg-[linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25)),url('https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-10-25--008--full-frame--nikon-d850--sigma-105mm-f28-os-hsm-macro--45mp--iso-64--f8--1-400s.webp')] bg-cover bg-[center_85%] text-[var(--color-bg-dim)] dark:text-[var(--color-fg-text)]"
  >
    <div className="z-10 relative bottom-20 left-20">
      <h1 className="text-5xl font-bold mb-2">The Photography Shelf</h1>
      <p className="text-lg">Welcome to my page all about my photographyyyyy</p>
      <Link to="/photography/20251025">
        <Button variant="banner">Read more</Button>
      </Link>
    </div>
  </div>,
  <div
    key="3"
    className="relative flex h-[600px] items-end-safe justify-start bg-[linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25)),url('https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-08-22--038--half-frame--pentax-17--pentax-25mm-f35-hd-hf--fujifilm--400--unknown--unknown.webp')] bg-cover bg-[center_81%] text-[var(--color-bg-dim)] dark:text-[var(--color-fg-text)]"
  >
    <div className="z-10 relative bottom-20 left-20">
      <h1 className="text-5xl font-bold mb-2">The Photography Shelf</h1>
      <p className="text-lg">Welcome to my page all about my photographyyyyy</p>
      <Link to="/photography/20251025">
        <Button variant="banner">Read more</Button>
      </Link>
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
  // ...photographyLensSeoData,
  // ...photographyFilmStockSeoData,
  // ...photographyFilmFormatSeoData,
  // ...photographyCameraBodySeoData,
];

const articleProps: PhotographyArticleSectionProps = {
  pageSeoDataArray: allSeoData,
  sectionTitle: 'Read the journal',
  sectionDescription:
    'Follow my journey into photography through my articles below',
};

export default function Photography() {
  const {criticalData} = useLoaderData<typeof loader>();

  const rawMasterImages = JSON.parse(
    criticalData.metaobject.metaobject.images.value,
  ) as RawMasterPhotographyImages;

  const parsedImages: PhotographyImageWithMetadata[] = [];
  const seenUrls = new Set<string>(); // Tracks unique image URLs

  for (const categoryKey in rawMasterImages) {
    const subCategories = rawMasterImages[categoryKey];

    for (const subCategoryKey in rawMasterImages[categoryKey]) {
      const imagesArray = subCategories[subCategoryKey];

      for (const item of imagesArray) {
        // Check if we've already added this image URL
        if (!seenUrls.has(item.image.url)) {
          parsedImages.push(item); // Pushes the whole item
          seenUrls.add(item.image.url); // Marks URL as seen
        }
      }
    }
  }

  function sortImages(
    a: PhotographyImageWithMetadata,
    b: PhotographyImageWithMetadata,
  ): number {
    const {date: aDate, index: aIndex} = a.meta;
    const {date: bDate, index: bIndex} = b.meta;

    // sort by date (most recent first)
    const aDateObj = new Date(aDate);
    const bDateObj = new Date(bDate);

    if (bDateObj.getTime() !== aDateObj.getTime()) {
      return bDateObj.getTime() - aDateObj.getTime();
    }

    // Then, sort by index from highest to lowest (highest index is most recent)
    return Number(bIndex) - Number(aIndex);
  }

  parsedImages.sort(sortImages);

  const displayedImages = parsedImages.slice(0, 10);

  return (
    <div className="photography xxs:mx-5 2xl:mx-0 w-full">
      <HeroCarousel
        items={carouselItems}
        autoPlay={true}
        autoPlayInterval={15000}
      />

      <p className="text-[var(--color-fg-text)]">Recent images</p>
      <PhotographyPage images={displayedImages} />
      <div className="flex justify-end">
        <Link to="/photography/photos" className="text-[var(--color-fg-text)]">
          See all photos
        </Link>
      </div>
      <PhotographyArticleSection
        photographyArticleSectionProps={articleProps}
      />
    </div>
  );
}
