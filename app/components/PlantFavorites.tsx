import {Suspense} from 'react';
import {Await, Link} from 'react-router';
import {ArrowRight} from 'lucide-react';
import type {ProductsByCollectionQuery} from 'storefrontapi.generated';
import {PlantCard} from './PlantCard';
import {Button} from '~/components/ui/button';

export function PlantsFavorites({
  collection,
}: {
  collection: Promise<ProductsByCollectionQuery | null>;
}) {
  return (
    <div className="favorite-products mb-10 2xl:mb-16">
      <div className="flex flex-row mb-5 justify-between items-center">
        <h2 className="text-3xl font-medium leading-tight text-[var(--color-fg-green)]">
          Favorite Plants
        </h2>
        <Button asChild variant="pill">
          <Link to="/plants/collections/favorites">
            See all favorites
            <ArrowRight />
          </Link>
        </Button>
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
