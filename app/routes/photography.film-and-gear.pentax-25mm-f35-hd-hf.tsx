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

const photographyLensSeoData = {
  title: 'Pentax 25mm f/3.5 HD HF Lens',
  description: 'This is about the Pentax 25mm f/3.5 HD lens.',
  url: 'https://www.johnnguyen.codes/photography/film-and-gear/pentax-25mm-f35-hd-hf',
  relativeUrlPath: '/photography/film-and-gear/pentax-25mm-f35-hd-hf',
  metaobjectType: 'lens',
  pageType: 'photography',
  updatedAt: '2025-11-26T12:53:28-08:00',
  publishedAt: '2020-05-05T03:20:10-07:00',
  media: [
    {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/750x600.jpg?v=1763844438',
      width: 750,
      height: 600,
      altText: 'This is the photagraphy home page featured imageee',
    },
  ],
};

export async function loader(args: LoaderFunctionArgs) {
  return loadPhotographyPageData(args, photographyLensSeoData);
}

export const meta: MetaFunction<typeof loader> = ({data, matches}) => {
  return createPhotographyPageMeta(matches, data);
};

function PhotographyHero(): React.JSX.Element {
  return (
    <div>
      <p>Hello! This is the coolest yeah hello yessss</p>
    </div>
  );
}

export default function Pentax25mmF35HdHfRoute() {
  const {criticalData} = useLoaderData<typeof loader>();

  const images = JSON.parse(
    criticalData.metaobject.metaobject.images.value,
  ) as PhotographyImageWithMetadata[];

  return <PhotographyPage images={images} HeroContent={PhotographyHero} />;
}
