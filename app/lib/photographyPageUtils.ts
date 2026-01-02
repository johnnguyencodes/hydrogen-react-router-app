import type {LoaderFunctionArgs} from 'react-router';
import {getSeoMeta} from '@shopify/hydrogen';

export async function loadPhotographyPageData(
  args: LoaderFunctionArgs,
  seoData: PageSeoData,
) {
  const {context} = args;

  const metaobjectType = seoData.metaobjectType;
  const metaobjectHandle = seoData.relativeUrlPath.split('/')[3];

  const metaobject = await context.storefront.query(
    PHOTOGRAPHY_METAOBJECT_QUERY,
    {
      variables: {type: metaobjectType, handle: metaobjectHandle},
    },
  );

  return {
    criticalData: {
      metaobject,
      seo: seoData,
    },
  };
}

export function createPhotographyPageMeta(matches: any, data: any) {
  const rootSeo = matches?.[1]?.data?.seo;
  const pageSeo = data?.criticalData?.seo;

  return getSeoMeta(rootSeo, pageSeo);
}

export const PHOTOGRAPHY_METAOBJECT_QUERY = `#graphql
  query getPhotographyImages($handle: String!, $type: String!) {
    metaobject(handle: {handle: $handle, type: $type}) {
      images: field(key: "images") {
        value
      }
    }
  }
`;
