import type {LoaderFunctionArgs} from 'react-router';
import {getSeoMeta} from '@shopify/hydrogen';

// Maps a page's metaobjectType (the URL segment's category) to the field on
// each `photo` metaobject that should be matched against the URL's handle.
// 'allphotos' has no entry, since that page shows every photo unfiltered.
const REFERENCE_FIELD_BY_METAOBJECT_TYPE: Record<
  string,
  keyof PhotographyImageWithMetadata['meta']
> = {
  camerabody: 'cameraBody',
  lens: 'lens',
  filmstock: 'filmStockBrand',
  filmformat: 'filmFormat',
};

type StorefrontClient = LoaderFunctionArgs['context']['storefront'];

export async function fetchAllPhotos(
  storefront: StorefrontClient,
): Promise<PhotographyImageWithMetadata[]> {
  const response = await storefront.query(ALL_PHOTOS_QUERY, {
    variables: {first: 250},
  });

  return response.metaobjects.nodes.map((node) => ({
    alt: node.alt?.value ?? '',
    image: {
      url: node.imageUrl?.value ?? '',
      width: Number(node.imageWidth?.value ?? 0),
      height: Number(node.imageHeight?.value ?? 0),
    },
    meta: {
      fileType: node.fileType?.value ?? '',
      date: node.date?.value ?? '',
      index: node.index?.value ?? '',
      filmFormat: node.filmFormat?.reference?.handle ?? '',
      filmFormatDisplayName:
        node.filmFormat?.reference?.displayName?.value ?? undefined,
      cameraBody: node.cameraBody?.reference?.handle ?? '',
      cameraBodyDisplayName:
        node.cameraBody?.reference?.displayName?.value ?? undefined,
      lens: node.lens?.reference?.handle ?? '',
      lensDisplayName: node.lens?.reference?.displayName?.value ?? undefined,
      filmStockBrand: node.filmStock?.reference?.handle ?? '',
      filmStockDisplayName:
        node.filmStock?.reference?.displayName?.value ?? undefined,
      isoNumber: node.iso?.value ?? '',
      aperture: node.aperture?.value ?? '',
      shutterspeed: node.shutterspeed?.value ?? '',
    },
  }));
}

export function buildPhotoLookup(
  photos: PhotographyImageWithMetadata[],
): Map<string, PhotographyImageWithMetadata> {
  return new Map(
    photos.map((photo) => [`${photo.meta.date}-${photo.meta.index}`, photo]),
  );
}

// Resolves a journal article's masonry layout (date/index/className only)
// against the fetched photos, skipping any entry whose photo isn't found
// (e.g. before a migration has run) instead of throwing.
export function resolveMasonryImages(
  layout: MasonryLayoutEntry[],
  photosByKey: Map<string, PhotographyImageWithMetadata>,
): MasonryGalleryImage[] {
  return layout.flatMap((entry) => {
    const photo = photosByKey.get(`${entry.date}-${entry.index}`);
    return photo ? [{...photo, className: entry.className}] : [];
  });
}

export async function loadPhotographyPageData(
  args: LoaderFunctionArgs,
  seoData: PageSeoData,
) {
  const {context} = args;

  const allPhotos = await fetchAllPhotos(context.storefront);

  const metaobjectType = seoData.metaobjectType ?? 'allphotos';
  const referenceField = REFERENCE_FIELD_BY_METAOBJECT_TYPE[metaobjectType];

  const images = referenceField
    ? allPhotos.filter(
        (photo) =>
          photo.meta[referenceField] ===
          seoData.relativeUrlPath.split('/')[3],
      )
    : allPhotos;

  return {
    criticalData: {
      images,
      seo: seoData,
    },
  };
}

export async function loadPhotographyJournalData(seoData: PageSeoData) {
  return {
    criticalData: {
      seo: seoData,
    },
  };
}

export function createPhotographyPageMeta(matches: any, data: any) {
  const rootSeo = matches?.[1]?.data?.seo;
  const pageSeo = data?.criticalData?.seo;

  return getSeoMeta(rootSeo, pageSeo);
}

export const ALL_PHOTOS_QUERY = `#graphql
  query AllPhotos($first: Int!) {
    metaobjects(type: "photo", first: $first) {
      nodes {
        alt: field(key: "alt") { value }
        imageUrl: field(key: "image_url") { value }
        imageWidth: field(key: "image_width") { value }
        imageHeight: field(key: "image_height") { value }
        date: field(key: "date") { value }
        index: field(key: "index") { value }
        fileType: field(key: "file_type") { value }
        iso: field(key: "iso") { value }
        aperture: field(key: "aperture") { value }
        shutterspeed: field(key: "shutterspeed") { value }
        cameraBody: field(key: "camera_body") {
          reference {
            ... on Metaobject {
              handle
              displayName: field(key: "display_name") { value }
            }
          }
        }
        lens: field(key: "lens") {
          reference {
            ... on Metaobject {
              handle
              displayName: field(key: "display_name") { value }
            }
          }
        }
        filmStock: field(key: "film_stock") {
          reference {
            ... on Metaobject {
              handle
              displayName: field(key: "display_name") { value }
            }
          }
        }
        filmFormat: field(key: "film_format") {
          reference {
            ... on Metaobject {
              handle
              displayName: field(key: "display_name") { value }
            }
          }
        }
      }
    }
  }
` as const;
