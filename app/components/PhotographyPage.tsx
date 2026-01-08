import {Gallery} from './react-grid-gallery';
import {fancyboxOptions} from '~/lib/fancyboxOptions';
import useFancybox from '~/lib/useFancybox';

export default function PhotographyPage({
  images,
  HeroContent,
}: PhotographyPageProps) {
  const [fancyboxRef] = useFancybox(fancyboxOptions);

  return (
    <div ref={fancyboxRef}>
      <div className="photography xxs:mx-5 2xl:mx-0 mx-auto">
        <HeroContent />
        <Gallery images={images} rowHeight={180} />
      </div>
    </div>
  );
}
