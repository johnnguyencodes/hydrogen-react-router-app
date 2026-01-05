import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import PhotographyPage from '~/components/PhotographyPage';
import {article20250822 as seoData} from '~/lib/photographyArticleSeoData';
import {
  createPhotographyPageMeta,
  loadPhotographyJournalData,
} from '~/lib/photographyPageUtils';
import {
  masonryImagesGroup0,
  masonryImagesGroup1,
  masonryImagesGroup15,
  masonryImagesGroup2,
  masonryImagesGroup3,
  masonryImagesGroup4,
  masonryImagesGroup5,
  masonryImagesGroup6,
  masonryImagesGroup7,
  masonryImagesGroup8,
  masonryImagesGroup9,
  masonryImagesGroup10,
  masonryImagesGroup11,
  thumbnails,
} from '~/assets/imageData20250822';
import MasonryGallery from '~/components/MasonryGallery';

export async function loader(args: LoaderFunctionArgs) {
  return loadPhotographyJournalData(seoData);
}

export const meta: MetaFunction<typeof loader> = ({data, matches}) => {
  return createPhotographyPageMeta(matches, data);
};

function PhotographyHero(): React.JSX.Element {
  return (
    <div>
      <h1>{seoData.title}</h1>
      <MasonryGallery images={masonryImagesGroup0} />
      <MasonryGallery images={masonryImagesGroup1} />
      <MasonryGallery images={masonryImagesGroup15} />
      <MasonryGallery images={masonryImagesGroup2} />
      <MasonryGallery images={masonryImagesGroup3} />
      <MasonryGallery images={masonryImagesGroup4} />
      <MasonryGallery images={masonryImagesGroup5} />
      <MasonryGallery images={masonryImagesGroup6} />
      <MasonryGallery images={masonryImagesGroup7} />
      <MasonryGallery images={masonryImagesGroup8} />
      <MasonryGallery images={masonryImagesGroup9} />
      <MasonryGallery images={masonryImagesGroup10} />
      <MasonryGallery images={masonryImagesGroup11} />
    </div>
  );
}

export default function Route() {
  return <PhotographyPage images={thumbnails} HeroContent={PhotographyHero} />;
}
