import {useContainerWidth} from './useContainerWidth';
import {buildLayoutFlat} from './buildLayout';
import type {Image as ImageInterface, GalleryProps} from './types';
import * as styles from './styles';
import {PhotographyImage} from '../PhotographyImage';

export const Gallery = <T extends ImageInterface>({
  images,
  id = 'ReactGridGallery',
  rowHeight,
  maxItems = 9999999,
  margin = 2,
  defaultContainerWidth = 1400,
}: GalleryProps<T>): JSX.Element => {
  const {containerRef, containerWidth} = useContainerWidth(
    defaultContainerWidth,
  );

  const thumbnails: GalleryThumbnail<PhotographyImageWithMetadata>[] =
    buildLayoutFlat<T>(images, {
      containerWidth,
      maxItems,
      rowHeight,
      margin,
    });

  return (
    <div id={id} className="ReactGridGallery" ref={containerRef}>
      <div style={styles.gallery}>
        {thumbnails.map((thumbnail) => (
          <div
            key={thumbnail.image.url}
            style={{
              width: thumbnail.scaledWidth,
              height: thumbnail.scaledHeight,
              margin,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <PhotographyImage
              image={thumbnail}
              alt=""
              key={thumbnail.image.url}
              className="hover:brightness-90"
              data-fancybox="gallery"
              height={thumbnail.scaledHeight}
              width={
                rowHeight * (thumbnail.image.width / thumbnail.image.height)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

Gallery.displayName = 'Gallery';
