import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';

export function PlantCard(props: PlantCardProps) {
  function formatIsoToMDY(iso: string): string {
    const d = new Date(iso);
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    const yyyy = d.getUTCFullYear();
    return `${mm}-${dd}-${yyyy}`;
  }

  return (
    <div className="rounded-md bg-[var(--color-bg-dim)] overflow-hidden flex-shrink-0 w-64">
      <Link className="favorite-product" to={`/plants/${props.handle}`}>
        <div className="p-2">
          <Image
            data={props.images.nodes[0]}
            aspectRatio="1/1"
            sizes="(min-width: 45em) 20vw, 50vw"
          />
          <h4 className="text-md text-[var(--color-fg-green)]">
            {props.title}
          </h4>
          {props.updatedAt ? (
            <p>Last updated: {formatIsoToMDY(props.updatedAt)}</p>
          ) : null}
        </div>
      </Link>
    </div>
  );
}
