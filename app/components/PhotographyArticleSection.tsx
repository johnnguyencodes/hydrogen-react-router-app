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
      <div className="sm:columns-1 md:columns-2 lg:columns-3 gap-5">
        {photographyArticleSectionProps.pageSeoDataArray.map(
          (article, index) => (
            <div className="col-span-1 mb-3" key={article.relativeUrlPath}>
              <div className="rounded-md bg-[var(--color-bg-1)] overflow-hidden flex-shrink-0 w-full p-2">
                <Link
                  className="featured-product"
                  to={`${article.relativeUrlPath}`}
                >
                  <div className="p-2">
                    <Image
                      data={article.media[0]}
                      aspectRatio="1/1"
                      sizes="(min-width: 45em) 20vw, 50vw"
                    />
                    <div className="pt-2">
                      <h4 className="text-2xl font-medium text-[var(--color-fg-green)]">
                        {article.title}
                      </h4>
                      <div className="text-[var(--color-fg-text)] text-lg">
                        <p className="py-1">{article.description}</p>
                        <p>{formatTimeStampToMDY(article.publishedAt)}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
