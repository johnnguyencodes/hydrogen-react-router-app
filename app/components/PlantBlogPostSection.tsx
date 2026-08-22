import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';
import {plantBlogPostSeo} from '~/lib/plantBlogPostSeo';
import {formatTimeStampToMDY} from '~/lib/plantPageUtils';
import {Badge} from '~/components/ui/badge';

function BlogPostTags({tags}: {tags?: string}) {
  if (!tags) return null;
  const parsed = tags
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag !== '');
  if (parsed.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5 pb-1">
      {parsed.map((tag) => (
        <Badge key={tag} variant="category">
          {tag}
        </Badge>
      ))}
    </div>
  );
}

export function BlogPostSection() {
  return (
    <div className="plant-blog-posts mb-10 2xl:mb-16">
      <div className="mb-5">
        <h2 className="text-3xl font-medium leading-tight text-[var(--color-fg-blue)]">
          Plant Knowledge Center
        </h2>
        <p className="text-[var(--color-fg-text)] text-lg py-1">
          Here's what I learned from taking care of my plants:
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5 items-start">
        {plantBlogPostSeo.map((blogPost, index) =>
          index === 0 ? (
            <div
              className="col-span-1 sm:sticky sm:top-20"
              key={blogPost.relativeUrlPath}
            >
              <div className="rounded-md bg-[var(--color-bg-2)] overflow-hidden flex-shrink-0 w-full p-2">
                <Link
                  className="featured-product group"
                  to={`${blogPost.relativeUrlPath}`}
                >
                  <div className="p-2">
                    <Image
                      data={blogPost.media[0]}
                      aspectRatio="1/1"
                      sizes="(min-width: 45em) 20vw, 50vw"
                      className="group-hover:brightness-90"
                    />
                    <div className="pt-2">
                      <BlogPostTags tags={blogPost.tags} />
                      <h4 className="text-xl font-medium text-[var(--color-fg-blue)]">
                        {blogPost.title}
                      </h4>
                      <div className="text-[var(--color-fg-text)] text-lg">
                        <p>{blogPost.description}</p>
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
                <div className="rounded-md bg-[var(--color-bg-2)] overflow-hidden flex-shrink-0 w-full mb-5 p-2">
                  <Link
                    className="featured-product group"
                    to={`${blogPost.relativeUrlPath}`}
                  >
                    <div className="flex">
                      <div className="p-2 w-[200px] shrink-0">
                        <Image
                          data={blogPost.media[0]}
                          aspectRatio="1/1"
                          width={200}
                          height={200}
                          className="group-hover:brightness-90"
                        />
                      </div>
                      <div className="min-w-0 flex-1 p-2">
                        <BlogPostTags tags={blogPost.tags} />
                        <h4 className="text-xl font-medium text-[var(--color-fg-blue)]">
                          {blogPost.title}
                        </h4>
                        <div className="text-[var(--color-fg-text)] text-lg">
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
