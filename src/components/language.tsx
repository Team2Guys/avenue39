import localFont from 'next/font/local';
export const Helvetica = localFont({
  src: [
    {
      path: '../../public/font/HelveticaNeueRoman.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-helvetica',
  display: 'swap', 
});

export const Helveticalight = localFont({
  src: [
    {
      path: '../../public/font/HelveticaNeueRegular.ttf',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--font-helvetica-light',
  display: 'swap', 
});
export const belgium = localFont({
  src: [
    {
      path: '../../public/font/belgium/Fonts/Belgium.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-belgium',
  display: 'swap', 
});


export const jadyn = localFont({
  src: [
    {
      path: '../../public/font/jadyn/Jadyn Maria.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-jadyn',
  display: 'swap', 
});
