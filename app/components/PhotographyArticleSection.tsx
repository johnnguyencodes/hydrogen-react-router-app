import {Image} from '@shopify/hydrogen';
import {Link, useLocation} from 'react-router';

export function PhotographyArticleSection({
  photographyArticleSectionProps,
}: {
  photographyArticleSectionProps: PhotographyArticleSectionProps;
}) {
  const location = useLocation();
  return (
    <div className="article-posts my-5">
      <div className="mb-1">
        <h2 className="text-3xl font-medium leading-tight text-[var(--color-fg-green)]">
          {photographyArticleSectionProps.sectionTitle}
        </h2>
        <p className="text-[var(--color-fg-text)] py-1">
          {photographyArticleSectionProps.sectionDescription}
        </p>
      </div>
      <div
        className="w-full columns-1 md:columns-2 lg:columns-3 gap-16 [column-rule-width:1px] [column-rule-style:solid] [column-rule-color:color-mix(in_oklab,var(--color-fg-text)_20%,transparent)]"
      >
        {photographyArticleSectionProps.pageSeoDataArray.map(
          (post: PageSeoData) => {
            const dateObj = new Date(post.publishedAt);
            const formattedDate = dateObj.toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            const tags =
              location.pathname === '/photography/journal' && post.tags
                ? post.tags
                    .split(',')
                    .map((tag: string) => tag.trim())
                    .filter((tag: string) => tag !== '')
                : [];

            return post.status === 'active' ? (
              <Link
                to={post.relativeUrlPath}
                key={post.relativeUrlPath}
                className="block break-inside-avoid mb-6 pb-6 border-b border-[color-mix(in_oklab,var(--color-fg-text)_15%,transparent)] last:mb-0 last:border-b-0 last:pb-0"
              >
                <article className="flex flex-col">
                  <h3 className="text-xl font-semibold text-[var(--color-fg-green)]">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-xs tracking-wide uppercase text-[color-mix(in_oklab,var(--color-fg-text)_70%,transparent)]">
                    {formattedDate}
                    {tags.length > 0
                      ? ' ' +
                        tags.map((tag) => `#${tag.toUpperCase()}`).join(' ')
                      : null}
                  </p>
                  <div className="w-full mt-3">
                    <Image
                      data={post.media[0]}
                      aspectRatio={`${post.media[0].width.toString()}/${post.media[0].height.toString()}`}
                      sizes="(min-width: 45em) 20vw, 50vw"
                      className="block w-full h-auto object-contain"
                    />
                  </div>
                  <p className="mt-3 text-[var(--color-fg-text)]">
                    {post.description}
                  </p>
                </article>
              </Link>
            ) : null;
          },
        )}
      </div>
    </div>
  );
}
