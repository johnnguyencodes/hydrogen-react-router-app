import {Gallery} from './react-grid-gallery';
import {fancyboxOptions} from '~/lib/fancyboxOptions';
import useFancybox from '~/lib/useFancybox';

export default function PhotographyPage({
  images,
  HeroContent,
  stretchLastRow,
}: PhotographyPageProps) {
  const [fancyboxRef] = useFancybox(fancyboxOptions);

  return (
    <div ref={fancyboxRef}>
      <div className="photography mx-auto">
        {HeroContent && <HeroContent />}
        <Gallery
          images={images}
          rowHeight={180}
          stretchLastRow={stretchLastRow}
        />
      </div>
    </div>
  );
}
