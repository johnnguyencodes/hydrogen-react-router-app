import {Image} from '@shopify/hydrogen';
import clsx from 'clsx';
import {buildPhotoMetaDataAttributes} from '~/lib/photoMetaDataAttributes';

export function PhotographyGridImage({
  image,
  id,
  className,
  height,
  width,
}: PhotographyImageProps) {
  if (!image) {
    return <div className="product-image"></div>;
  }

  return (
    <div className="product-image cursor-zoom-in">
      <a
        data-fancybox="gallery"
        href={image.image.url}
        data-lazy-src={image.image.url}
        {...buildPhotoMetaDataAttributes(image.meta)}
      >
        <Image
          id={id}
          alt={image.image.alt || 'Photography Image'}
          aspectRatio={`${width} / ${height}`}
          data={image.image}
          className={(clsx('w-full h-full object-cover'), className)}
          sizes={`${width}px`}
          loading="lazy"
        ></Image>
      </a>
    </div>
  );
}
