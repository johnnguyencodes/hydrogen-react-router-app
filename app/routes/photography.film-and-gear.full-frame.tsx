import {
  useLoaderData,
  type LoaderFunctionArgs,
  type MetaFunction,
} from 'react-router';
import {
  loadPhotographyPageData,
  createPhotographyPageMeta,
} from '~/lib/photographyPageUtils';
import PhotographyPage from '~/components/PhotographyPage';
import {fullFrame as seoData} from '~/lib/photographyFilmFormatSeoData';

export async function loader(args: LoaderFunctionArgs) {
  return loadPhotographyPageData(args, seoData);
}

export const meta: MetaFunction<typeof loader> = ({data, matches}) => {
  return createPhotographyPageMeta(matches, data);
};

function PhotographyHero(): React.JSX.Element {
  return (
    <div>
      <h1>{seoData.title}</h1>
    </div>
  );
}

export default function Route() {
  const {criticalData} = useLoaderData<typeof loader>();

  const images = JSON.parse(
    criticalData.metaobject.metaobject.images.value,
  ) as PhotographyImageWithMetadata[];

  return <PhotographyPage images={images} HeroContent={PhotographyHero} />;
}
