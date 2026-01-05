import {AnimatePresence, motion} from 'motion/react';
import {useState, useEffect} from 'react';
import {Button, ButtonGroup} from 'flowbite-react';
import MasonryGallery from '~/components/MasonryGallery';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import type {Route} from './+types/about';

export default function About() {
  const [isVisible, setIsVisible] = useState(true);

  // Framer motion variables
  const container: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: 100,
    height: 160,
    position: 'relative',
  };

  const box: React.CSSProperties = {
    width: 100,
    height: 100,
    backgroundColor: '#0cdcf7',
    borderRadius: '10px',
  };

  const button: React.CSSProperties = {
    backgroundColor: '#0cdcf7',
    borderRadius: '10px',
    padding: '10px 20px',
    color: '#0f1115',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  };

  // Masonry gallery
  const images: PhotographyMasonryGalleryImage[] = [
    {
      alt: 'image 1',
      className: 'row-span-7 col-span-5',
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-09-10--073--half-frame--pentax-17--pentax-25mm-f35-hd-hf--fujifilm--400--unknown--unknown.jpg?v=1766773186',
        width: 2048,
        height: 1365,
      },
      meta: {
        fileType: 'photography',
        date: '2025-09-10',
        index: '073',
        filmFormat: 'half-frame',
        cameraBody: 'pentax-17',
        lens: 'pentax-25mm-f35-hd-hf',
        filmStockBrand: 'fujifilm',
        isoNumber: '400',
        aperture: 'unknown',
        shutterspeed: 'unknown',
      },
    },
    {
      alt: 'image 2',
      className: 'row-span-20 col-span-7',
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-09-10--072--half-frame--pentax-17--pentax-25mm-f35-hd-hf--fujifilm--400--unknown--unknown.jpg?v=1766773186',
        width: 1365,
        height: 2048,
      },
      meta: {
        fileType: 'photography',
        date: '2025-09-10',
        index: '072',
        filmFormat: 'half-frame',
        cameraBody: 'pentax-17',
        lens: 'pentax-25mm-f35-hd-hf',
        filmStockBrand: 'fujifilm',
        isoNumber: '400',
        aperture: 'unknown',
        shutterspeed: 'unknown',
      },
    },
    {
      alt: 'image 3',
      className: 'row-span-7 col-span-5',
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-09-10--071--half-frame--pentax-17--pentax-25mm-f35-hd-hf--fujifilm--400--unknown--unknown.jpg?v=1766773186',
        width: 1365,
        height: 2048,
      },
      meta: {
        fileType: 'photography',
        date: '2025-09-10',
        index: '071',
        filmFormat: 'half-frame',
        cameraBody: 'pentax-17',
        lens: 'pentax-25mm-f35-hd-hf',
        filmStockBrand: 'fujifilm',
        isoNumber: '400',
        aperture: 'unknown',
        shutterspeed: 'unknown',
      },
    },
    {
      alt: '',
      className: 'row-span-12 col-span-5',
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-09-10--070--half-frame--pentax-17--pentax-25mm-f35-hd-hf--fujifilm--400--unknown--unknown.jpg?v=1766773186',
        width: 1365,
        height: 2048,
      },
      meta: {
        fileType: 'photography',
        date: '2025-09-10',
        index: '070',
        filmFormat: 'half-frame',
        cameraBody: 'pentax-17',
        lens: 'pentax-25mm-f35-hd-hf',
        filmStockBrand: 'fujifilm',
        isoNumber: '400',
        aperture: 'unknown',
        shutterspeed: 'unknown',
      },
    },
    {
      alt: '',
      className: 'row-span-6 col-span-7',
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0934/9293/6987/files/photography--2025-09-10--068--half-frame--pentax-17--pentax-25mm-f35-hd-hf--fujifilm--400--unknown--unknown.jpg?v=1766773187',
        width: 1365,
        height: 2048,
      },
      meta: {
        fileType: 'photography',
        date: '2025-09-10',
        index: '068',
        filmFormat: 'half-frame',
        cameraBody: 'pentax-17',
        lens: 'pentax-25mm-f35-hd-hf',
        filmStockBrand: 'fujifilm',
        isoNumber: '400',
        aperture: 'unknown',
        shutterspeed: 'unknown',
      },
    },
  ];

  return (
    <div className="about-page xxs:mx-5 2xl:mx-0">
      <p>This is the about page</p>
      <p>This is the flowbite button</p>
      <Button> Hello </Button>
      <MasonryGallery images={images} />
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

      <div style={container}>
        <p>This is framer motion</p>
        <AnimatePresence initial={false}>
          {isVisible ? (
            <motion.div
              initial={{opacity: 0, scale: 0}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0}}
              style={box}
              key="box"
            />
          ) : null}
        </AnimatePresence>
        <motion.button
          style={button}
          onClick={() => setIsVisible(!isVisible)}
          whileTap={{y: 1}}
        >
          {isVisible ? 'Hide' : 'Show'}
        </motion.button>
      </div>
    </div>
  );
}
