import {
  useLoaderData,
  type LoaderFunctionArgs,
  type MetaFunction,
} from 'react-router';
import {formatTimeStampToMDY} from '~/lib/plantPageUtils';
import {getSeoMeta} from '@shopify/hydrogen';

export const photographyLensSeoData = {
  title: 'Pentax 25mm f/3.5 HD HF Lens',
  description: 'This is about the Pentax 25mm f/3.5 HD lens.',
  url: 'https://www.johnnguyen.codes/photography/film-and-gear/pentax-25mm-f35-hd-hf',
  relativeUrlPath: '/photography/film-and-gear/pentax-25mm-f35-hd-hf',
  namespace: 'lens',
  pageType: 'photography',
  updatedAt: '2025-11-26T12:53:28-08:00',
  publishedAt: '2020-05-05T03:20:10-07:00',
  media: [
    {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/750x600.jpg?v=1763844438',
      width: 750,
      height: 600,
      altText: 'This is the photagraphy home page featured image',
    },
  ],
};

const namespace = photographyLensSeoData.namespace;
const key = photographyLensSeoData.relativeUrlPath.split('/')[3];

export async function loader(args: LoaderFunctionArgs) {
  const criticalData = await loadCriticalData(args);

  return {criticalData};
}

async function loadCriticalData({context}: LoaderFunctionArgs) {
  const data = await context.storefront.query(IMAGES_QUERY, {
    variables: {
      namespace,
      key,
    },
  });

  return {
    data,
    seo: photographyLensSeoData,
  };
}

export const meta: MetaFunction<typeof loader> = ({data, matches}) => {
  const rootSeo = (matches as any)[1].data?.seo;
  const pageSeo = data?.criticalData.seo;

  return getSeoMeta(rootSeo, pageSeo);
};

export default function Photography() {
  const data = useLoaderData<typeof loader>();

  console.log('data', JSON.parse(data.criticalData.data.shop.images.value));

  return (
    <div className="photography xxs:mx-5 2xl:mx-0">
      <p>This is about the Pentax 25mm f/3.5 HD lens.</p>
    </div>
  );
}

const IMAGES_QUERY = `#graphql
  query shopMetafield($namespace: String!, $key: String!) {
    shop {
      images: metafield(namespace: $namespace, key: $key) {
        value
      }
    }
}
`;
