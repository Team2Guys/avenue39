import { IHomeProducts } from '@/types/interfaces';


export const paymentIcons = [
  { src: '/images/paymentIcons/Mastercard-Logo.webp', alt: 'Mastercard' },
  { src: '/images/paymentIcons/visacard-logo.webp', alt: 'visacard' },
  { src: '/images/paymentIcons/apply-pay-black.webp', alt: 'applypay' },
  { src: '/images/paymentIcons/googlepay-logo.webp', alt: 'googlepay' },
];


export const bannerData = {
  imageUrl: '/images/catalogue/sofa.webp',
  title: 'CATALOGUE',
  buttonText: 'DOWNLOAD ',
  fileUrl:
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
};
export const ColorBannerData = [
  {
    imageUrl: '/images/ave1.webp',
    imageUrl2: '/images/ave2.webp',
    Heading: 'luxury furniture',
    Description:"We're home to beautiful chairs that tick off all the styles, from Industrial to Minimalist, Scandi to Mid-century. You can pick the silhouette and colour that works for you.",
    link: "/dining"  
  
  },
  {
    imageUrl: '/images/catalogue/design_chair1.webp',
    imageUrl2: '/images/catalogue/design_chair12.png',
    Heading: 'dining furniture',
    Description:
      "Choosing Avenue39 means choosing a legacy of quality, luxury, and innovation. Our dining furniture spans from the simplistic to the ornate, and quality is always at the forefront.",
      link: "/dining/chairs"  
  },
];

export interface AdditionalInformation {
  key?: string;
  value?: string;
  colors?: string[];
  dimension?: string[];
}

export const homeProducts: IHomeProducts[] = [
  {
    name: 'dining',
    products: [
      {
        name: 'Trulli Dining Chair',
        posterImageUrl: '/images/HomeProducts/Dining/Trulli.webp',
      },
      {
        name: 'Korla Dining Chair',
        posterImageUrl: '/images/HomeProducts/Dining/Korla.webp',
      },
      {
        name: 'Parisio Dining Chair',
        posterImageUrl: '/images/HomeProducts/Dining/Parisio.webp',
      },
      {
        name: 'Savio Dining Chair',
        posterImageUrl: '/images/HomeProducts/Dining/Savio.webp',
      },
      {
        name: 'Flavia Dining Chair',
        posterImageUrl: '/images/HomeProducts/Dining/Flavia.webp',
      },
      {
        name: 'Sapori Dining Table',
        posterImageUrl: '/images/HomeProducts/Dining/Sapori.webp',
      },
      {
        name: 'Fiori Side Cabinet',
        posterImageUrl: '/images/HomeProducts/Dining/Fiori.webp',
      },
      {
        name: 'Floki Barstool',
        posterImageUrl: '/images/HomeProducts/Dining/Floki.webp',
      },
      {
        name: 'Venice Barstool',
        posterImageUrl: '/images/HomeProducts/Dining/Venice.webp',
      },
      {
        name: 'Trattori Barstool',
        posterImageUrl: '/images/HomeProducts/Dining/Trattori.webp',
      },
      {
        name: 'Ricordi Dining Table',
        posterImageUrl: '/images/HomeProducts/Dining/Ricordi.webp',
      },
      {
        name: 'Serenita Side Cabinet',
        posterImageUrl: '/images/HomeProducts/Dining/Serenita.webp',
      },
    ],
  },
  {
    name: 'living',
    products: [
      {
        name: 'Lisbon Sofa',
        posterImageUrl: '/images/HomeProducts/Living/Lisbon.webp',
      },
      {
        name: 'Nordic Coffee Table with the Side Table',
        posterImageUrl: '/images/HomeProducts/Living/nordic.png',
      },
      {
        name: 'Finestra Side Table',
        posterImageUrl: '/images/HomeProducts/Living/Finestra.webp',
      },
      {
        name: 'Vaunchy Side Table',
        posterImageUrl: '/images/HomeProducts/Living/Vaunchy.webp',
      },
      {
        name: 'Arti Side Table',
        posterImageUrl: '/images/HomeProducts/Living/Arti.webp',
      },
      {
        name: 'Lincoln Leather Chair & Footstool',
        posterImageUrl: '/images/HomeProducts/Living/Lincoln.webp',
      },
      {
        name: 'Bentley Black Crescent Swivel Chair',
        posterImageUrl: '/images/HomeProducts/Living/Bentley.webp',
      },
      {
        name: 'Marlin Rocking Chair',
        posterImageUrl: '/images/HomeProducts/Living/rocking.webp',
      },
      {
        name: 'Braga Armchair',
        posterImageUrl: '/images/HomeProducts/Living/Braga.png',
      },
      {
        name: 'Capri Leather Swivel Chair',
        posterImageUrl: '/images/HomeProducts/Living/Capri.webp',
      },
      {
        name: 'Hallie Sofa',
        posterImageUrl: '/images/HomeProducts/Living/Hallie.webp',
      },
      {
        name: 'Torino Coffee Table',
        posterImageUrl: '/images/HomeProducts/Living/Torino.webp',
      },
    ],
  },
  {
    name: 'bedroom',
    products: [
      {
        name: 'Tavola Bedside Table',
        posterImageUrl: '/images/HomeProducts/Bedroom/Tavola.webp',
      },
      {
        name: 'Moderno Bedside Table',
        posterImageUrl: '/images/HomeProducts/Bedroom/Moderno.webp',
      },
      {
        name: 'Ombra Bedside Table',
        posterImageUrl: '/images/HomeProducts/Bedroom/Ombra.webp',
      },
      {
        name: 'Accenti Bedside Table',
        posterImageUrl: '/images/HomeProducts/Bedroom/Accenti.webp',
      },
      {
        name: 'Vista Sofa Bed',
        posterImageUrl: '/images/HomeProducts/Bedroom/Vista.webp',
      },
      {
        name: 'Melodia Sofa Bed',
        posterImageUrl: '/images/HomeProducts/Bedroom/Melodia.webp',
      },
      {
        name: 'Yakuba Side Table',
        posterImageUrl: '/images/HomeProducts/Bedroom/Yakuba.webp',
      },
      {
        name: 'Sexton Floor Lamp',
        posterImageUrl: '/images/HomeProducts/Bedroom/Sexton.webp',
      },
      {
        name: 'Florento Floor Lamp',
        posterImageUrl: '/images/HomeProducts/Bedroom/Florento.webp',
      },
      {
        name: 'Cipriani Floor Lamp',
        posterImageUrl: '/images/HomeProducts/Bedroom/Cipriani.webp',
      },
      {
        name: 'Unico Side Table',
        posterImageUrl: '/images/HomeProducts/Bedroom/unico.png',
      },
      {
        name: 'Unico Side Table',
        posterImageUrl: '/images/HomeProducts/Bedroom/Unico.png',
      },
    ],
  },
  {
    name: 'accessories',
    products: [
      {
        name: 'Droplet Stand ',
        posterImageUrl: '/images/HomeProducts/Accessories/Droplet.webp',
      },
      {
        name: 'Layered Elegance',
        posterImageUrl: '/images/HomeProducts/Accessories/Layered.webp',
      },
      {
        name: 'Abstract Vase',
        posterImageUrl: '/images/HomeProducts/Accessories/Abstract.webp',
      },
      {
        name: 'Monolith Sphere Towers',
        posterImageUrl: '/images/HomeProducts/Accessories/Monolith.webp',
      },
      {
        name: 'Rooted Egg Stands',
        posterImageUrl: '/images/HomeProducts/Accessories/Rooted.webp',
      },
    ],
  },
];
