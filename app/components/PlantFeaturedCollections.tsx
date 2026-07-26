import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';
import {ArrowRight} from 'lucide-react';

export function PlantFeaturedCollections({
  collections,
}: {
  collections: PlantCollectionArray;
}) {
  const featuredCollections = collections.filter(
    (collection) =>
      collection.handle !== 'favorites' && collection.handle !== 'all-plants',
  );
  return (
    <div className="mb-10 2xl:mb-16">
      <h2 className="text-3xl font-medium leading-tight text-[var(--color-fg-green)]">
        Featured Collections
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {featuredCollections.map((collection) => (
          <Link
            key={collection.handle}
            className="featured-collection group relative block overflow-hidden rounded-md transform-gpu"
            to={`/collections/${collection.handle}`}
          >
            {collection.image && (
              <>
                <Image
                  data={collection.image}
                  aspectRatio="1/1"
                  sizes="(min-width: 64em) 33vw, (min-width: 40em) 50vw, 100vw"
                  className="h-full w-full object-cover group-hover:brightness-90"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                />
              </>
            )}
            <h3 className="absolute bottom-3 left-3 text-xl font-medium text-[var(--color-bg-dim)] dark:text-[var(--color-fg-text)] drop-shadow-sm">
              {collection.title}
            </h3>
            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 inline-flex size-7 items-center justify-center rounded-full border-2 border-[var(--color-fg-green)] bg-[var(--color-fg-green)] text-[var(--color-bg-dim)] transition-colors group-hover:bg-transparent group-hover:text-[var(--color-fg-green)]"
            >
              <ArrowRight className="size-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
