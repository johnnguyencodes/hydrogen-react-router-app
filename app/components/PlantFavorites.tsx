import {Suspense} from 'react';
import {Await} from 'react-router';
import type {CollectionQuery} from 'storefrontapi.generated';
import {PlantCard} from './PlantCard';

export function PlantsFavorites({
  collection,
}: {
  collection: Promise<CollectionQuery | null>;
}) {
  return (
    <div className="favorite-products 2xl:mb-16">
      <div className="flex-row mb-5">
        <h2 className="text-3xl font-medium leading tight text-[var(--color-fg-green)]">
          Favorite Plants
        </h2>
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
