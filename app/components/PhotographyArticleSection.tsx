import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';
import {formatTimeStampToMDY} from '~/lib/plantPageUtils';

export function PhotographyArticleSection({
  photographyArticleSectionProps,
}: {
  photographyArticleSectionProps: PhotographyArticleSectionProps;
}) {
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
      <div className="mx-auto mt-16 max-w-2xl auto-rows-fr sm:mt-20 lg:mx-0 lg:max-w-none columns-1 md:columns-2 lg:columns-3 gap-3">
        {photographyArticleSectionProps.pageSeoDataArray.map((post) =>
          post.status === 'active' ? (
            <Link to={post.relativeUrlPath} key={post.relativeUrlPath}>
              <article className="relative flex flex-col overflow-hidden rounded-md bg-[var(--color-bg-4)] mb-3">
                {/* 1. Image Container - defines the width and starts the stack */}
                <div className="w-full">
                  <Image
                    data={post.media[0]}
                    aspectRatio={`${post.media[0].width.toString()}/${post.media[0].height.toString()}`}
                    sizes="(min-width: 45em) 20vw, 50vw"
                    className="block w-full h-auto object-contain"
                  />
                </div>

                {/* 2. Text Content - now sits naturally below the image */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-400">
                    <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                  </div>

                  <h3 className="mt-2 text-lg/6 font-semibold text-white">
                    {/* Note: Removed 'absolute inset-0' span to keep link focused on title */}
                    {post.title}
                  </h3>

                  <p className="mt-1 line-clamp-3 text-sm/6 text-gray-500 dark:text-gray-400">
                    {post.description}
                  </p>
                </div>
              </article>
            </Link>
          ) : null,
        )}
      </div>
    </div>
  );
}
