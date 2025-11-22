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
    <div className="featured-products">
      <div className="flex-row">
        <h2>Featured Plants</h2>
        <Link to="/collections/all-plants">See all plants</Link>
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
