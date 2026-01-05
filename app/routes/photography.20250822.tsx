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
      <div className="prose mx-auto">
        <h1 className="text-balance text-5xl font-medium text-[var(--color-fg-green)]">
          {seoData.title}
        </h1>
      </div>
      <div className="prose prose-p:text-[var(--color-fg-text)] prose-p:text-lg text-base prose-strong:text-[var(--color-fg-green)] max-w-prose mx-auto">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget
          orci sagittis, blandit ligula id, malesuada elit. Sed ultricies nunc
          nisl, eget gravida felis molestie consequat. Maecenas efficitur sed
          turpis eu mattis. Vivamus cursus mauris in neque faucibus viverra.
          Morbi vitae consectetur metus, a tempus arcu. Praesent tristique nibh
          eget gravida malesuada. Suspendisse at vestibulum sem, sed commodo
          magna. Curabitur volutpat non urna vitae elementum.
        </p>
      </div>
      <MasonryGallery images={masonryImagesGroup0} />
      <div className="prose prose-p:text-[var(--color-fg-text)] prose-p:text-lg text-base prose-strong:text-[var(--color-fg-green)] max-w-prose mx-auto">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget
          orci sagittis, blandit ligula id, malesuada elit. Sed ultricies nunc
          nisl, eget gravida felis molestie consequat. Maecenas efficitur sed
          turpis eu mattis. Vivamus cursus mauris in neque faucibus viverra.
          Morbi vitae consectetur metus, a tempus arcu. Praesent tristique nibh
          eget gravida malesuada. Suspendisse at vestibulum sem, sed commodo
          magna. Curabitur volutpat non urna vitae elementum.
        </p>
      </div>
      <MasonryGallery images={masonryImagesGroup1} />
      <MasonryGallery images={masonryImagesGroup15} />
      <div className="prose prose-p:text-[var(--color-fg-text)] prose-p:text-lg text-base prose-strong:text-[var(--color-fg-green)] max-w-prose mx-auto">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget
          orci sagittis, blandit ligula id, malesuada elit. Sed ultricies nunc
          nisl, eget gravida felis molestie consequat. Maecenas efficitur sed
          turpis eu mattis. Vivamus cursus mauris in neque faucibus viverra.
          Morbi vitae consectetur metus, a tempus arcu. Praesent tristique nibh
          eget gravida malesuada. Suspendisse at vestibulum sem, sed commodo
          magna. Curabitur volutpat non urna vitae elementum.
        </p>
      </div>
      <MasonryGallery images={masonryImagesGroup2} />
      <div className="prose prose-p:text-[var(--color-fg-text)] prose-p:text-lg text-base prose-strong:text-[var(--color-fg-green)] max-w-prose mx-auto">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget
          orci sagittis, blandit ligula id, malesuada elit. Sed ultricies nunc
          nisl, eget gravida felis molestie consequat. Maecenas efficitur sed
          turpis eu mattis. Vivamus cursus mauris in neque faucibus viverra.
          Morbi vitae consectetur metus, a tempus arcu. Praesent tristique nibh
          eget gravida malesuada. Suspendisse at vestibulum sem, sed commodo
          magna. Curabitur volutpat non urna vitae elementum.
        </p>
      </div>
      <MasonryGallery images={masonryImagesGroup3} />
      <div className="prose prose-p:text-[var(--color-fg-text)] prose-p:text-lg text-base prose-strong:text-[var(--color-fg-green)] max-w-prose mx-auto">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget
          orci sagittis, blandit ligula id, malesuada elit. Sed ultricies nunc
          nisl, eget gravida felis molestie consequat. Maecenas efficitur sed
          turpis eu mattis. Vivamus cursus mauris in neque faucibus viverra.
          Morbi vitae consectetur metus, a tempus arcu. Praesent tristique nibh
          eget gravida malesuada. Suspendisse at vestibulum sem, sed commodo
          magna. Curabitur volutpat non urna vitae elementum.
        </p>
      </div>
      <MasonryGallery images={masonryImagesGroup4} />
      <div className="prose prose-p:text-[var(--color-fg-text)] prose-p:text-lg text-base prose-strong:text-[var(--color-fg-green)] max-w-prose mx-auto">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget
          orci sagittis, blandit ligula id, malesuada elit. Sed ultricies nunc
          nisl, eget gravida felis molestie consequat. Maecenas efficitur sed
          turpis eu mattis. Vivamus cursus mauris in neque faucibus viverra.
          Morbi vitae consectetur metus, a tempus arcu. Praesent tristique nibh
          eget gravida malesuada. Suspendisse at vestibulum sem, sed commodo
          magna. Curabitur volutpat non urna vitae elementum.
        </p>
      </div>
      <MasonryGallery images={masonryImagesGroup5} />
      <div className="prose prose-p:text-[var(--color-fg-text)] prose-p:text-lg text-base prose-strong:text-[var(--color-fg-green)] max-w-prose mx-auto">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget
          orci sagittis, blandit ligula id, malesuada elit. Sed ultricies nunc
          nisl, eget gravida felis molestie consequat. Maecenas efficitur sed
          turpis eu mattis. Vivamus cursus mauris in neque faucibus viverra.
          Morbi vitae consectetur metus, a tempus arcu. Praesent tristique nibh
          eget gravida malesuada. Suspendisse at vestibulum sem, sed commodo
          magna. Curabitur volutpat non urna vitae elementum.
        </p>
      </div>
      <MasonryGallery images={masonryImagesGroup6} />
      <div className="prose prose-p:text-[var(--color-fg-text)] prose-p:text-lg text-base prose-strong:text-[var(--color-fg-green)] max-w-prose mx-auto">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget
          orci sagittis, blandit ligula id, malesuada elit. Sed ultricies nunc
          nisl, eget gravida felis molestie consequat. Maecenas efficitur sed
          turpis eu mattis. Vivamus cursus mauris in neque faucibus viverra.
          Morbi vitae consectetur metus, a tempus arcu. Praesent tristique nibh
          eget gravida malesuada. Suspendisse at vestibulum sem, sed commodo
          magna. Curabitur volutpat non urna vitae elementum.
        </p>
      </div>
      <MasonryGallery images={masonryImagesGroup7} />
      <div className="prose prose-p:text-[var(--color-fg-text)] prose-p:text-lg text-base prose-strong:text-[var(--color-fg-green)] max-w-prose mx-auto">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget
          orci sagittis, blandit ligula id, malesuada elit. Sed ultricies nunc
          nisl, eget gravida felis molestie consequat. Maecenas efficitur sed
          turpis eu mattis. Vivamus cursus mauris in neque faucibus viverra.
          Morbi vitae consectetur metus, a tempus arcu. Praesent tristique nibh
          eget gravida malesuada. Suspendisse at vestibulum sem, sed commodo
          magna. Curabitur volutpat non urna vitae elementum.
        </p>
      </div>
      <MasonryGallery images={masonryImagesGroup8} />
      <div className="prose prose-p:text-[var(--color-fg-text)] prose-p:text-lg text-base prose-strong:text-[var(--color-fg-green)] max-w-prose mx-auto">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget
          orci sagittis, blandit ligula id, malesuada elit. Sed ultricies nunc
          nisl, eget gravida felis molestie consequat. Maecenas efficitur sed
          turpis eu mattis. Vivamus cursus mauris in neque faucibus viverra.
          Morbi vitae consectetur metus, a tempus arcu. Praesent tristique nibh
          eget gravida malesuada. Suspendisse at vestibulum sem, sed commodo
          magna. Curabitur volutpat non urna vitae elementum.
        </p>
      </div>
      <MasonryGallery images={masonryImagesGroup9} />
      <div className="prose prose-p:text-[var(--color-fg-text)] prose-p:text-lg text-base prose-strong:text-[var(--color-fg-green)] max-w-prose mx-auto">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget
          orci sagittis, blandit ligula id, malesuada elit. Sed ultricies nunc
          nisl, eget gravida felis molestie consequat. Maecenas efficitur sed
          turpis eu mattis. Vivamus cursus mauris in neque faucibus viverra.
          Morbi vitae consectetur metus, a tempus arcu. Praesent tristique nibh
          eget gravida malesuada. Suspendisse at vestibulum sem, sed commodo
          magna. Curabitur volutpat non urna vitae elementum.
        </p>
      </div>
      <MasonryGallery images={masonryImagesGroup10} />
      <div className="prose prose-p:text-[var(--color-fg-text)] prose-p:text-lg text-base prose-strong:text-[var(--color-fg-green)] max-w-prose mx-auto">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget
          orci sagittis, blandit ligula id, malesuada elit. Sed ultricies nunc
          nisl, eget gravida felis molestie consequat. Maecenas efficitur sed
          turpis eu mattis. Vivamus cursus mauris in neque faucibus viverra.
          Morbi vitae consectetur metus, a tempus arcu. Praesent tristique nibh
          eget gravida malesuada. Suspendisse at vestibulum sem, sed commodo
          magna. Curabitur volutpat non urna vitae elementum.
        </p>
      </div>
      <MasonryGallery images={masonryImagesGroup11} />
      <div className="prose prose-p:text-[var(--color-fg-text)] prose-p:text-lg text-base prose-strong:text-[var(--color-fg-green)] max-w-prose mx-auto">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget
          orci sagittis, blandit ligula id, malesuada elit. Sed ultricies nunc
          nisl, eget gravida felis molestie consequat. Maecenas efficitur sed
          turpis eu mattis. Vivamus cursus mauris in neque faucibus viverra.
          Morbi vitae consectetur metus, a tempus arcu. Praesent tristique nibh
          eget gravida malesuada. Suspendisse at vestibulum sem, sed commodo
          magna. Curabitur volutpat non urna vitae elementum.
        </p>
      </div>
    </div>
  );
}

export default function Route() {
  return <PhotographyPage images={thumbnails} HeroContent={PhotographyHero} />;
}
