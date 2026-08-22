import {
  Link,
  useLoaderData,
  type LoaderFunctionArgs,
  type MetaFunction,
} from 'react-router';
import HeroCarousel from '../components/HeroCarousel';
import type {Route} from './+types/_index';
import {Button} from '../components/ui/button';
import {ArrowRight, ImageIcon} from 'lucide-react';
import {PhotographyHomepageArticleSection} from '~/components/PhotographyHomepageArticleSection';
import {photographyJournalSeoData} from '~/lib/photographyJournalSeoData';
import {PlantsHomepageFavorites} from '~/components/PlantHomepageFavorites';

export async function loader(args: LoaderFunctionArgs) {
  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {
    data: criticalData,
  };
}
export const meta: MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

// const carouselItems = [
//   <div
//     key="1"
//     className="flex h-96 items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white"
//   >
//     <div className="text-center">
//       <h2 className="text-4xl font-bold mb-2">Slide 1</h2>
//       <p className="text-lg">Placeholder</p>
//     </div>
//   </div>,
// ];
//
// <HeroCarousel
//   items={carouselItems}
//   autoPlay={true}
//   autoPlayInterval={15000}
// />

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

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const favoriteCollection = context.storefront
    .query(PRODUCTS_BY_COLLECTION_QUERY, {
      variables: {handle: 'favorites'},
    })
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    favoriteCollection,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home-page xxs:mx-5 2xl:mx-0 mt-4">
      <header className="hero rounded-md text-base lg:top-4">
        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-6 sm:gap-10">
          <div className="flex-1">
            <h1 className="hero-title text-pretty text-7xl font-medium text-[var(--color-fg-green)] max-w-[30ch] mb-5">
              Hullo, I'm John!
            </h1>
            <div className="prose max-w-prose prose-p:text-small space-y-2">
              <p className="hero-paragraph font-medium leading-tight max-w-prose text-pretty text-[var(--color-fg-text)]">
                I am a web developer, plant dad, and gym rat.
              </p>
              <p className="hero-paragraph font-medium leading-tight max-w-prose text-pretty text-[var(--color-fg-text)]">
                Suntanned from so much hiking,
              </p>
              <p className="hero-paragraph font-medium leading-tight max-w-prose text-pretty text-[var(--color-fg-text)]">
                and an{' '}
                <span className="bg-[var(--color-bg-4)]">
                  <i>
                    <u>obsessed</u>
                  </i>{' '}
                </span>
                beginner photographer.
              </p>
            </div>
          </div>
          <div
            className="shrink-0 size-40 sm:size-48 rounded-md border-2 border-dashed border-[var(--color-fg-gray-1)] bg-[var(--color-bg-2)] flex items-center justify-center text-[var(--color-fg-gray-1)]"
            aria-hidden="true"
          >
            <ImageIcon className="size-10" />
          </div>
        </div>
      </header>
      <div>
        <Link to="/about">
          <Button
            className="my-2 rounded-full border-2 border-[var(--color-fg-orange)] hover:bg-transparent hover:text-[var(--color-fg-orange)]"
            variant="default"
          >
            About Me
          </Button>
        </Link>
      </div>
      <div>
        <section className="mt-10 2xl:mt-16 mb-10 2xl:mb-16">
          <div className="mb-1">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-3xl font-medium leading-tight text-[var(--color-fg-green)]">
                Photography
              </h2>
              <Button asChild variant="pill">
                <Link to="/photography">
                  See all photography
                  <ArrowRight />
                </Link>
              </Button>
            </div>
            <p className="text-[var(--color-fg-text)] py-1">
              See my photography
            </p>
          </div>
          <div className="photography-homepage-journal-container flex-shrink-0 lg:inline lg:max-w-[350px] xl:max-w-[650px]">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              <PhotographyHomepageArticleSection
                photographyArticleSectionProps={articleProps}
              />
            </div>
          </div>
        </section>
        <section className="my-5">
          <div className="flex flex-row mb-5 justify-between items-center">
            <h2 className="text-3xl font-medium leading-tight text-[var(--color-fg-green)]">
              Plants
            </h2>
            <Button asChild variant="pill">
              <Link to="/plants">
                See all plants
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <PlantsHomepageFavorites collection={data.data.favoriteCollection} />
        </section>
        {/*
        <section>
          <h3>Trails</h3>
        </section>
        <section>
          <h3>Blog</h3>
        </section>
        <section>
          <h3>Notes</h3>
        </section>
        <section>
          <h3>Gadgets</h3>
        </section>
        <section>
          <h2 className="text-3xl font-medium leading-tight text-[var(--color-fg-green)]">
            Projects
          </h2>
        </section>
        */}
      </div>
    </div>
  );
}

const PRODUCTS_BY_COLLECTION_QUERY = `#graphql
  fragment favoriteProduct on Product {
    id
    title
    handle
    updatedAt
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }

  query ProductsByCollection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      handle
      products(first: 50) {
        nodes {
          ...favoriteProduct
        }
      }
    }
  }
` as const;
