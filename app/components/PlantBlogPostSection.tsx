import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';
import {plantBlogPostSeo} from '~/lib/plantBlogPostSeo';
import {formatTimeStampToMDY} from '~/lib/plantPageUtils';

export function BlogPostSection() {
  return (
    <div className="plant-blog-posts 2xl:mb-16">
      <div className="mb-5">
        <h2 className="text-3xl font-medium leading tight text-[var(--color-fg-green)]">
          Plant Knowledge Center
        </h2>
        <p className="text-[var(--color-fg-text)] py-1">
          Here's what I learned from taking care of my plants:
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {plantBlogPostSeo.map((blogPost, index) =>
          index === 0 ? (
            <div className="col-span-1" key={blogPost.relativeUrlPath}>
              <div className="rounded-md bg-[var(--color-bg-1)] overflow-hidden flex-shrink-0 w-full p-2">
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
                    <div className="pt-2">
                      <h4 className="text-2xl font-medium text-[var(--color-fg-green)]">
                        {blogPost.title}
                      </h4>
                      <div className="text-[var(--color-fg-text)] text-lg">
                        <p className="py-1">{blogPost.description}</p>
                        <p>{formatTimeStampToMDY(blogPost.publishedAt)}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ) : null,
        )}
        <div className="col-span-1">
          {plantBlogPostSeo.map((blogPost, index) =>
            index > 0 ? (
              <div key={blogPost.relativeUrlPath}>
                <div className="rounded-md bg-[var(--color-bg-2)] overflow-hidden flex-shrink-0 w-full h-46 mb-5 p-2">
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
                      <div className="col-span-3 p-2">
                        <h4 className="text-2xl font-medium text-[var(--color-fg-green)]">
                          {blogPost.title}
                        </h4>
                        <div className="text-[var(--color-fg-text)] text-lg">
                          <p className="py-1">{blogPost.description}</p>
                          <p>{formatTimeStampToMDY(blogPost.publishedAt)}</p>
                        </div>
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
