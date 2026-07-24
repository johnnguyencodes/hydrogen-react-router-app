import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import type {ProductItemFragment, CollectionItemFragment} from 'storefrontapi.generated';
import {formatTimeStampToMDY} from '~/lib/plantPageUtils';

export function ProductItem({
  product,
  loading,
}: {
  product: CollectionItemFragment | ProductItemFragment;
  loading?: 'eager' | 'lazy';
}) {
  const image = product.featuredImage;
  const updatedAt = 'updatedAt' in product ? product.updatedAt : undefined;

  return (
    <Link
      className="product-item rounded-md bg-[var(--color-bg-2)] overflow-hidden block w-full p-2"
      key={product.id}
      prefetch="intent"
      to={`/plants/${product.handle}`}
    >
      {image && (
        <Image
          alt={image.altText || product.title}
          aspectRatio="1/1"
          data={image}
          loading={loading}
          sizes="(min-width: 45em) 400px, 100vw"
        />
      )}
      <div className="pt-2">
        <h4 className="text-xl font-medium text-[var(--color-fg-green)]">
          {product.title}
        </h4>
        {updatedAt ? (
          <div className="pt-1">
            <p className="text-[var(--color-fg-text)]">
              {formatTimeStampToMDY(updatedAt)}
            </p>
          </div>
        ) : null}
      </div>
    </Link>
  );
}
