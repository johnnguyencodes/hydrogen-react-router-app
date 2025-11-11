import {
  Await,
  useLoaderData,
  Link,
  type MetaFunction,
  type LoaderFunctionArgs,
} from 'react-router';
import type {Route} from './+types/plants._index';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {RecommendedProductsQuery} from 'storefrontapi.generated';
import HeroCarousel from '../components/HeroCarousel';

export const meta: MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

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

  return {
    featuredCollections: collections.nodes,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

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
  return (
    <div className="plants-page xxs:mx-5 2xl:mx-0">
      <HeroCarousel
        items={carouselItems}
        autoPlay={true}
        autoPlayInterval={15000}
      />
      <FeaturedCollections collections={data.featuredCollections} />
      <RecommendedProducts products={data.recommendedProducts} />
    </div>
  );
}

function FeaturedCollections({
  collections,
}: {
  collections: PlantCollectionArray;
}) {
  return (
    <div>
      {collections.map((collection) => (
        <Link
          key={collection.handle}
          className="featured-collection"
          to={`/collections/${collection.handle}`}
        >
          {collection.image && (
            <div className="featured-collection-image">
              <Image data={collection.image} sizes="100vw" />
            </div>
          )}
          <h1>{collection.title}</h1>
        </Link>
      ))}
    </div>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <div
                      className="rounded-md bg-[var(--color-bg-dim)]"
                      key={product.id}
                    >
                      <Link
                        className="recommended-product"
                        to={`/${product.productType}/${product.handle}`}
                      >
                        <div className="p-5">
                          <Image
                            data={product.images.nodes[0]}
                            aspectRatio="1/1"
                            sizes="(min-width: 45em) 20vw, 50vw"
                          />
                          <h4 className="text-md text-[var(--color-fg-green)]">
                            {product.title}
                          </h4>
                        </div>
                      </Link>
                    </div>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
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
    collections(first: 6, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollections
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
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
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 250, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
