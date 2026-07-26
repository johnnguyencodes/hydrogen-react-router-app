import * as React from 'react';
import {Pagination} from '@shopify/hydrogen';
import {buttonVariants} from '~/components/ui/button';
import {cn} from '~/lib/utils';

/**
 * <PaginatedResourceSection > is a component that encapsulate how the previous and next behaviors throughout your application.
 */
export function PaginatedResourceSection<NodesType>({
  connection,
  children,
  resourcesClassName,
}: {
  connection: React.ComponentProps<typeof Pagination<NodesType>>['connection'];
  children: React.FunctionComponent<{node: NodesType; index: number}>;
  resourcesClassName?: string;
}) {
  return (
    <Pagination connection={connection}>
      {({nodes, isLoading, PreviousLink, NextLink}) => {
        const resourcesMarkup = nodes.map((node, index) =>
          children({node, index}),
        );

        return (
          <div>
            <div className="flex justify-center mb-5">
              <PreviousLink className={cn(buttonVariants({variant: 'pill'}))}>
                {isLoading ? 'Loading...' : '↑ Load previous'}
              </PreviousLink>
            </div>
            {resourcesClassName ? (
              <div className={resourcesClassName}>{resourcesMarkup}</div>
            ) : (
              resourcesMarkup
            )}
            <div className="flex justify-center mt-5 mb-4">
              <NextLink className={cn(buttonVariants({variant: 'pill'}))}>
                {isLoading ? 'Loading...' : 'Load more ↓'}
              </NextLink>
            </div>
          </div>
        );
      }}
    </Pagination>
  );
}
