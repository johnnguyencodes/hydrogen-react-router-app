// "nikon-d850" -> "Nikon D850". Used as a fallback display label wherever a
// photo's display_name (authored on its metaobject reference) isn't
// available yet, both in the lightbox popover and the All Photos filter bar.
export function humanizeHandle(handle: string): string {
  return handle
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Carries a photography image's metadata onto its `data-fancybox="gallery"`
// trigger element as plain data-* attributes, so the lightbox (a vanilla-JS
// Fancybox instance, see ~/lib/fancyboxOptions.ts) can read it back off
// `slide.triggerEl.dataset` to build the info popover, without needing to
// change how Fancybox slides are built.
export function buildPhotoMetaDataAttributes(
  meta: PhotographyImageWithMetadata['meta'],
): Record<string, string> {
  const attributes: Record<string, string> = {};

  const set = (key: string, value: string | undefined) => {
    if (value && value !== 'unknown') attributes[key] = value;
  };

  set('data-photo-date', meta.date);
  set('data-photo-camera-body', meta.cameraBody);
  set('data-photo-camera-body-name', meta.cameraBodyDisplayName);
  set('data-photo-lens', meta.lens);
  set('data-photo-lens-name', meta.lensDisplayName);
  set('data-photo-film-stock', meta.filmStockBrand);
  set('data-photo-film-stock-name', meta.filmStockDisplayName);
  set('data-photo-film-format', meta.filmFormat);
  set('data-photo-film-format-name', meta.filmFormatDisplayName);
  set('data-photo-iso', meta.isoNumber);
  set('data-photo-aperture', meta.aperture);
  set('data-photo-shutterspeed', meta.shutterspeed);

  return attributes;
}
