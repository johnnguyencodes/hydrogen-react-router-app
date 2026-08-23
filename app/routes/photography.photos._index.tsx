import {
  useLoaderData,
  useSearchParams,
  type LoaderFunctionArgs,
  type MetaFunction,
} from 'react-router';
import {getSeoMeta} from '@shopify/hydrogen';
import {photographyPhotos as pageSeoData} from '~/lib/photographyLandingPageSeoData';
import {fetchAllPhotos} from '~/lib/photographyPageUtils';
import PhotographyPage from '~/components/PhotographyPage';
import {
  PhotoFilterBar,
  buildActivePhotoFilters,
  filterPhotosByActiveFilters,
} from '~/components/PhotoFilterBar';
import {useMemo, useRef} from 'react';

export async function loader(args: LoaderFunctionArgs) {
  const criticalData = await loadCriticalData(args);

  return criticalData;
}

async function loadCriticalData(args: LoaderFunctionArgs) {
  const {context} = args;

  const images = await fetchAllPhotos(context.storefront);

  return {
    criticalData: {
      images,
      seo: pageSeoData,
    },
  };
}

export const meta: MetaFunction<typeof loader> = ({data, matches}) => {
  const rootSeo = (matches as any)[1].data?.seo;
  const pageSeo = data?.criticalData.seo;

  return getSeoMeta(rootSeo, pageSeo);
};

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

export default function Photography() {
  const {criticalData} = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  const parsedImages = useMemo<PhotographyImageWithMetadata[]>(() => {
    return [...criticalData.images].sort(sortImages);
  }, [criticalData]);

  const filteredImages = useMemo(() => {
    const active = buildActivePhotoFilters(searchParams);
    return filterPhotosByActiveFilters(parsedImages, active);
  }, [parsedImages, searchParams]);

  // PhotographyPage's HeroContent prop is invoked as <HeroContent /> with no
  // props, so a freshly-defined component here would get a new identity on
  // every render (this route re-renders on every filter change) - React
  // would then remount it, wiping PhotoFilterBar's internal open-dropdown
  // state on each click. A ref keeps the component's identity stable across
  // renders while still reading the latest data each time it's invoked.
  const heroDataRef = useRef({parsedImages, filteredImages});
  heroDataRef.current = {parsedImages, filteredImages};

  const PhotographyHeroRef = useRef<() => React.JSX.Element>();
  if (!PhotographyHeroRef.current) {
    PhotographyHeroRef.current = function PhotographyHero() {
      const {parsedImages, filteredImages} = heroDataRef.current;
      return (
        <div className="mb-5">
          <h1 className="text-3xl mt-4 font-medium leading-tight max-w-[30ch] text-balance text-[var(--color-fg-blue)]">
            Photos
          </h1>
          <p className="mt-2 text-[var(--color-fg-text)]">
            All my photography photos on one page. Browse them all or filter
            them using the categories below.
          </p>
          <p className="mt-2 text-[var(--color-fg-text)]">
            {parsedImages.length} photos total &middot; viewing{' '}
            {filteredImages.length}
          </p>
          <div className="mt-3">
            <PhotoFilterBar images={parsedImages} />
          </div>
        </div>
      );
    };
  }

  return (
    <div className="xxs:mx-5 2xl:mx-0">
      <PhotographyPage
        images={filteredImages}
        HeroContent={PhotographyHeroRef.current}
      />
    </div>
  );
}
