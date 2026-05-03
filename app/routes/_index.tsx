import {
  Link,
  useLoaderData,
  type LoaderFunctionArgs,
  type MetaFunction,
} from 'react-router';
import HeroCarousel from '../components/HeroCarousel';
import type {Route} from './+types/_index';
import {Button} from '../components/ui/button';
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
  console.log('data:', data);
  return (
    <div className="home-page xxs:mx-5 2xl:mx-0 mt-4">
      <header className="hero rounded-md text-base lg:top-4">
        <h1 className="hero-title text-pretty text-7xl font-medium text-[var(--color-fg-green)] max-w-[30ch] mb-5">
          Hullo, I'm John!
        </h1>
        <div className="prose max-w-prose prose-p:text-small">
          <p className="hero-paragraph font-medium leading-tight max-w-prose text-pretty text-[var(--color-fg-text)]">
            I am a web developer, plant dad, gym rat, suntanned from so much
            hiking, and <br className="hidden md:block" /> an{' '}
            <span className="bg-[var(--color-bg-4)]">
              <i>
                <u>obsessed</u>
              </i>{' '}
            </span>
            beginner photographer.
          </p>
        </div>
      </header>
      <div>
        <Link to="/about">
          <Button className="my-2" variant="default">
            About Me
          </Button>
        </Link>
      </div>
      <div>
        <section className="my-5">
          <h2 className="text-[var(--color-fg-green)] text-xl font-semibold">
            Photography
          </h2>
          <div className="flex justify-between">
            <p className="text-[var(--color-fg-text)] text-sm">
              See my photography
            </p>
            <Link
              to="/photography"
              className="text-[var(--color-fg-text)] text-sm"
            >
              View more
            </Link>
          </div>
          <div className="photography-homepage-journal-container flex-shrink-0 lg:inline lg:max-w-[350px] xl:max-w-[650px]">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              <PhotographyHomepageArticleSection
                photographyArticleSectionProps={articleProps}
              />
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-[var(--color-fg-green)] text-xl font-semibold">
            Plants
          </h2>
          <div className="flex justify-between">
            <p className="text-[var(--color-fg-text)] text-sm">See my plants</p>
            <Link to="/plants" className="text-[var(--color-fg-text)] text-sm">
              View more
            </Link>
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
          <h2 className="text-[var(--color-fg-green)] text-xl font-semibold">
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
