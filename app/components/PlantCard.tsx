import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';
import {formatTimeStampToMDY, isRecentlyUpdated} from '~/lib/plantPageUtils';
import {Badge} from '~/components/ui/badge';

export function PlantCard(props: PlantCardProps) {
  return (
    <div className="rounded-md overflow-hidden flex-shrink-0 w-64">
      <Link
        className="favorite-product group"
        to={`/plants/${props.handle}`}
      >
        <div className="relative">
          <div className="overflow-hidden rounded-md transform-gpu">
            <Image
              data={props.images.nodes[0]}
              aspectRatio="1/1"
              sizes="(min-width: 45em) 20vw, 50vw"
              className="group-hover:brightness-90"
            />
          </div>
          {isRecentlyUpdated(props.updatedAt) && (
            <Badge variant="new" className="absolute top-2 left-2">
              New
            </Badge>
          )}
          <div className="pt-1">
            <h4 className="text-xl font-medium text-[var(--color-fg-green)]">
              {props.title}
            </h4>
            <div>
              {props.updatedAt ? (
                <p className="text-[var(--color-fg-text)] text-lg">
                  {formatTimeStampToMDY(props.updatedAt)}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
