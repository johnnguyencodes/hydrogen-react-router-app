import {Image} from '@shopify/hydrogen';
import {Link, useLocation} from 'react-router';

export function PhotographyArticleSection({
  photographyArticleSectionProps,
}: {
  photographyArticleSectionProps: PhotographyArticleSectionProps;
}) {
  const location = useLocation();
  return (
    <div className="article-posts 2xl:mb-16">
      <div className="mb-5">
        <h2 className="text-3xl font-medium leading tight text-[var(--color-fg-green)]">
          {photographyArticleSectionProps.sectionTitle}
        </h2>
        <p className="text-[var(--color-fg-text)] py-1">
          {photographyArticleSectionProps.sectionDescription}
        </p>
      </div>
      <div className="w-full mt-16 auto-rows-fr sm:mt-20 columns-1 md:columns-2 lg:columns-3 gap-3">
        {photographyArticleSectionProps.pageSeoDataArray.map(
          (post: PageSeoData) => {
            const dateObj = new Date(post.publishedAt);
            const formattedDate = dateObj.toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            return post.status === 'active' ? (
              <Link to={post.relativeUrlPath} key={post.relativeUrlPath}>
                <article className="relative flex flex-col overflow-hidden rounded-md bg-[var(--color-bg-3)] mb-3">
                  <div className="px-4 py-2 flex flex-col flex-1">
                    <h3 className="mt-2 text-lg/6 font-semibold text-[var(--color-fg-green)]">
                      {post.title}
                    </h3>
                    <div className="flex flex-wrap mt-2 overflow-hidden text-sm text-[var(--color-fg-text)] items-center">
                      <p>
                        {formattedDate}
                        {location.pathname === '/photography/journal' &&
                          post.tags &&
                          post.tags
                            .split(',')
                            .map((tag: string) => tag.trim())
                            .filter((tag: string) => tag !== '')
                            .map((tag: string) => (
                              <span
                                key={tag}
                                className="mx-1 text-[var(--color-fg-status-line-2)] bg-[var(--color-bg-5)] rounded-md px-1.5 text-sm border-[1.5px] border-[var(--color-fg-statusline-2)]"
                              >
                                {tag}
                              </span>
                            ))}
                      </p>
                    </div>
                  </div>
                  <div className="w-full">
                    <Image
                      data={post.media[0]}
                      aspectRatio={`${post.media[0].width.toString()}/${post.media[0].height.toString()}`}
                      sizes="(min-width: 45em) 20vw, 50vw"
                      className="block w-full h-auto object-contain"
                    />
                  </div>
                  <div className="px-4 py-2 flex flex-col flex-1">
                    <p className="mt-1 line-clamp-3 text-sm/6 text-[var(--color-fg-text)]">
                      {post.description}
                    </p>
                  </div>
                </article>
              </Link>
            ) : null;
          },
        )}
      </div>
    </div>
  );
}
