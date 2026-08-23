import {useEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useSearchParams} from 'react-router';
import {ChevronDown} from 'lucide-react';
import {humanizeHandle} from '~/lib/photoMetaDataAttributes';

type CategoryKey = 'filmFormat' | 'filmStock' | 'lens' | 'cameraBody';

type CategoryConfig = {
  key: CategoryKey;
  label: string;
  param: string;
  metaField: 'filmFormat' | 'filmStockBrand' | 'lens' | 'cameraBody';
  displayNameField:
    | 'filmFormatDisplayName'
    | 'filmStockDisplayName'
    | 'lensDisplayName'
    | 'cameraBodyDisplayName';
};

// Left-to-right order and URL param names.
const CATEGORIES: CategoryConfig[] = [
  {
    key: 'filmFormat',
    label: 'Format',
    param: 'filmFormat',
    metaField: 'filmFormat',
    displayNameField: 'filmFormatDisplayName',
  },
  {
    key: 'filmStock',
    label: 'Film Stock',
    param: 'filmStock',
    metaField: 'filmStockBrand',
    displayNameField: 'filmStockDisplayName',
  },
  {
    key: 'lens',
    label: 'Lens',
    param: 'lens',
    metaField: 'lens',
    displayNameField: 'lensDisplayName',
  },
  {
    key: 'cameraBody',
    label: 'Camera',
    param: 'camera',
    metaField: 'cameraBody',
    displayNameField: 'cameraBodyDisplayName',
  },
];

type FilterOption = {
  handle: string;
  displayName: string;
  count: number;
};

// `allImages` supplies the full, stable set of option labels for this
// category (so options never disappear as other filters narrow things down).
// `availableImages` - allImages filtered by every *other* active category -
// supplies each option's live count; an option absent from availableImages
// (count 0) can't produce any results given the current selections elsewhere
// and gets disabled/grayed out by the caller.
function buildOptions(
  allImages: PhotographyImageWithMetadata[],
  availableImages: PhotographyImageWithMetadata[],
  category: CategoryConfig,
): FilterOption[] {
  const displayNameByHandle = new Map<string, string>();

  for (const image of allImages) {
    const handle = image.meta[category.metaField];
    if (!handle || displayNameByHandle.has(handle)) continue;
    displayNameByHandle.set(
      handle,
      image.meta[category.displayNameField] || humanizeHandle(handle),
    );
  }

  const countByHandle = new Map<string, number>();
  for (const image of availableImages) {
    const handle = image.meta[category.metaField];
    if (!handle) continue;
    countByHandle.set(handle, (countByHandle.get(handle) ?? 0) + 1);
  }

  return Array.from(displayNameByHandle.entries())
    .map(([handle, displayName]) => ({
      handle,
      displayName,
      count: countByHandle.get(handle) ?? 0,
    }))
    .sort((a, b) => a.displayName.localeCompare(b.displayName));
}

export function buildActivePhotoFilters(
  searchParams: URLSearchParams,
): Partial<Record<CategoryKey, string[]>> {
  const active: Partial<Record<CategoryKey, string[]>> = {};

  for (const category of CATEGORIES) {
    const values = searchParams.getAll(category.param);
    if (values.length > 0) active[category.key] = values;
  }

  return active;
}

export function filterPhotosByActiveFilters(
  images: PhotographyImageWithMetadata[],
  active: Partial<Record<CategoryKey, string[]>>,
): PhotographyImageWithMetadata[] {
  const entries = Object.entries(active) as [CategoryKey, string[]][];
  if (entries.length === 0) return images;

  const categoryByKey = new Map(CATEGORIES.map((c) => [c.key, c]));

  return images.filter((image) =>
    entries.every(([key, handles]) => {
      const category = categoryByKey.get(key);
      if (!category) return true;
      return handles.includes(image.meta[category.metaField]);
    }),
  );
}

function FilterDropdown({
  category,
  options,
  selected,
  isOpen,
  onToggleOpen,
  onToggleValue,
}: {
  category: CategoryConfig;
  options: FilterOption[];
  selected: string[];
  isOpen: boolean;
  onToggleOpen: () => void;
  onToggleValue: (value: string) => void;
}) {
  const hasSelections = selected.length > 0;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<{top: number; left: number} | null>(
    null,
  );

  // The panel is portaled to document.body (see below) so it can render with
  // a fixed position above the filter bar's overflow-x-auto container -
  // that container clips the y-axis too (setting overflow-x forces the
  // other axis to compute as clipped rather than visible per the CSS spec),
  // which was hiding the dropdown entirely.
  useEffect(() => {
    if (!isOpen) {
      setPosition(null);
      return;
    }

    function updatePosition() {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPosition({top: rect.bottom + 8, left: rect.left});
    }

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  return (
    <div className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        onClick={onToggleOpen}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs uppercase tracking-wide whitespace-nowrap hover:cursor-pointer ${
          hasSelections
            ? 'border-[var(--color-fg-green)] text-[var(--color-fg-green)]'
            : 'border-[var(--color-fg-text)]/30 text-[var(--color-fg-text)]'
        }`}
      >
        {category.label}
        {hasSelections ? ` (${selected.length})` : ''}
        <ChevronDown className="size-3.5" />
      </button>
      {isOpen &&
        position &&
        createPortal(
          <div
            data-photo-filter-panel
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              zIndex: 9999,
            }}
            className="max-h-80 min-w-[220px] overflow-y-auto rounded-md border border-[var(--color-fg-text)]/20 bg-[var(--color-bg-2)] p-2 shadow-lg"
          >
            {options.length === 0 ? (
              <p className="px-2 py-1 text-sm text-[var(--color-fg-text)]">
                No options
              </p>
            ) : (
              options.map((option) => {
                const isSelected = selected.includes(option.handle);
                const isDisabled = option.count === 0 && !isSelected;
                return (
                  <label
                    key={option.handle}
                    className={`flex items-center gap-2 rounded px-2 py-1.5 text-sm ${
                      isDisabled
                        ? 'cursor-not-allowed opacity-40'
                        : 'hover:cursor-pointer hover:bg-[var(--color-bg-3)]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={isDisabled}
                      onChange={() => onToggleValue(option.handle)}
                      className="accent-[var(--color-fg-green)] disabled:cursor-not-allowed"
                    />
                    <span className="flex-1 text-[var(--color-fg-text)]">
                      {option.displayName}
                    </span>
                    <span className="text-[var(--color-fg-text)]/60">
                      {option.count}
                    </span>
                  </label>
                );
              })
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}

export function PhotoFilterBar({
  images,
}: {
  images: PhotographyImageWithMetadata[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openCategory, setOpenCategory] = useState<CategoryKey | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (barRef.current?.contains(target)) return;
      if (target.closest?.('[data-photo-filter-panel]')) return;
      setOpenCategory(null);
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const active = buildActivePhotoFilters(searchParams);
  const hasActiveFilters = Object.keys(active).length > 0;

  // Each category's option counts (and disabled state) reflect the images
  // that would remain if every *other* active category's filter were
  // applied, so e.g. picking "Half Frame" as the format grays out every
  // lens that never shot on that format instead of just hiding it.
  const optionsByCategory = useMemo(() => {
    const map = new Map<CategoryKey, FilterOption[]>();
    for (const category of CATEGORIES) {
      const othersActive = {...active};
      delete othersActive[category.key];
      const availableImages = filterPhotosByActiveFilters(images, othersActive);
      map.set(category.key, buildOptions(images, availableImages, category));
    }
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, searchParams]);

  function toggleValue(category: CategoryConfig, value: string) {
    const next = new URLSearchParams(searchParams);
    const current = next.getAll(category.param);
    next.delete(category.param);
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    for (const v of updated) next.append(category.param, v);
    setSearchParams(next, {preventScrollReset: true});
  }

  function clearAll() {
    const next = new URLSearchParams(searchParams);
    for (const category of CATEGORIES) next.delete(category.param);
    setSearchParams(next, {preventScrollReset: true});
  }

  return (
    <div ref={barRef} className="flex items-center gap-2 overflow-x-auto pb-1">
      {CATEGORIES.map((category) => (
        <FilterDropdown
          key={category.key}
          category={category}
          options={optionsByCategory.get(category.key) ?? []}
          selected={active[category.key] ?? []}
          isOpen={openCategory === category.key}
          onToggleOpen={() =>
            setOpenCategory((prev) => (prev === category.key ? null : category.key))
          }
          onToggleValue={(value) => toggleValue(category, value)}
        />
      ))}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="shrink-0 text-xs text-[var(--color-fg-text)] underline hover:cursor-pointer"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
