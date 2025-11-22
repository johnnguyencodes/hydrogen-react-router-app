import {getSeoMeta} from '@shopify/hydrogen';
import {type MetaFunction} from 'react-router';

export const plantBlogPostSeoData = {
  title: 'Recommended Sellers',
  description: 'I review my favorite plant sellers',
  url: 'https://www.johnnguyen.codes/plants/blog/recommended-sellers',
  relativeUrlPath: '/plants/blog/recommended-sellers',
  media: [
    {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/466x466.png?v=1763330761',
      width: 466,
      height: 466,
      altText: 'This is the blog featured image',
    },
  ],
};

export function loader() {
  return {
    seo: plantBlogPostSeoData,
  };
}

export const meta: MetaFunction<typeof loader> = ({data, matches}) => {
  const rootSeo = (matches as any)[1].data?.seo;
  const pageSeo = data?.seo;

  return getSeoMeta(rootSeo, pageSeo);
};

export default function Blog() {
  return (
    <div className="projects-page xxs:mx-5 2xl:mx-0">
      <p>This is the Projects page</p>
      <p>
        Donec cursus ipsum quis felis imperdiet pretium. Maecenas ut mauris
        pellentesque, blandit nunc ut, facilisis enim. Fusce cursus rhoncus
        malesuada. In dolor erat, lobortis elementum maximus at, mattis in
        justo. Suspendisse ante sapien, venenatis eget nisl fermentum, aliquet
        luctus mauris. Donec eu nisl vitae est porttitor varius. Maecenas
        malesuada gravida ligula, eget fermentum leo condimentum ac. Nunc
        efficitur fermentum tellus, id rhoncus sem aliquet non. Sed sit amet
        tortor nulla. Nulla vitae odio luctus, maximus nunc at, varius mauris.
        Nam fermentum ligula ut risus accumsan, non fermentum mi accumsan.
        Curabitur ut velit tortor. Praesent eu risus elementum, egestas justo
        et, tempus sem. Suspendisse at nisl nec lectus pretium pharetra at
        semper mi. Quisque lacus felis, lobortis vel felis id, pharetra
        imperdiet leo. Mauris tempor euismod nulla vitae mollis.
      </p>
      <p>
        Donec cursus ipsum quis felis imperdiet pretium. Maecenas ut mauris
        pellentesque, blandit nunc ut, facilisis enim. Fusce cursus rhoncus
        malesuada. In dolor erat, lobortis elementum maximus at, mattis in
        justo. Suspendisse ante sapien, venenatis eget nisl fermentum, aliquet
        luctus mauris. Donec eu nisl vitae est porttitor varius. Maecenas
        malesuada gravida ligula, eget fermentum leo condimentum ac. Nunc
        efficitur fermentum tellus, id rhoncus sem aliquet non. Sed sit amet
        tortor nulla. Nulla vitae odio luctus, maximus nunc at, varius mauris.
        Nam fermentum ligula ut risus accumsan, non fermentum mi accumsan.
        Curabitur ut velit tortor. Praesent eu risus elementum, egestas justo
        et, tempus sem. Suspendisse at nisl nec lectus pretium pharetra at
        semper mi. Quisque lacus felis, lobortis vel felis id, pharetra
        imperdiet leo. Mauris tempor euismod nulla vitae mollis.
      </p>
      <p>
        Donec cursus ipsum quis felis imperdiet pretium. Maecenas ut mauris
        pellentesque, blandit nunc ut, facilisis enim. Fusce cursus rhoncus
        malesuada. In dolor erat, lobortis elementum maximus at, mattis in
        justo. Suspendisse ante sapien, venenatis eget nisl fermentum, aliquet
        luctus mauris. Donec eu nisl vitae est porttitor varius. Maecenas
        malesuada gravida ligula, eget fermentum leo condimentum ac. Nunc
        efficitur fermentum tellus, id rhoncus sem aliquet non. Sed sit amet
        tortor nulla. Nulla vitae odio luctus, maximus nunc at, varius mauris.
        Nam fermentum ligula ut risus accumsan, non fermentum mi accumsan.
        Curabitur ut velit tortor. Praesent eu risus elementum, egestas justo
        et, tempus sem. Suspendisse at nisl nec lectus pretium pharetra at
        semper mi. Quisque lacus felis, lobortis vel felis id, pharetra
        imperdiet leo. Mauris tempor euismod nulla vitae mollis.
      </p>
      <p>
        Donec cursus ipsum quis felis imperdiet pretium. Maecenas ut mauris
        pellentesque, blandit nunc ut, facilisis enim. Fusce cursus rhoncus
        malesuada. In dolor erat, lobortis elementum maximus at, mattis in
        justo. Suspendisse ante sapien, venenatis eget nisl fermentum, aliquet
        luctus mauris. Donec eu nisl vitae est porttitor varius. Maecenas
        malesuada gravida ligula, eget fermentum leo condimentum ac. Nunc
        efficitur fermentum tellus, id rhoncus sem aliquet non. Sed sit amet
        tortor nulla. Nulla vitae odio luctus, maximus nunc at, varius mauris.
        Nam fermentum ligula ut risus accumsan, non fermentum mi accumsan.
        Curabitur ut velit tortor. Praesent eu risus elementum, egestas justo
        et, tempus sem. Suspendisse at nisl nec lectus pretium pharetra at
        semper mi. Quisque lacus felis, lobortis vel felis id, pharetra
        imperdiet leo. Mauris tempor euismod nulla vitae mollis.
      </p>
      <p>
        Donec cursus ipsum quis felis imperdiet pretium. Maecenas ut mauris
        pellentesque, blandit nunc ut, facilisis enim. Fusce cursus rhoncus
        malesuada. In dolor erat, lobortis elementum maximus at, mattis in
        justo. Suspendisse ante sapien, venenatis eget nisl fermentum, aliquet
        luctus mauris. Donec eu nisl vitae est porttitor varius. Maecenas
        malesuada gravida ligula, eget fermentum leo condimentum ac. Nunc
        efficitur fermentum tellus, id rhoncus sem aliquet non. Sed sit amet
        tortor nulla. Nulla vitae odio luctus, maximus nunc at, varius mauris.
        Nam fermentum ligula ut risus accumsan, non fermentum mi accumsan.
        Curabitur ut velit tortor. Praesent eu risus elementum, egestas justo
        et, tempus sem. Suspendisse at nisl nec lectus pretium pharetra at
        semper mi. Quisque lacus felis, lobortis vel felis id, pharetra
        imperdiet leo. Mauris tempor euismod nulla vitae mollis.
      </p>
      <p>
        Donec cursus ipsum quis felis imperdiet pretium. Maecenas ut mauris
        pellentesque, blandit nunc ut, facilisis enim. Fusce cursus rhoncus
        malesuada. In dolor erat, lobortis elementum maximus at, mattis in
        justo. Suspendisse ante sapien, venenatis eget nisl fermentum, aliquet
        luctus mauris. Donec eu nisl vitae est porttitor varius. Maecenas
        malesuada gravida ligula, eget fermentum leo condimentum ac. Nunc
        efficitur fermentum tellus, id rhoncus sem aliquet non. Sed sit amet
        tortor nulla. Nulla vitae odio luctus, maximus nunc at, varius mauris.
        Nam fermentum ligula ut risus accumsan, non fermentum mi accumsan.
        Curabitur ut velit tortor. Praesent eu risus elementum, egestas justo
        et, tempus sem. Suspendisse at nisl nec lectus pretium pharetra at
        semper mi. Quisque lacus felis, lobortis vel felis id, pharetra
        imperdiet leo. Mauris tempor euismod nulla vitae mollis.
      </p>
      <p>
        Donec cursus ipsum quis felis imperdiet pretium. Maecenas ut mauris
        pellentesque, blandit nunc ut, facilisis enim. Fusce cursus rhoncus
        malesuada. In dolor erat, lobortis elementum maximus at, mattis in
        justo. Suspendisse ante sapien, venenatis eget nisl fermentum, aliquet
        luctus mauris. Donec eu nisl vitae est porttitor varius. Maecenas
        malesuada gravida ligula, eget fermentum leo condimentum ac. Nunc
        efficitur fermentum tellus, id rhoncus sem aliquet non. Sed sit amet
        tortor nulla. Nulla vitae odio luctus, maximus nunc at, varius mauris.
        Nam fermentum ligula ut risus accumsan, non fermentum mi accumsan.
        Curabitur ut velit tortor. Praesent eu risus elementum, egestas justo
        et, tempus sem. Suspendisse at nisl nec lectus pretium pharetra at
        semper mi. Quisque lacus felis, lobortis vel felis id, pharetra
        imperdiet leo. Mauris tempor euismod nulla vitae mollis.
      </p>
    </div>
  );
}
