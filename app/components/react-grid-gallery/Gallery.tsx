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
  rowHeight = 180,
  maxRows,
  margin = 2,
  defaultContainerWidth = 0,
  onClick = () => {},
  tileViewportStyle,
  thumbnailStyle,
  tagStyle,
  thumbnailImageComponent,
}: GalleryProps<T>): JSX.Element => {
  const {containerRef, containerWidth} = useContainerWidth(
    defaultContainerWidth,
  );

  const thumbnails = buildLayoutFlat<T>(images, {
    containerWidth,
    maxRows,
    rowHeight,
    margin,
  });

  const handleSelect = (index: number, event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onSelect(index, images[index], event);
  };

  const handleClick = (index: number, event: MouseEvent<HTMLElement>) => {
    onClick(index, images[index], event);
  };

  return (
    <div id={id} className="ReactGridGallery" ref={containerRef}>
      <div style={styles.gallery}>
        {thumbnails.map((item, index) => (
          <div key={index}>
            <PhotographyImage
              image={{
                __typename: 'Image',
                url: item.src,
              }}
              alt={item.alt}
              key={item.src ?? index}
              id={item.src ?? index}
              className="hover:brightness-90"
              data-fancybox="gallery"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

Gallery.displayName = 'Gallery';
