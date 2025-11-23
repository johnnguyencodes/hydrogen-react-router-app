import {Suspense} from 'react';
import {Await, Link} from 'react-router';
import type {RecommendedProductsQuery} from 'storefrontapi.generated';
import {PlantCard} from './PlantCard';

export function PlantLastUpdated({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <div className="featured-products 2xl:mb-16">
      <div className="flex flex-row mb-5 justify-between content-between">
        <h2 className="text-3xl font-medium leading tight text-[var(--color-fg-green)]">
          Featured Plants
        </h2>
        <Link
          to="/collections/all-plants"
          className="text-[var(--color-fg-text)] py-1"
        >
          See all plants
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="featured-products-container flex-shrink-0 lg:inline lg:max-w-[350px] xl:max-w-[650px]">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {response
                  ? response.products.nodes.map((product) => (
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
