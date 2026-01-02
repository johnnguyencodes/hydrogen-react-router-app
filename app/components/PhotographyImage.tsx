import {Image} from '@shopify/hydrogen';
import clsx from 'clsx';

export function PhotographyImage({
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
        data-sizes="100vw"
        data-lazy-src={image.image.url}
      >
        <Image
          id={id}
          alt={image.alt || 'Photography Image'}
          data={image.image}
          className={(clsx('w-full h-full object-cover'), className)}
          sizes={`${width}px`}
          loading="lazy"
        ></Image>
      </a>
    </div>
  );
}
