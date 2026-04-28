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
import {useEffect, useMemo, useState} from 'react';

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

export default function Photography() {
  const {criticalData} = useLoaderData<typeof loader>();
  const [filterStrings, setFilterStrings] = useState<string[]>([]);
  const [filteredImages, setFilteredImages] = useState<
    PhotographyImageWithMetadata[]
  >([]);

  const parsedImages = useMemo<PhotographyImageWithMetadata[]>(() => {
    const rawMasterImages = JSON.parse(
      criticalData.metaobject.metaobject.images.value,
    ) as RawMasterPhotographyImages;

    const images: PhotographyImageWithMetadata[] = [];
    const seenUrls = new Set<string>();

    for (const categoryKey in rawMasterImages) {
      const subCategories = rawMasterImages[categoryKey];

      for (const subCategoryKey in rawMasterImages[categoryKey]) {
        const imagesArray = subCategories[subCategoryKey];

        for (const item of imagesArray) {
          // Check if we've already added this image URL
          if (!seenUrls.has(item.image.url)) {
            images.push(item); // Pushes the whole item
            seenUrls.add(item.image.url); // Marks URL as seen
          }
        }
      }
    }

    return images.sort(sortImages);
  }, [criticalData]);

  useEffect(() => {
    setFilteredImages(filterImages(parsedImages, filterStrings));
  }, [parsedImages, filterStrings]);

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

  function toggleFilter(filterString: string) {
    setFilterStrings((prev) =>
      prev.includes(filterString)
        ? prev.filter((f) => f !== filterString)
        : [...prev, filterString],
    );
  }

  function filterImages(
    images: PhotographyImageWithMetadata[],
    filterStrings: string[],
  ) {
    if (filterStrings.length === 0) return images;

    return images.filter((image) =>
      filterStrings.some((filter) => image.image.url.includes(filter)),
    );
  }

  function PhotographyHero(): React.JSX.Element {
    return (
      <div>
        <p>I have uploaded {parsedImages.length} images so far.</p>
        <p>
          Browse them all or use filter by lens, film stocks, formats, or camera
          bodies!
        </p>
        <p>You are now viewing {filteredImages.length} images</p>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => toggleFilter('nikon-d850')}>Nikon d850</button>
      <button onClick={() => toggleFilter('45mp')}>45mp</button>
      <p>Filter Strings: {filterStrings}</p>
      <PhotographyPage images={filteredImages} HeroContent={PhotographyHero} />
    </div>
  );
}
