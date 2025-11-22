import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';

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
    <div>
      <h2>Featured Collections</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {featuredCollections.map((collection) => (
          <Link
            key={collection.handle}
            className="featured-collection relative rounded-md"
            to={`/collections/${collection.handle}`}
          >
            {collection.image && (
              <div className="featured-collection-image">
                <Image
                  data={collection.image}
                  sizes="(min-width: 45em) 20vw, 50vw"
                />
              </div>
            )}
            <h3 className="absolute bottom-1.5 border border-[var(--color-fg-green)] bg-[var(--color-bg-5)] text-[var(--color-fg-text)] rounded-lg px-2 py-1 ml-2 mb-1">
              {collection.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
