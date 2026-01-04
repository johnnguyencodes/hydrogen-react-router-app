import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import PhotographyPage from '~/components/PhotographyPage';
import {article20251113 as seoData} from '~/lib/photographyArticleSeoData';
import {
  createPhotographyPageMeta,
  loadPhotographyPageData,
} from '~/lib/photographyPageUtils';

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
  return <PhotographyPage images={images} HeroContent={PhotographyHero} />;
}
const images: PhotographyImageWithMetadata[] = [
  {
    alt: '',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-11-13--013--full-frame--nikon-d850--nikkor-35mm-105mm-f35-f45-ais--45mp--iso-200--f56--1-3s.jpg?v=1766773425',
      width: 4096,
      height: 2731,
    },
    meta: {
      fileType: 'photography',
      date: '2025-11-13',
      index: '013',
      filmFormat: 'full-frame',
      cameraBody: 'nikon-d850',
      lens: 'nikkor-35mm-105mm-f35-f45-ais',
      filmStockBrand: '45mp',
      isoNumber: 'iso-200',
      aperture: 'f56',
      shutterspeed: '1-3s',
    },
  },
  {
    alt: '',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-11-13--002--full-frame--nikon-d850--nikkor-35mm-105mm-f35-f45-ais--45mp--iso-64--f56--1-3s.jpg?v=1766773425',
      width: 4096,
      height: 2731,
    },
    meta: {
      fileType: 'photography',
      date: '2025-11-13',
      index: '002',
      filmFormat: 'full-frame',
      cameraBody: 'nikon-d850',
      lens: 'nikkor-35mm-105mm-f35-f45-ais',
      filmStockBrand: '45mp',
      isoNumber: 'iso-64',
      aperture: 'f56',
      shutterspeed: '1-3s',
    },
  },
  {
    alt: '',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-11-13--001--full-frame--nikon-d850--nikkor-35mm-105mm-f35-f45-ais--45mp--iso-1000--f8--1-250s.jpg?v=1766773425',
      width: 4096,
      height: 2731,
    },
    meta: {
      fileType: 'photography',
      date: '2025-11-13',
      index: '001',
      filmFormat: 'full-frame',
      cameraBody: 'nikon-d850',
      lens: 'nikkor-35mm-105mm-f35-f45-ais',
      filmStockBrand: '45mp',
      isoNumber: 'iso-1000',
      aperture: 'f8',
      shutterspeed: '1-250s',
    },
  },
];
