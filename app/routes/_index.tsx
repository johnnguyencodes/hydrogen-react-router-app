import {
  Await,
  Link,
  useLoaderData,
  type LoaderFunctionArgs,
  type MetaFunction,
} from 'react-router';
import {Suspense} from 'react';
import HeroCarousel from '../components/HeroCarousel';
import type {Route} from './+types/_index';
import {Button} from '../components/ui/button';
import {ImageIcon} from 'lucide-react';
import {PhotographyHomepageArticleSection} from '~/components/PhotographyHomepageArticleSection';
import {photographyJournalSeoData} from '~/lib/photographyJournalSeoData';
import {
  getLatestJournalEntry,
  getEntryImage,
  stripHtml,
} from '~/lib/plantPageUtils';
import type {HomepagePlantsWithJournalQuery} from 'storefrontapi.generated';

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

const carouselItems = [
  <div
    key="1"
    className="h-[600px] bg-[url('https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-10-04--001--full-frame--nikon-f2--nikkor-35mm-105mm-f35-f45-ais--kodak-gold--200--unknown--unknown.webp')] bg-cover bg-center"
  ></div>,
];

const allSeoData = [
  ...photographyJournalSeoData,
  // ...photographyLensSeoData,
  // ...photographyFilmStockSeoData,
  // ...photographyFilmFormatSeoData,
  // ...photographyCameraBodySeoData,
];

const sectionCards = [
  {
    title: 'Photography',
    href: '/photography',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.',
  },
  {
    title: 'Plants',
    href: '/plants',
    description:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  },
];

/**
 * Builds PageSeoData-shaped items from plant products so they can be
 * merged with photography journal items and rendered by the same card
 * component. Only plants with at least one journal entry are included;
 * the card uses that entry's latest-dated image and stripped-text body.
 */
function buildPlantJournalItems(
  response: HomepagePlantsWithJournalQuery | null,
): PageSeoData[] {
  if (!response?.collection) return [];

  const items: PageSeoData[] = [];

  for (const product of response.collection.products.nodes) {
    const metafields = product.metafields ?? [];
    const journalMetafield = metafields.find(
      (metafield) => metafield?.key === 'journal',
    );
    const imagesMetafield = metafields.find(
      (metafield) => metafield?.key === 'images',
    );

    if (!journalMetafield?.value) continue;

    let journal: JournalEntry[] = [];
    try {
      journal = JSON.parse(journalMetafield.value) as JournalEntry[];
    } catch (error) {
      console.error('Failed to parse journal metafield:', error);
      continue;
    }

    const latestEntry = getLatestJournalEntry(journal);
    if (!latestEntry) continue;

    let entryImage = null;
    if (imagesMetafield?.value) {
      try {
        const parsedImages = JSON.parse(
          imagesMetafield.value,
        ) as AdminImageWithMetadata[];
        entryImage = getEntryImage(parsedImages, latestEntry.date);
      } catch (error) {
        console.error('Failed to parse images metafield:', error);
      }
    }

    const fallbackImage = product.images.nodes[0];
    const media = entryImage?.image
      ? {
          url: entryImage.image.url,
          width: entryImage.image.width,
          height: entryImage.image.height,
          altText:
            entryImage.alt ||
            fallbackImage?.altText ||
            `${product.title} journal image`,
        }
      : {
          url: fallbackImage?.url ?? '',
          width: fallbackImage?.width ?? 0,
          height: fallbackImage?.height ?? 0,
          altText: fallbackImage?.altText || product.title,
        };

    items.push({
      status: 'active',
      title: product.title,
      description: stripHtml(latestEntry.content),
      url: `https://www.johnnguyen.codes/plants/${product.handle}`,
      relativeUrlPath: `/plants/${product.handle}`,
      pageType: 'plants',
      publishedAt: latestEntry.date,
      updatedAt: product.updatedAt,
      media: [media],
    });
  }

  return items;
}

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
  const allPlantsCollection = context.storefront
    .query(PRODUCTS_BY_COLLECTION_QUERY, {
      variables: {handle: 'all-plants'},
    })
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    allPlantsCollection,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home-page xxs:mx-5 2xl:mx-0 mt-4">
      <HeroCarousel items={carouselItems} />
      <header className="hero rounded-md text-base lg:top-4">
        <h1 className="hero-title text-pretty text-7xl font-medium text-[var(--color-fg-green)] max-w-[30ch] mb-5">
          John Nguyen
        </h1>
        <div className="prose max-w-prose prose-p:text-small space-y-2">
          <p className="hero-paragraph font-medium leading-tight max-w-prose text-pretty text-[var(--color-fg-text)]">
            Web developer, plant dad, and{' '}
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
          <Button
            className="my-2 rounded-full border-2 border-[var(--color-fg-orange)] hover:bg-transparent hover:text-[var(--color-fg-orange)]"
            variant="default"
          >
            About Me
          </Button>
        </Link>
      </div>
      <div>
        {/* TEMP: card styling/copy to be revisited in a future pass */}
        <section className="mt-10 2xl:mt-16 grid grid-cols-2 gap-3">
          {sectionCards.map((card) => (
            <Link to={card.href} key={card.href} className="block">
              <article className="flex flex-col rounded-md overflow-hidden">
                <div className="px-4 py-2 bg-[var(--color-bg-2)]">
                  <h3 className="text-xl font-semibold text-[var(--color-fg-green)]">
                    {card.title}
                  </h3>
                </div>
                <div
                  className="w-full aspect-[2/1] flex items-center justify-center border-2 border-dashed border-[var(--color-fg-gray-1)] bg-[var(--color-bg-2)] text-[var(--color-fg-gray-1)]"
                  aria-hidden="true"
                >
                  <ImageIcon className="size-10" />
                </div>
                <div className="px-4 pt-2 pb-3">
                  <p className="text-[var(--color-fg-text)]">
                    {card.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </section>
        <section className="mt-10 2xl:mt-16 mb-10 2xl:mb-16">
          <div className="mb-1">
            <h2 className="text-3xl font-medium leading-tight text-[var(--color-fg-green)]">
              Latest
            </h2>
            <p className="text-[var(--color-fg-text)] py-1">
              Recent photography and plant journal updates
            </p>
          </div>
          <div className="photography-homepage-journal-container flex-shrink-0 lg:inline lg:max-w-[350px] xl:max-w-[650px]">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={data.data.allPlantsCollection}>
                  {(response) => {
                    const plantItems = buildPlantJournalItems(response);
                    const mergedItems = [...allSeoData, ...plantItems].sort(
                      (a, b) =>
                        new Date(b.publishedAt).getTime() -
                        new Date(a.publishedAt).getTime(),
                    );
                    const articleProps: PhotographyArticleSectionProps = {
                      pageSeoDataArray: mergedItems,
                      sectionTitle: 'Latest',
                      sectionDescription:
                        'Recent photography and plant journal updates',
                    };
                    return (
                      <PhotographyHomepageArticleSection
                        photographyArticleSectionProps={articleProps}
                      />
                    );
                  }}
                </Await>
              </Suspense>
            </div>
          </div>
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
  fragment homepagePlantWithJournal on Product {
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
    metafields(
      identifiers: [
        {namespace: "plant", key: "journal"}
        {namespace: "plant", key: "images"}
      ]
    ) {
      key
      value
    }
  }

  query HomepagePlantsWithJournal(
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
          ...homepagePlantWithJournal
        }
      }
    }
  }
` as const;
