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

  const preparedImages = images.map((image) => ({
    ...image,
    width: image.image.width,
    height: image.image.height,
  })) as T[];

  const thumbnails: GalleryThumbnail<PhotographyImageWithMetadata>[] =
    buildLayoutFlat<T>(preparedImages, {
      containerWidth,
      maxItems,
      rowHeight,
      margin,
    });

  // Identify last row indices
  const lastRowIndices: number[] = [];
  let currentRowWidth = 0;
  for (let i = 0; i < thumbnails.length; i++) {
    const thumb = thumbnails[i];
    const thumbWidthWithMargin = thumb.scaledWidth + margin * 2;
    if (currentRowWidth + thumbWidthWithMargin > containerWidth + 1) {
      lastRowIndices.length = 0;
      currentRowWidth = thumbWidthWithMargin;
    } else {
      currentRowWidth += thumbWidthWithMargin;
    }
    lastRowIndices.push(i);
  }

  return (
    <div id={id} ref={containerRef}>
      <div
        style={{
          ...styles.gallery,
          margin: -margin,
          display: 'flex',
          flexWrap: 'wrap',
          // Force all items in a row to have the same height
          alignItems: 'stretch',
        }}
      >
        {thumbnails.map((thumbnail, index) => {
          const isLastRow = lastRowIndices.includes(index);
          const ratio = thumbnail.image.width / thumbnail.image.height;

          const calcWidth = isLastRow
            ? rowHeight * ratio
            : thumbnail.scaledWidth;
          const calcHeight = isLastRow ? rowHeight : thumbnail.scaledHeight;

          return (
            <div
              key={thumbnail.image.url}
              style={{
                margin,
                position: 'relative',
                overflow: 'hidden',
                // flexGrow handles the "justification" stretching
                flexGrow: isLastRow ? 0 : ratio * 100,
                // flexBasis gives flexbox a starting point based on the image's proportions
                flexBasis: isLastRow
                  ? rowHeight * ratio
                  : thumbnail.scaledWidth,
                // We lock the height for the last row,
                // but let the others find a common height that fits the width
                height: isLastRow ? rowHeight : 'auto',
                minHeight: isLastRow ? 'none' : rowHeight,
              }}
            >
              <PhotographyImage
                image={thumbnail}
                alt=""
                className="hover:brightness-90 block w-full h-full object-cover"
                data-fancybox="gallery"
                width={Math.round(calcWidth)}
                height={Math.round(calcHeight)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

Gallery.displayName = 'Gallery';
