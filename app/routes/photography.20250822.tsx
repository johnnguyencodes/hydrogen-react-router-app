import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import PhotographyPage from '~/components/PhotographyPage';
import {journal20250822 as seoData} from '~/lib/photographyJournalSeoData';
import {
  createPhotographyPageMeta,
  loadPhotographyJournalData,
} from '~/lib/photographyPageUtils';
import {
  masonryImagesGroup0,
  masonryImagesGroup1,
  masonryImagesGroup15,
  masonryImagesGroup2,
  masonryImagesGroup3,
  masonryImagesGroup4,
  masonryImagesGroup5,
  masonryImagesGroup6,
  masonryImagesGroup7,
  masonryImagesGroup8,
  masonryImagesGroup9,
  masonryImagesGroup10,
  masonryImagesGroup11,
  thumbnails,
} from '~/assets/imageData20250822';
import MasonryGallery from '~/components/MasonryGallery';
import {SunIcon} from 'lucide-react';

export async function loader(args: LoaderFunctionArgs) {
  return loadPhotographyJournalData(seoData);
}

export const meta: MetaFunction<typeof loader> = ({data, matches}) => {
  return createPhotographyPageMeta(matches, data);
};

function PhotographyHero(): React.JSX.Element {
  return (
    <div>
      <div className="px-6 py-32 lg:px-8">
        <MasonryGallery images={masonryImagesGroup0} />
        <div className="mx-auto max-w-3xl text-base/7 text-[var(--color-fg-text)]">
          <p className="text-base/7 font-semibold text-[var(--color-fg-orange)]">
            Introducing
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[var(--color-fg-green)] sm:text-5xl ">
            JavaScript for beginners
          </h1>
          <p className="mt-6 text-xl/8">
            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At
            arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae
            feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget.
            Eleifend egestas fringilla sapien.
          </p>
          <div className="mt-10 max-w-2xl text-[var(--color-fg-text)]">
            <p>
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
              enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
              praesent donec est. Odio penatibus risus viverra tellus varius sit
              neque erat velit. Faucibus commodo massa rhoncus, volutpat.
              Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
              sed turpis id.
            </p>
          </div>
          <div className="mt-10 max-w-2xl text-[var(--color-fg-text)]">
            <ul
              role="list"
              className="mt-8 max-w-xl space-y-8 text-[var(--color-fg-text)]"
            >
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Data types.
                  </strong>{' '}
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </span>
              </li>
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Loops.
                  </strong>{' '}
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo.
                </span>
              </li>
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Events.
                  </strong>{' '}
                  Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
                  Et magna sit morbi lobortis.
                </span>
              </li>
            </ul>
            <p className="mt-8">
              Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis
              odio id et. Id blandit molestie auctor fermentum dignissim. Lacus
              diam tincidunt ac cursus in vel. Mauris varius vulputate et
              ultrices hac adipiscing egestas. Iaculis convallis ac tempor et
              ut. Ac lorem vel integer orci.
            </p>
          </div>
        </div>
        <MasonryGallery images={masonryImagesGroup1} />
        <div className="mx-auto max-w-3xl text-base/7 text-[var(--color-fg-text)]">
          <div>
            <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-[var(--color-fg-green)]">
              From beginner to expert in 3 hours
            </h2>
            <p className="mt-6">
              Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam
              consequat in. Convallis arcu ipsum urna nibh. Pharetra, euismod
              vitae interdum mauris enim, consequat vulputate nibh. Maecenas
              pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim
              cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis
              ipsum eu a sed convallis diam.
            </p>
            <figure className="mt-10 border-l border-[var(--color-fg-orange)] pl-9">
              <blockquote className="font-semibold text-[var(--color-fg-statusline-3)]">
                <p>
                  "Vel ultricies morbi odio facilisi ultrices accumsan donec
                  lacus purus. Lectus nibh ullamcorper ac dictum justo in
                  euismod. Risus aenean ut elit massa. In amet aliquet eget
                  cras. Sem volutpat enim tristique."
                </p>
              </blockquote>
            </figure>
            <p className="mt-10">
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
              enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
              praesent donec est. Odio penatibus risus viverra tellus varius sit
              neque erat velit.
            </p>
          </div>
        </div>
        <MasonryGallery images={masonryImagesGroup15} />
        <div className="mx-auto max-w-3xl text-base/7 text-[var(--color-fg-text)]">
          <p className="text-base/7 font-semibold text-[var(--color-fg-orange)]">
            Introducing
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[var(--color-fg-green)] sm:text-5xl ">
            JavaScript for beginners
          </h1>
          <p className="mt-6 text-xl/8">
            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At
            arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae
            feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget.
            Eleifend egestas fringilla sapien.
          </p>
          <div className="mt-10 max-w-2xl text-[var(--color-fg-text)]">
            <p>
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
              enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
              praesent donec est. Odio penatibus risus viverra tellus varius sit
              neque erat velit. Faucibus commodo massa rhoncus, volutpat.
              Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
              sed turpis id.
            </p>
          </div>
          <div className="mt-10 max-w-2xl text-[var(--color-fg-text)]">
            <ul
              role="list"
              className="mt-8 max-w-xl space-y-8 text-[var(--color-fg-text)]"
            >
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Data types.
                  </strong>{' '}
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </span>
              </li>
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Loops.
                  </strong>{' '}
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo.
                </span>
              </li>
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Events.
                  </strong>{' '}
                  Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
                  Et magna sit morbi lobortis.
                </span>
              </li>
            </ul>
            <p className="mt-8">
              Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis
              odio id et. Id blandit molestie auctor fermentum dignissim. Lacus
              diam tincidunt ac cursus in vel. Mauris varius vulputate et
              ultrices hac adipiscing egestas. Iaculis convallis ac tempor et
              ut. Ac lorem vel integer orci.
            </p>
          </div>
        </div>
        <MasonryGallery images={masonryImagesGroup2} />
        <div className="mx-auto max-w-3xl text-base/7 text-[var(--color-fg-text)]">
          <div>
            <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-[var(--color-fg-green)]">
              From beginner to expert in 3 hours
            </h2>
            <p className="mt-6">
              Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam
              consequat in. Convallis arcu ipsum urna nibh. Pharetra, euismod
              vitae interdum mauris enim, consequat vulputate nibh. Maecenas
              pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim
              cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis
              ipsum eu a sed convallis diam.
            </p>
            <figure className="mt-10 border-l border-[var(--color-fg-orange)] pl-9">
              <blockquote className="font-semibold text-[var(--color-fg-statusline-3)]">
                <p>
                  "Vel ultricies morbi odio facilisi ultrices accumsan donec
                  lacus purus. Lectus nibh ullamcorper ac dictum justo in
                  euismod. Risus aenean ut elit massa. In amet aliquet eget
                  cras. Sem volutpat enim tristique."
                </p>
              </blockquote>
            </figure>
            <p className="mt-10">
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
              enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
              praesent donec est. Odio penatibus risus viverra tellus varius sit
              neque erat velit.
            </p>
          </div>
        </div>
        <MasonryGallery images={masonryImagesGroup3} />
        <div className="mx-auto max-w-3xl text-base/7 text-[var(--color-fg-text)]">
          <p className="text-base/7 font-semibold text-[var(--color-fg-orange)]">
            Introducing
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[var(--color-fg-green)] sm:text-5xl ">
            JavaScript for beginners
          </h1>
          <p className="mt-6 text-xl/8">
            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At
            arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae
            feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget.
            Eleifend egestas fringilla sapien.
          </p>
          <div className="mt-10 max-w-2xl text-[var(--color-fg-text)]">
            <p>
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
              enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
              praesent donec est. Odio penatibus risus viverra tellus varius sit
              neque erat velit. Faucibus commodo massa rhoncus, volutpat.
              Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
              sed turpis id.
            </p>
          </div>
          <div className="mt-10 max-w-2xl text-[var(--color-fg-text)]">
            <ul
              role="list"
              className="mt-8 max-w-xl space-y-8 text-[var(--color-fg-text)]"
            >
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Data types.
                  </strong>{' '}
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </span>
              </li>
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Loops.
                  </strong>{' '}
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo.
                </span>
              </li>
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Events.
                  </strong>{' '}
                  Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
                  Et magna sit morbi lobortis.
                </span>
              </li>
            </ul>
            <p className="mt-8">
              Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis
              odio id et. Id blandit molestie auctor fermentum dignissim. Lacus
              diam tincidunt ac cursus in vel. Mauris varius vulputate et
              ultrices hac adipiscing egestas. Iaculis convallis ac tempor et
              ut. Ac lorem vel integer orci.
            </p>
          </div>
        </div>
        <MasonryGallery images={masonryImagesGroup4} />
        <div className="mx-auto max-w-3xl text-base/7 text-[var(--color-fg-text)]">
          <div>
            <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-[var(--color-fg-green)]">
              From beginner to expert in 3 hours
            </h2>
            <p className="mt-6">
              Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam
              consequat in. Convallis arcu ipsum urna nibh. Pharetra, euismod
              vitae interdum mauris enim, consequat vulputate nibh. Maecenas
              pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim
              cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis
              ipsum eu a sed convallis diam.
            </p>
            <figure className="mt-10 border-l border-[var(--color-fg-orange)] pl-9">
              <blockquote className="font-semibold text-[var(--color-fg-statusline-3)]">
                <p>
                  "Vel ultricies morbi odio facilisi ultrices accumsan donec
                  lacus purus. Lectus nibh ullamcorper ac dictum justo in
                  euismod. Risus aenean ut elit massa. In amet aliquet eget
                  cras. Sem volutpat enim tristique."
                </p>
              </blockquote>
            </figure>
            <p className="mt-10">
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
              enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
              praesent donec est. Odio penatibus risus viverra tellus varius sit
              neque erat velit.
            </p>
          </div>
        </div>
        <MasonryGallery images={masonryImagesGroup5} />
        <div className="mx-auto max-w-3xl text-base/7 text-[var(--color-fg-text)]">
          <p className="text-base/7 font-semibold text-[var(--color-fg-orange)]">
            Introducing
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[var(--color-fg-green)] sm:text-5xl ">
            JavaScript for beginners
          </h1>
          <p className="mt-6 text-xl/8">
            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At
            arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae
            feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget.
            Eleifend egestas fringilla sapien.
          </p>
          <div className="mt-10 max-w-2xl text-[var(--color-fg-text)]">
            <p>
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
              enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
              praesent donec est. Odio penatibus risus viverra tellus varius sit
              neque erat velit. Faucibus commodo massa rhoncus, volutpat.
              Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
              sed turpis id.
            </p>
          </div>
          <div className="mt-10 max-w-2xl text-[var(--color-fg-text)]">
            <ul
              role="list"
              className="mt-8 max-w-xl space-y-8 text-[var(--color-fg-text)]"
            >
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Data types.
                  </strong>{' '}
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </span>
              </li>
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Loops.
                  </strong>{' '}
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo.
                </span>
              </li>
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Events.
                  </strong>{' '}
                  Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
                  Et magna sit morbi lobortis.
                </span>
              </li>
            </ul>
            <p className="mt-8">
              Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis
              odio id et. Id blandit molestie auctor fermentum dignissim. Lacus
              diam tincidunt ac cursus in vel. Mauris varius vulputate et
              ultrices hac adipiscing egestas. Iaculis convallis ac tempor et
              ut. Ac lorem vel integer orci.
            </p>
          </div>
        </div>
        <MasonryGallery images={masonryImagesGroup6} />
        <div className="mx-auto max-w-3xl text-base/7 text-[var(--color-fg-text)]">
          <div>
            <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-[var(--color-fg-green)]">
              From beginner to expert in 3 hours
            </h2>
            <p className="mt-6">
              Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam
              consequat in. Convallis arcu ipsum urna nibh. Pharetra, euismod
              vitae interdum mauris enim, consequat vulputate nibh. Maecenas
              pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim
              cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis
              ipsum eu a sed convallis diam.
            </p>
            <figure className="mt-10 border-l border-[var(--color-fg-orange)] pl-9">
              <blockquote className="font-semibold text-[var(--color-fg-statusline-3)]">
                <p>
                  "Vel ultricies morbi odio facilisi ultrices accumsan donec
                  lacus purus. Lectus nibh ullamcorper ac dictum justo in
                  euismod. Risus aenean ut elit massa. In amet aliquet eget
                  cras. Sem volutpat enim tristique."
                </p>
              </blockquote>
            </figure>
            <p className="mt-10">
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
              enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
              praesent donec est. Odio penatibus risus viverra tellus varius sit
              neque erat velit.
            </p>
          </div>
        </div>
        <MasonryGallery images={masonryImagesGroup7} />
        <div className="mx-auto max-w-3xl text-base/7 text-[var(--color-fg-text)]">
          <p className="text-base/7 font-semibold text-[var(--color-fg-orange)]">
            Introducing
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[var(--color-fg-green)] sm:text-5xl ">
            JavaScript for beginners
          </h1>
          <p className="mt-6 text-xl/8">
            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At
            arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae
            feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget.
            Eleifend egestas fringilla sapien.
          </p>
          <div className="mt-10 max-w-2xl text-[var(--color-fg-text)]">
            <p>
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
              enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
              praesent donec est. Odio penatibus risus viverra tellus varius sit
              neque erat velit. Faucibus commodo massa rhoncus, volutpat.
              Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
              sed turpis id.
            </p>
          </div>
          <div className="mt-10 max-w-2xl text-[var(--color-fg-text)]">
            <ul
              role="list"
              className="mt-8 max-w-xl space-y-8 text-[var(--color-fg-text)]"
            >
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Data types.
                  </strong>{' '}
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </span>
              </li>
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Loops.
                  </strong>{' '}
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo.
                </span>
              </li>
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Events.
                  </strong>{' '}
                  Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
                  Et magna sit morbi lobortis.
                </span>
              </li>
            </ul>
            <p className="mt-8">
              Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis
              odio id et. Id blandit molestie auctor fermentum dignissim. Lacus
              diam tincidunt ac cursus in vel. Mauris varius vulputate et
              ultrices hac adipiscing egestas. Iaculis convallis ac tempor et
              ut. Ac lorem vel integer orci.
            </p>
          </div>
        </div>
        <MasonryGallery images={masonryImagesGroup8} />
        <div className="mx-auto max-w-3xl text-base/7 text-[var(--color-fg-text)]">
          <div>
            <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-[var(--color-fg-green)]">
              From beginner to expert in 3 hours
            </h2>
            <p className="mt-6">
              Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam
              consequat in. Convallis arcu ipsum urna nibh. Pharetra, euismod
              vitae interdum mauris enim, consequat vulputate nibh. Maecenas
              pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim
              cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis
              ipsum eu a sed convallis diam.
            </p>
            <figure className="mt-10 border-l border-[var(--color-fg-orange)] pl-9">
              <blockquote className="font-semibold text-[var(--color-fg-statusline-3)]">
                <p>
                  "Vel ultricies morbi odio facilisi ultrices accumsan donec
                  lacus purus. Lectus nibh ullamcorper ac dictum justo in
                  euismod. Risus aenean ut elit massa. In amet aliquet eget
                  cras. Sem volutpat enim tristique."
                </p>
              </blockquote>
            </figure>
            <p className="mt-10">
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
              enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
              praesent donec est. Odio penatibus risus viverra tellus varius sit
              neque erat velit.
            </p>
          </div>
        </div>
        <MasonryGallery images={masonryImagesGroup9} />
        <div className="mx-auto max-w-3xl text-base/7 text-[var(--color-fg-text)]">
          <p className="text-base/7 font-semibold text-[var(--color-fg-orange)]">
            Introducing
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[var(--color-fg-green)] sm:text-5xl ">
            JavaScript for beginners
          </h1>
          <p className="mt-6 text-xl/8">
            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At
            arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae
            feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget.
            Eleifend egestas fringilla sapien.
          </p>
          <div className="mt-10 max-w-2xl text-[var(--color-fg-text)]">
            <p>
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
              enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
              praesent donec est. Odio penatibus risus viverra tellus varius sit
              neque erat velit. Faucibus commodo massa rhoncus, volutpat.
              Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
              sed turpis id.
            </p>
          </div>
          <div className="mt-10 max-w-2xl text-[var(--color-fg-text)]">
            <ul
              role="list"
              className="mt-8 max-w-xl space-y-8 text-[var(--color-fg-text)]"
            >
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Data types.
                  </strong>{' '}
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </span>
              </li>
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Loops.
                  </strong>{' '}
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo.
                </span>
              </li>
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Events.
                  </strong>{' '}
                  Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
                  Et magna sit morbi lobortis.
                </span>
              </li>
            </ul>
            <p className="mt-8">
              Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis
              odio id et. Id blandit molestie auctor fermentum dignissim. Lacus
              diam tincidunt ac cursus in vel. Mauris varius vulputate et
              ultrices hac adipiscing egestas. Iaculis convallis ac tempor et
              ut. Ac lorem vel integer orci.
            </p>
          </div>
        </div>
        <MasonryGallery images={masonryImagesGroup10} />
        <div className="mx-auto max-w-3xl text-base/7 text-[var(--color-fg-text)]">
          <p className="text-base/7 font-semibold text-[var(--color-fg-orange)]">
            Introducing
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[var(--color-fg-green)] sm:text-5xl ">
            JavaScript for beginners
          </h1>
          <p className="mt-6 text-xl/8">
            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At
            arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae
            feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget.
            Eleifend egestas fringilla sapien.
          </p>
          <div className="mt-10 max-w-2xl text-[var(--color-fg-text)]">
            <p>
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
              enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
              praesent donec est. Odio penatibus risus viverra tellus varius sit
              neque erat velit. Faucibus commodo massa rhoncus, volutpat.
              Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
              sed turpis id.
            </p>
          </div>
          <div className="mt-10 max-w-2xl text-[var(--color-fg-text)]">
            <ul
              role="list"
              className="mt-8 max-w-xl space-y-8 text-[var(--color-fg-text)]"
            >
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Data types.
                  </strong>{' '}
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </span>
              </li>
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Loops.
                  </strong>{' '}
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo.
                </span>
              </li>
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Events.
                  </strong>{' '}
                  Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
                  Et magna sit morbi lobortis.
                </span>
              </li>
            </ul>
            <p className="mt-8">
              Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis
              odio id et. Id blandit molestie auctor fermentum dignissim. Lacus
              diam tincidunt ac cursus in vel. Mauris varius vulputate et
              ultrices hac adipiscing egestas. Iaculis convallis ac tempor et
              ut. Ac lorem vel integer orci.
            </p>
          </div>
        </div>
        <MasonryGallery images={masonryImagesGroup11} />
        <div className="mx-auto max-w-3xl text-base/7 text-[var(--color-fg-text)]">
          <p className="text-base/7 font-semibold text-[var(--color-fg-orange)]">
            Introducing
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[var(--color-fg-green)] sm:text-5xl ">
            JavaScript for beginners
          </h1>
          <p className="mt-6 text-xl/8">
            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At
            arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae
            feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget.
            Eleifend egestas fringilla sapien.
          </p>
          <div className="mt-10 max-w-2xl text-[var(--color-fg-text)]">
            <p>
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
              enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
              praesent donec est. Odio penatibus risus viverra tellus varius sit
              neque erat velit. Faucibus commodo massa rhoncus, volutpat.
              Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
              sed turpis id.
            </p>
          </div>
          <div className="mt-10 max-w-2xl text-[var(--color-fg-text)]">
            <ul
              role="list"
              className="mt-8 max-w-xl space-y-8 text-[var(--color-fg-text)]"
            >
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Data types.
                  </strong>{' '}
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </span>
              </li>
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Loops.
                  </strong>{' '}
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo.
                </span>
              </li>
              <li className="flex gap-x-3">
                <SunIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-[var(--color-fg-orange)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--color-fg-green)]">
                    Events.
                  </strong>{' '}
                  Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
                  Et magna sit morbi lobortis.
                </span>
              </li>
            </ul>
            <p className="mt-8">
              Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis
              odio id et. Id blandit molestie auctor fermentum dignissim. Lacus
              diam tincidunt ac cursus in vel. Mauris varius vulputate et
              ultrices hac adipiscing egestas. Iaculis convallis ac tempor et
              ut. Ac lorem vel integer orci.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Route() {
  return <PhotographyPage images={thumbnails} HeroContent={PhotographyHero} />;
}
