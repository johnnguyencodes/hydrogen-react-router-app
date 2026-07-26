import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import type {ProductItemFragment, CollectionItemFragment} from 'storefrontapi.generated';
import {formatTimeStampToMDY, isRecentlyUpdated} from '~/lib/plantPageUtils';
import {Badge} from '~/components/ui/badge';

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
      className="product-item relative rounded-md overflow-hidden block w-full"
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
      {isRecentlyUpdated(updatedAt) && (
        <Badge variant="new" className="absolute top-2 left-2">
          New
        </Badge>
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
