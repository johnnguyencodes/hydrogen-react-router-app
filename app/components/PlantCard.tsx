import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';
import {formatTimeStampToMDY} from '~/lib/plantPageUtils';

export function PlantCard(props: PlantCardProps) {
  return (
    <div className="rounded-md bg-[var(--color-bg-2)] overflow-hidden flex-shrink-0 w-64 p-2">
      <Link className="favorite-product" to={`/plants/${props.handle}`}>
        <div className="">
          <Image
            data={props.images.nodes[0]}
            aspectRatio="1/1"
            sizes="(min-width: 45em) 20vw, 50vw"
          />
          <div className="pt-2">
            <h4 className="text-xl font-medium text-[var(--color-fg-green)]">
              {props.title}
            </h4>
            <div className="pt-1">
              {props.updatedAt ? (
                <p className="text-[var(--color-fg-text)]">
                  <p>{formatTimeStampToMDY(props.updatedAt)}</p>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
