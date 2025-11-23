import {
  Await,
  useLoaderData,
  type MetaFunction,
  type LoaderFunctionArgs,
} from 'react-router';
import type {Route} from './+types/plants._index';
import {Suspense} from 'react';
import type {CollectionQuery} from 'storefrontapi.generated';
import HeroCarousel from '../components/HeroCarousel';
import {PlantCard} from '~/components/PlantCard';
import {PlantFeaturedCollections} from '~/components/PlantFeaturedCollections';
import {PlantLastUpdated} from '~/components/PlantLastUpdated';
import {BlogPostSection} from '~/components/PlantBlogPostSection';
import {getSeoMeta} from '@shopify/hydrogen';

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  const pageSeoData = {
    title: 'Plant Home Page',
    description: 'My home page for my plants',
    url: 'https://www.johnnguyen.codes/plants',
    relativeUrlPath: '/plants',
    pageType: 'plants',
    updatedAt: '2025-11-26T12:53:28-08:00',
    publishedAt: '2020-05-05T03:20:10-07:00',
    media: [
      {
        url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/750x600.jpg?v=1763844438',
        width: 750,
        height: 600,
        altText: 'This is the plant home page featured image',
      },
    ],
  };

  return {
    featuredCollections: collections.nodes,
    seo: pageSeoData,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const featuredProducts = context.storefront
    .query(FEATURED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  const favoriteCollection = context.storefront
    .query(PRODUCTS_BY_COLLECTION_QUERY, {
      variables: {handle: 'favorites'},
    })
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    featuredProducts,
    favoriteCollection,
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
    className="flex h-96 items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white"
  >
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-2">Slide 1</h2>
      <p className="text-lg">Welcome to the carousel</p>
    </div>
  </div>,
  <div
    key="2"
    className="flex h-96 items-center justify-center bg-gradient-to-br from-green-500 to-teal-600 text-white"
  >
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-2">Slide 2</h2>
      <p className="text-lg">Navigate with arrows or dots</p>
    </div>
  </div>,
  <div
    key="3"
    className="flex h-96 items-center justify-center bg-gradient-to-br from-orange-500 to-red-600 text-white"
  >
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-2">Slide 3</h2>
      <p className="text-lg">Smooth transitions included</p>
    </div>
  </div>,
  <div
    key="4"
    className="flex h-96 items-center justify-center bg-gradient-to-br from-pink-500 to-rose-600 text-white"
  >
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-2">Slide 4</h2>
      <p className="text-lg">Click any dot to jump to a slide</p>
    </div>
  </div>,
];

export default function Plantpage() {
  const data = useLoaderData<typeof loader>();
  console.log('data:', data);
  return (
    <div className="plants-page xxs:mx-5 2xl:mx-0">
      <HeroCarousel
        items={carouselItems}
        autoPlay={true}
        autoPlayInterval={15000}
      />
      <PlantFeaturedCollections collections={data.featuredCollections} />
      <FavoritePlants collection={data.favoriteCollection} />
      <PlantLastUpdated products={data.featuredProducts} />
      <BlogPostSection />
    </div>
  );
}

function FavoritePlants({
  collection,
}: {
  collection: Promise<CollectionQuery | null>;
}) {
  return (
    <div className="favorite-products">
      <div className="flex-row">
        <h2>Favorite Plants</h2>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={collection}>
          {(response) => (
            <div className="favorite-products-container flex-shrink-0 lg:inline lg:max-w-[350px] xl:max-w-[650px]">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {response
                  ? response.collection?.products.nodes.map((product) => (
                      <PlantCard {...product} key={product.id} />
                    ))
                  : null}
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollections on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollections($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 10, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollections
      }
    }
  }
` as const;

const FEATURED_PRODUCTS_QUERY = `#graphql
  fragment FeaturedProduct on Product {
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
    productType
  }
  query FeaturedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedProduct
      }
    }
  }
` as const;

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
