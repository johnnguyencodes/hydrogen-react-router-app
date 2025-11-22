import {getSeoMeta} from '@shopify/hydrogen';
import {type MetaFunction} from 'react-router';

export const plantBlogPostSeoData = {
  title: 'Plant Shelf Setup and Care',
  description: 'I explain my plant setup in detail',
  url: 'https://www.johnnguyen.codes/plants/blog/plant-shelf-setup-and-care',
  relativeUrlPath: '/plants/blog/plant-shelf-setup-and-care',
  pageType: 'plants',
  updatedAt: '2025-11-24T12:53:28-08:00',
  publishedAt: '2020-05-05T03:20:10-07:00',
  media: [
    {
      url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/750x600.jpg?v=1763844438',
      width: 750,
      height: 600,
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
