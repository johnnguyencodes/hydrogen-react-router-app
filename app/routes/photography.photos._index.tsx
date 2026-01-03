import {
  Link,
  useLoaderData,
  type LoaderFunctionArgs,
  type MetaFunction,
} from 'react-router';
import {getSeoMeta} from '@shopify/hydrogen';
import HeroCarousel from '~/components/HeroCarousel';
import {photographyPhotos as pageSeoData} from '~/lib/photographyLandingPageSeoData';
import {PHOTOGRAPHY_METAOBJECT_QUERY} from '~/lib/photographyPageUtils';
import PhotographyPage from '~/components/PhotographyPage';

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

function PhotographyHero(): React.JSX.Element {
  return (
    <div>
      <h1>{pageSeoData.title}</h1>
      <HeroCarousel
        items={carouselItems}
        autoPlay={true}
        autoPlayInterval={15000}
      />
    </div>
  );
}

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

  return (
    <PhotographyPage images={parsedImages} HeroContent={PhotographyHero} />
  );
}
