import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import PhotographyPage from '~/components/PhotographyPage';
import {article20251004 as seoData} from '~/lib/photographyArticleSeoData';
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
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-10-05--007--half-frame--pentax-17--pentax-25mm-f35-hd-hf--fujifilm--400--unknown--unknown.jpg?v=1766773187',
      width: 2048,
      height: 1365,
    },
    meta: {
      fileType: 'photography',
      date: '2025-10-05',
      index: '007',
      filmFormat: 'half-frame',
      cameraBody: 'pentax-17',
      lens: 'pentax-25mm-f35-hd-hf',
      filmStockBrand: 'fujifilm',
      isoNumber: '400',
      aperture: 'unknown',
      shutterspeed: 'unknown',
    },
  },
  {
    alt: '',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-10-05--006--half-frame--pentax-17--pentax-25mm-f35-hd-hf--fujifilm--400--unknown--unknown.jpg?v=1766773187',
      width: 2048,
      height: 1365,
    },
    meta: {
      fileType: 'photography',
      date: '2025-10-05',
      index: '006',
      filmFormat: 'half-frame',
      cameraBody: 'pentax-17',
      lens: 'pentax-25mm-f35-hd-hf',
      filmStockBrand: 'fujifilm',
      isoNumber: '400',
      aperture: 'unknown',
      shutterspeed: 'unknown',
    },
  },
  {
    alt: '',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-10-05--005--half-frame--pentax-17--pentax-25mm-f35-hd-hf--fujifilm--400--unknown--unknown.jpg?v=1766773186',
      width: 1365,
      height: 2048,
    },
    meta: {
      fileType: 'photography',
      date: '2025-10-05',
      index: '005',
      filmFormat: 'half-frame',
      cameraBody: 'pentax-17',
      lens: 'pentax-25mm-f35-hd-hf',
      filmStockBrand: 'fujifilm',
      isoNumber: '400',
      aperture: 'unknown',
      shutterspeed: 'unknown',
    },
  },
  {
    alt: '',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-10-05--004--half-frame--pentax-17--pentax-25mm-f35-hd-hf--fujifilm--400--unknown--unknown.jpg?v=1766773184',
      width: 2048,
      height: 1365,
    },
    meta: {
      fileType: 'photography',
      date: '2025-10-05',
      index: '004',
      filmFormat: 'half-frame',
      cameraBody: 'pentax-17',
      lens: 'pentax-25mm-f35-hd-hf',
      filmStockBrand: 'fujifilm',
      isoNumber: '400',
      aperture: 'unknown',
      shutterspeed: 'unknown',
    },
  },
  {
    alt: '',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-10-05--003--half-frame--pentax-17--pentax-25mm-f35-hd-hf--fujifilm--400--unknown--unknown.jpg?v=1766773185',
      width: 1365,
      height: 2048,
    },
    meta: {
      fileType: 'photography',
      date: '2025-10-05',
      index: '003',
      filmFormat: 'half-frame',
      cameraBody: 'pentax-17',
      lens: 'pentax-25mm-f35-hd-hf',
      filmStockBrand: 'fujifilm',
      isoNumber: '400',
      aperture: 'unknown',
      shutterspeed: 'unknown',
    },
  },
  {
    alt: '',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-10-05--002--half-frame--pentax-17--pentax-25mm-f35-hd-hf--fujifilm--400--unknown--unknown.jpg?v=1766773187',
      width: 1365,
      height: 2048,
    },
    meta: {
      fileType: 'photography',
      date: '2025-10-05',
      index: '002',
      filmFormat: 'half-frame',
      cameraBody: 'pentax-17',
      lens: 'pentax-25mm-f35-hd-hf',
      filmStockBrand: 'fujifilm',
      isoNumber: '400',
      aperture: 'unknown',
      shutterspeed: 'unknown',
    },
  },
  {
    alt: '',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-10-05--001--half-frame--pentax-17--pentax-25mm-f35-hd-hf--fujifilm--400--unknown--unknown.jpg?v=1766773186',
      width: 2048,
      height: 1365,
    },
    meta: {
      fileType: 'photography',
      date: '2025-10-05',
      index: '001',
      filmFormat: 'half-frame',
      cameraBody: 'pentax-17',
      lens: 'pentax-25mm-f35-hd-hf',
      filmStockBrand: 'fujifilm',
      isoNumber: '400',
      aperture: 'unknown',
      shutterspeed: 'unknown',
    },
  },
  {
    alt: '',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-10-04--007--full-frame--nikon-f2--nikkor-35mm-105mm-f35-f45-ais--kodak-gold--200--unknown--unknown.jpg?v=1766773427',
      width: 2048,
      height: 1365,
    },
    meta: {
      fileType: 'photography',
      date: '2025-10-04',
      index: '007',
      filmFormat: 'full-frame',
      cameraBody: 'nikon-f2',
      lens: 'nikkor-35mm-105mm-f35-f45-ais',
      filmStockBrand: 'kodak-gold',
      isoNumber: '200',
      aperture: 'unknown',
      shutterspeed: 'unknown',
    },
  },
  {
    alt: '',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-10-04--006--full-frame--nikon-f2--nikkor-35mm-105mm-f35-f45-ais--kodak-gold--200--unknown--unknown.jpg?v=1766773426',
      width: 1365,
      height: 2048,
    },
    meta: {
      fileType: 'photography',
      date: '2025-10-04',
      index: '006',
      filmFormat: 'full-frame',
      cameraBody: 'nikon-f2',
      lens: 'nikkor-35mm-105mm-f35-f45-ais',
      filmStockBrand: 'kodak-gold',
      isoNumber: '200',
      aperture: 'unknown',
      shutterspeed: 'unknown',
    },
  },
  {
    alt: '',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-10-04--005--full-frame--nikon-f2--nikkor-35mm-105mm-f35-f45-ais--kodak-gold--200--unknown--unknown.jpg?v=1766773425',
      width: 2048,
      height: 1365,
    },
    meta: {
      fileType: 'photography',
      date: '2025-10-04',
      index: '005',
      filmFormat: 'full-frame',
      cameraBody: 'nikon-f2',
      lens: 'nikkor-35mm-105mm-f35-f45-ais',
      filmStockBrand: 'kodak-gold',
      isoNumber: '200',
      aperture: 'unknown',
      shutterspeed: 'unknown',
    },
  },
  {
    alt: '',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-10-04--004--full-frame--nikon-f2--nikkor-35mm-105mm-f35-f45-ais--kodak-gold--200--unknown--unknown.jpg?v=1766773426',
      width: 2048,
      height: 1365,
    },
    meta: {
      fileType: 'photography',
      date: '2025-10-04',
      index: '004',
      filmFormat: 'full-frame',
      cameraBody: 'nikon-f2',
      lens: 'nikkor-35mm-105mm-f35-f45-ais',
      filmStockBrand: 'kodak-gold',
      isoNumber: '200',
      aperture: 'unknown',
      shutterspeed: 'unknown',
    },
  },
  {
    alt: '',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-10-04--003--full-frame--nikon-f2--nikkor-35mm-105mm-f35-f45-ais--kodak-gold--200--unknown--unknown.jpg?v=1766773425',
      width: 1365,
      height: 2048,
    },
    meta: {
      fileType: 'photography',
      date: '2025-10-04',
      index: '003',
      filmFormat: 'full-frame',
      cameraBody: 'nikon-f2',
      lens: 'nikkor-35mm-105mm-f35-f45-ais',
      filmStockBrand: 'kodak-gold',
      isoNumber: '200',
      aperture: 'unknown',
      shutterspeed: 'unknown',
    },
  },
  {
    alt: '',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-10-04--002--full-frame--nikon-f2--nikkor-35mm-105mm-f35-f45-ais--kodak-gold--200--unknown--unknown.jpg?v=1766773425',
      width: 2048,
      height: 1365,
    },
    meta: {
      fileType: 'photography',
      date: '2025-10-04',
      index: '002',
      filmFormat: 'full-frame',
      cameraBody: 'nikon-f2',
      lens: 'nikkor-35mm-105mm-f35-f45-ais',
      filmStockBrand: 'kodak-gold',
      isoNumber: '200',
      aperture: 'unknown',
      shutterspeed: 'unknown',
    },
  },
  {
    alt: '',
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-10-04--001--full-frame--nikon-f2--nikkor-35mm-105mm-f35-f45-ais--kodak-gold--200--unknown--unknown.jpg?v=1766773425',
      width: 2048,
      height: 1365,
    },
    meta: {
      fileType: 'photography',
      date: '2025-10-04',
      index: '001',
      filmFormat: 'full-frame',
      cameraBody: 'nikon-f2',
      lens: 'nikkor-35mm-105mm-f35-f45-ais',
      filmStockBrand: 'kodak-gold',
      isoNumber: '200',
      aperture: 'unknown',
      shutterspeed: 'unknown',
    },
  },
];
