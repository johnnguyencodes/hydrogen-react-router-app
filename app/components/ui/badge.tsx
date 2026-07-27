import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '~/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 transition-colors',
  {
    variants: {
      variant: {
        new: 'border-transparent bg-[var(--color-fg-orange)] text-[var(--color-bg-dim)] uppercase tracking-wide text-[10px] font-semibold',
        category:
          'rounded-full border-[1.5px] border-[var(--color-fg-statusline-2)] bg-[var(--color-bg-5)] text-[var(--color-fg-statusline-2)] text-sm',
      },
    },
    defaultVariants: {
      variant: 'category',
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({variant, className}))}
      {...props}
    />
  );
}

export {Badge, badgeVariants};
