import {Image} from '@shopify/hydrogen';
import clsx from 'clsx';

export function PhotographyImage({
  image,
  alt,
  id,
  className,
  sizes,
}: ProductImageProps) {
  if (!image) {
    return <div className="product-image"></div>;
  }

  return (
    <div className="product-image cursor-zoom-in">
      <a
        data-fancybox="gallery"
        href={image.url}
        data-sizes="100vw"
        data-lazy-src={image.url}
      >
        <Image
          id={id}
          alt={alt || 'Product Image'}
          data={image}
          className={clsx(className)}
          sizes={sizes}
          loading="lazy"
        ></Image>
      </a>
    </div>
  );
}

// Use metafield editor app to pull all photography images
// Iterate through all images and sort images into date, lens, camera body, film stock, format size and add them to the shop's metafields
// Dump all images into one metafield for the photos page
// On each landing page, do a graphql fetch of all the images for that page
// Identify each image by its index number
// On "zine" pages, pull all photos, and then filter with an array of selected image identifiers
//
// On the photos page, set up filters
