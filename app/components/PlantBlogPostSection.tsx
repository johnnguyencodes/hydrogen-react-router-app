import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';
import {allBlogPostSeo} from '~/lib/plantBlogPostSeo';

export function PlantBlogPostSection() {
  return (
    <div className="plant-blog-posts">
      <h2>Plant Knowledge Center</h2>
      <p>Here's what I learned from taking care of my plants:</p>

      {allBlogPostSeo.map((blogPost, index) => (
        <div key={blogPost.relativeUrlPath}>
          <div className="rounded-md bg-[var(--color-bg-dim)] overflow-hidden flex-shrink-0 w-64">
            <Link
              className="featured-product"
              to={`${blogPost.relativeUrlPath}`}
            >
              <div className="p-2">
                <Image
                  data={blogPost.media[0]}
                  aspectRatio="1/1"
                  sizes="(min-width: 45em) 20vw, 50vw"
                />
                <h4 className="text-md text-[var(--color-fg-green)]">
                  {blogPost.title}
                </h4>
                <p>{blogPost.description}</p>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
