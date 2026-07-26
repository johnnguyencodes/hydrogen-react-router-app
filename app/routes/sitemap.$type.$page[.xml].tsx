import type {Route} from './+types/sitemap.$type.$page[.xml]';
import {getSitemap} from '@shopify/hydrogen';

export async function loader({
  request,
  params,
  context: {storefront},
}: Route.LoaderArgs) {
  const response = await getSitemap({
    storefront,
    request,
    params,
    locales: ['EN-US', 'EN-CA', 'FR-CA'],
    getLink: ({type, baseUrl, handle, locale}) => {
      const path = type === 'collections' ? `plants/collections` : type;
      if (!locale) return `${baseUrl}/${path}/${handle}`;
      return `${baseUrl}/${locale}/${path}/${handle}`;
    },
  });

  response.headers.set('Cache-Control', `max-age=${60 * 60 * 24}`);

  return response;
}
