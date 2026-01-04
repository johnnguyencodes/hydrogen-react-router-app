import {Image} from '@shopify/hydrogen';
import clsx from 'clsx';

export function MasonryGalleryImage({
  image,
  className,
  dataFancyboxName,
}: MasonryGalleryImageProps) {
  if (!image) return <div className="product-image"></div>;

  // 1. Extract the column span from the className (default to 12 if not found)
  const colSpanMatch = image.className?.match(/col-span-(\d+)/);
  const colSpan = colSpanMatch ? parseInt(colSpanMatch[1]) : 12;

  /**
   * 2. Calculate the 'sizes' attribute
   * - Max container width: 1400px
   * - Column width at max container: (1400 / 12 columns) * colSpan
   * - Viewport width below max container: (colSpan / 12 columns) * 100vw
   */
  const maxContainerWidth = 1400;
  const totalGridColumns = 12;

  // The exact pixel width the image takes up when the site hits its 1400px limit
  const maxWidthAtCap = Math.round(
    (maxContainerWidth / totalGridColumns) * colSpan,
  );

  // The percentage of the screen the image takes up on smaller screens
  const viewportPercentage = Math.round((colSpan / totalGridColumns) * 100);

  // sizes string: "If screen > 1400px, use maxWidthAtCap. Otherwise, use viewportPercentage."
  const sizesString = `(min-width: 1400px) ${maxWidthAtCap}px, ${viewportPercentage}vw`;

  return (
    <div className="product-image cursor-zoom-in h-full w-full">
      <a
        data-fancybox={dataFancyboxName}
        href={image.image.url}
        // These data-attributes are for Fancybox, not the initial page load
        data-sizes={sizesString}
      >
        <Image
          data={image.image}
          alt={image.alt || 'Photography Image'}
          className={clsx(
            className,
            'hover:brightness-90 block w-full h-full object-cover',
          )}
          sizes={sizesString}
          loading="lazy"
        />
      </a>
    </div>
  );
}
