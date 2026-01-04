import {MasonryGalleryImage} from './MasonryGalleryImage';

export default function MasonryGallery({
  images,
}: {
  images: MasonryGalleryImage[];
}) {
  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-12 auto-rows-[50px] gap-1">
        {images.map((item) => (
          <div
            key={item.image.url}
            className={`overflow-hidden border relative ${item.className ?? ''}`}
          >
            <MasonryGalleryImage
              image={item}
              alt={item.alt}
              className="hover:brightness-90 block w-full h-full object-cover"
              dataFancyboxName="gallery"
              width={item.image.width}
              height={item.image.height}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
