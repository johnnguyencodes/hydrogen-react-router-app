// This function maps through all the plant images and uses regex to find a file match
// If there is a match, enter metadata based on the regex match
// If there isn't a match, use general defaults as fallback for metadata

export function returnCarouselImages(images: AdminImageWithMetadata[]) {
  return images.filter((image) => image.meta.category === 'carousel');
}

export function getLatestCarouselDate(
  carouselImages: AdminImageWithMetadata[],
): string | null {
  if (carouselImages.length === 0) return null;

  return carouselImages.reduce((latest, img) => {
    return img.meta.date > latest ? img.meta.date : latest;
  }, carouselImages[0].meta.date);
}

export function getLatestCarouselImages(
  carouselImages: AdminImageWithMetadata[],
  latestCarouselDate: string | null,
) {
  if (!latestCarouselDate) return [];
  return carouselImages.filter(
    (img) => getISODate(img.meta.date) === latestCarouselDate,
  );
}

function getISODate(date: Date | string) {
  return new Date(date).toISOString().split('T')[0];
}

export function extractMetafieldValues(
  metafields: PlantCriticalMetafield[],
): Record<string, string> {
  return metafields.reduce(
    (acc: Record<string, string>, metafield: Record<string, string>) => {
      if (metafield?.key && metafield.value !== null) {
        const key = toCamelCase(metafield.key);
        acc[key] = metafield.value;
      }
      return acc;
    },
    {},
  );
}

export function returnFormattedDate(dateBroughtHome: string): string {
  const [year, month, day] = dateBroughtHome.split('-').map(Number);

  // Month is 0-based in JS Date
  const modifiedDateBroughtHome = new Date(year, month - 1, day);

  const formattedDate = modifiedDateBroughtHome.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return formattedDate;
}

function toCamelCase(str: string) {
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

export function formatTimeStampToMDY(iso: string): string {
  const d = new Date(iso);
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const yyyy = d.getUTCFullYear();
  return `${mm}-${dd}-${yyyy}`;
}

export function getLatestJournalEntry(
  journal: JournalEntry[],
): JournalEntry | null {
  if (journal.length === 0) return null;

  return journal.reduce((latest, entry) => {
    return entry.date > latest.date ? entry : latest;
  }, journal[0]);
}

export function getEntryImage(
  images: AdminImageWithMetadata[],
  entryDate: string,
): AdminImageWithMetadata | null {
  const entryImages = images
    .filter((image) => image.meta.date === entryDate)
    .sort((a, b) => a.meta.index - b.meta.index);

  return entryImages[0] ?? null;
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const RECENTLY_UPDATED_WINDOW_DAYS = 30;

export function isRecentlyUpdated(
  updatedAt?: string | null,
  windowDays: number = RECENTLY_UPDATED_WINDOW_DAYS,
): boolean {
  if (!updatedAt) return false;
  const updatedTime = new Date(updatedAt).getTime();
  if (Number.isNaN(updatedTime)) return false;
  const diffMs = Date.now() - updatedTime;
  const windowMs = windowDays * 24 * 60 * 60 * 1000;
  return diffMs >= 0 && diffMs <= windowMs;
}
