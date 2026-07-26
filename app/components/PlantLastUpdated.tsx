import {Suspense} from 'react';
import {Await, Link} from 'react-router';
import {ArrowRight} from 'lucide-react';
import type {FeaturedProductsQuery} from 'storefrontapi.generated';
import {PlantCard} from './PlantCard';
import {Button} from '~/components/ui/button';

export function PlantLastUpdated({
  products,
}: {
  products: Promise<FeaturedProductsQuery | null>;
}) {
  return (
    <div className="featured-products mb-10 2xl:mb-16">
      <div className="flex flex-row mb-5 justify-between items-center">
        <h2 className="text-3xl font-medium leading-tight text-[var(--color-fg-green)]">
          Featured Plants
        </h2>
        <Button asChild variant="pill">
          <Link to="/plants/collections/all-plants">
            See all plants
            <ArrowRight />
          </Link>
        </Button>
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
