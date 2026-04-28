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

  // Helper to extract span from classes like "lg:col-span-3" or "col-span-12"
  const getSpan = (breakpoint?: string) => {
    // Define the order of breakpoints
    const order = ['2xl', 'xl', 'lg', 'md', 'sm', 'base'];
    const currentIndex = breakpoint ? order.indexOf(breakpoint) : 5;

    // Check the requested breakpoint and then work backwards to find the nearest defined span
    for (let i = currentIndex; i < order.length; i++) {
      const bp = order[i];
      const regex =
        bp === 'base' ? /col-span-(\d+)/ : new RegExp(`${bp}:col-span-(\\d+)`);

      const match = image.className?.match(regex);
      if (match) return parseInt(match[1]);
    }

    return 12; // Final fallback
  };

  // Calculate pixel widths based on your fixed container widths
  // Formula: (ContainerWidth / 12) * Span
  const w2xl = Math.round((1400 / 12) * getSpan('2xl'));
  const wxl = Math.round((1280 / 12) * getSpan('xl'));
  const wlg = Math.round((1024 / 12) * getSpan('lg'));
  const wmd = Math.round((768 / 12) * getSpan('md'));
  const wsm = Math.round((640 / 12) * getSpan('sm'));
  const wxs = Math.round((375 / 12) * getSpan());

  // Build the stepped sizes string
  // Browser reads this from left to right and stops at the first match
  const sizesString = [
    `(min-width: 1400px) ${w2xl}px`,
    `(min-width: 1280px) ${wxl}px`,
    `(min-width: 1024px) ${wlg}px`,
    `(min-width: 768px) ${wmd}px`,
    `(min-width: 640px) ${wsm}px`,
    `${wxs}px`,
  ].join(', ');

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
          alt={image.image.alt || 'Photography Image'}
          aspectRatio={`${width} / ${height}`}
          data={image.image}
          className={(clsx('w-full h-full object-cover'), className)}
          sizes={sizesString}
          loading="lazy"
        ></Image>
      </a>
    </div>
  );
}
