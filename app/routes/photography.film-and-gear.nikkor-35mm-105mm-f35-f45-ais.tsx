import {type LoaderFunctionArgs, type MetaFunction} from 'react-router';
import {formatTimeStampToMDY} from '~/lib/plantPageUtils';
import {getSeoMeta} from '@shopify/hydrogen';

export const photographyLensSeoData = {
  title: 'Nikkor 35mm - 105mm f/3.5 - f/4.5 AI-S',
  description: 'This is about the Nikkor 35mm - 105mm f/3.5 - 4.5 AI-S lens.',
  url: 'https://www.johnnguyen.codes/photography/film-and-gear/nikkor-35mm-105mm-f35-f45-ais',
  relativeUrlPath: '/photography/film-and-gear/nikkor-35mm-105mm-f35-f45-ais',
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

export function loader() {
  return {
    seo: photographyLensSeoData,
  };
}

export const meta: MetaFunction<typeof loader> = ({data, matches}) => {
  const rootSeo = (matches as any)[1].data?.seo;
  const pageSeo = data?.seo;

  return getSeoMeta(rootSeo, pageSeo);
};

export default function Photography() {
  return (
    <div className="photography xxs:mx-5 2xl:mx-0">
      <p>This is about the Nikkor 35mm-105mm f/3.5 - 4.5 AI-S lens.</p>
    </div>
  );
}
