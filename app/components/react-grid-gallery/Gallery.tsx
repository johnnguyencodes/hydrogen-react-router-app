import {MouseEvent} from 'react';
import {Image} from './Image';
import {useContainerWidth} from './useContainerWidth';
import {buildLayoutFlat} from './buildLayout';
import type {Image as ImageInterface, GalleryProps} from './types';
import * as styles from './styles';
import {PhotographyImage} from '../PhotographyImage';

export const Gallery = <T extends ImageInterface>({
  images,
  id = 'ReactGridGallery',
  enableImageSelection = false,
  onSelect = () => {},
  rowHeight,
  maxRows,
  margin = 2,
  defaultContainerWidth = 1400,
  onClick = () => {},
  tileViewportStyle,
  thumbnailStyle,
  tagStyle,
  thumbnailImageComponent,
}: GalleryProps<T>): JSX.Element => {
  const {containerRef, containerWidth} = useContainerWidth(
    defaultContainerWidth,
  );

  const thumbnails: GalleryThumbnail<PhotographyImageWithMetadata>[] =
    buildLayoutFlat<T>(images, {
      containerWidth,
      maxRows,
      rowHeight,
      margin,
    });

  // const handleSelect = (index: number, event: MouseEvent<HTMLElement>) => {
  //   event.preventDefault();
  //   onSelect(index, images[index], event);
  // };

  // const handleClick = (index: number, event: MouseEvent<HTMLElement>) => {
  //   onClick(index, images[index], event);
  // };

  return (
    <div id={id} className="ReactGridGallery" ref={containerRef}>
      <div style={styles.gallery}>
        {thumbnails.map((thumbnail) => (
          <div
            key={thumbnail.image.asset.url}
            style={{
              width: thumbnail.scaledWidth,
              height: thumbnail.scaledHeight,
              margin: margin,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <PhotographyImage
              image={thumbnail}
              alt=""
              key={thumbnail.image.asset.url}
              id={thumbnail.image.asset.url}
              className="hover:brightness-90"
              data-fancybox="gallery"
              height={thumbnail.scaledHeight}
              width={
                rowHeight *
                (thumbnail.image.asset.width / thumbnail.image.asset.height)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

Gallery.displayName = 'Gallery';
