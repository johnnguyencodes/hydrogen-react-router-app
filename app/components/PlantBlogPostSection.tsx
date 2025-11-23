import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';
import {allBlogPostSeo} from '~/lib/plantBlogPostSeo';

export function PlantBlogPostSection() {
  return (
    <div className="plant-blog-posts">
      <h2>Plant Knowledge Center</h2>
      <p>Here's what I learned from taking care of my plants:</p>
      <div className="grid sm:grid-cols-2 gap-10">
        {allBlogPostSeo.map((blogPost, index) =>
          index === 0 ? (
            <div className="col-span-1" key={blogPost.relativeUrlPath}>
              <div className="rounded-md bg-[var(--color-bg-dim)] overflow-hidden flex-shrink-0 w-full">
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
                    <p>{blogPost.publishedAt}</p>
                  </div>
                </Link>
              </div>
            </div>
          ) : null,
        )}
        <div className="col-span-1">
          {allBlogPostSeo.map((blogPost, index) =>
            index > 0 ? (
              <div key={blogPost.relativeUrlPath}>
                <div className="rounded-md bg-[var(--color-bg-dim)] overflow-hidden flex-shrink-0 w-full h-40 mb-5">
                  <Link
                    className="featured-product"
                    to={`${blogPost.relativeUrlPath}`}
                  >
                    <div className="grid grid-cols-4">
                      <div className="p-2 col-span-1">
                        <Image
                          data={blogPost.media[0]}
                          aspectRatio="1/1"
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className="col-span-3">
                        <h4 className="text-md text-[var(--color-fg-green)]">
                          {blogPost.title}
                        </h4>
                        <p>{blogPost.description}</p>
                        <p>{blogPost.publishedAt}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
