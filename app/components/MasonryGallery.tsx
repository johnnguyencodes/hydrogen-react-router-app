import {MasonryGalleryImage} from './MasonryGalleryImage';
import clsx from 'clsx';

export default function MasonryGallery({images}) {
  const getColSpan = (className, breakpoint) => {
    const order = ['2xl', 'xl', 'lg', 'md', 'sm', 'base'];
    const startIndex = breakpoint ? order.indexOf(breakpoint) : 5;
    for (let i = startIndex; i < order.length; i++) {
      const bp = order[i];
      const regex =
        bp === 'base' ? /col-span-(\d+)/ : new RegExp(`${bp}:col-span-(\\d+)`);
      const match = className?.match(regex);
      if (match) return parseInt(match[1]);
    }
    return 12;
  };

  return (
    <div className="mx-auto xxs:max-w-[320px] xs:max-w-[375px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1400px]">
      <div className="grid grid-cols-12 gap-1">
        {images.map((item) => {
          const ratio = item.image.width / item.image.height;

          // Row height is 50px
          const calcRS = (contW, bp) =>
            Math.ceil(
              ((contW / 12) * getColSpan(item.className, bp)) / ratio / 11,
            );

          return (
            <div
              key={item.image.url}
              className={clsx(
                'overflow-hidden border relative masonry-item',
                item.className,
              )}
              style={
                {
                  // Pass calculated spans to CSS variables
                  '--rs-base': calcRS(320, 'base'),
                  '--rs-sm': calcRS(640, 'sm'),
                  '--rs-md': calcRS(768, 'md'),
                  '--rs-lg': calcRS(1024, 'lg'),
                  '--rs-xl': calcRS(1280, 'xl'),
                  '--rs-2xl': calcRS(1400, '2xl'),
                } as React.CSSProperties
              }
            >
              <MasonryGalleryImage
                image={item}
                className="hover:brightness-90 block w-full h-full object-cover"
                dataFancyboxName="gallery"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
