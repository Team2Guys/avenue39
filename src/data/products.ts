import { IHomeProducts } from '@/types/interfaces';
import { IProduct } from '@/types/types';
import productImg1 from '@images/products/imageeee.webp';

export const paymentIcons = [
  { src: '/images/paymentIcons/Mastercard-Logo.webp', alt: 'Mastercard' },
  { src: '/images/paymentIcons/visacard-logo.webp', alt: 'visacard' },
  { src: '/images/paymentIcons/apply-pay-black.webp', alt: 'applypay' },
  { src: '/images/paymentIcons/googlepay-logo.webp', alt: 'googlepay' },
];

export const SliderImages = [
  {
    src: '/images/HomeSliderImage/exclusive.webp',
    alt: 'exclusive',
    link: '/products',
  },
  {
    src: '/images/HomeSliderImage/fresh.webp',
    alt: 'exclusive',
    link: '/products',
  },
  {
    src: '/images/HomeSliderImage/popular.webp',
    alt: 'exclusive',
    link: '/products',
  },
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
    Description:"We're home to beautiful chairs that tick off all the styles, from Industrial to Minimalist, Scandi to Mid-century. You can pick the silhouette and colour that works for you."  },
  {
    imageUrl: '/images/catalogue/design_chair1.webp',
    imageUrl2: '/images/catalogue/design_chair12.png',
    Heading: 'dining furniture',
    Description:
      "We're home to beautiful chairs that tick off all the styles, from Industrial to Minimalist, Scandi to Mid-century. You can pick the silhouette and colour that works for you.",
  },
];

export interface AdditionalInformation {
  key?: string;
  value?: string;
  colors?: string[];
  dimension?: string[];
}
export const products: IProduct[] = [
  {
    id: 5,
    name: 'Smartphone',
    price: 699,
    description:
      'Lovely coffee table with matching side table to give that modern look with function. Smoked glass and a marble top blend together great, giving you the luxury feel and finishing. Made from a solid wood frame and available for pre order today.',
    stock: 50,
    discountPrice: 649,
    posterImageUrl: productImg1,
    posterImagePublicId: 'smartphone_img',
    hoverImageUrl: 'https://example.com/smartphone_hover.jpg',
    hoverImagePublicId: 'smartphone_hover_img',
    productImages: [
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set3.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set1.jpg',
        public_id: 'abc',
      },

      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set4.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set6.jpg',
        public_id: 'abc',
      },
    ],
    additionalInformation: [
      {
        key: 'Colors',
        value: 'red, blue',
      },
      {
        key: 'Dimension',
        value: '10x10, 20x20',
      },
      {
        key: 'Material',
        value: 'metal, plastic',
      },
    ],
    categoriesId: 3,
  },
  {
    id: 6,
    name: 'Sofa',
    price: 899,
    description: 'A comfortable 3-seater sofa.',
    stock: 20,
    discountPrice: 799,
    posterImageUrl: productImg1,
    posterImagePublicId: 'sofa_img',
    hoverImageUrl: 'https://example.com/sofa_hover.jpg',
    hoverImagePublicId: 'sofa_hover_img',
    productImages: [
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set3.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set1.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set6.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set2.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set4.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set6.jpg',
        public_id: 'abc',
      },
    ],
    additionalInformation: [
      {
        key: 'Colors',
        value: 'red, blue',
      },
      {
        key: 'Dimension',
        value: '10x10, 20x20',
      },
    ],
    categoriesId: 4,
  },
  {
    id: 8,
    name: 'test',
    price: 699,
    description: 'Latest smartphone with advanced features.',
    stock: 100,
    discountPrice: 599,
    posterImageUrl: productImg1,
    posterImagePublicId: 'smartphone-x-public-id',
    hoverImageUrl: 'https://example.com/smartphone-x-hover.jpg',
    hoverImagePublicId: 'smartphone-x-hover-id',
    productImages: [
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set3.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set1.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set6.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set2.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set4.jpg',
        public_id: 'abc',
      },
      {
        imageUrl:
          'https://furniturezone.pk/wp-content/uploads/2024/03/4-Seater-Interchangeable-L-Shape-Sofa-Set6.jpg',
        public_id: 'abc',
      },
    ],
    additionalInformation: [
      {
        colors: ['red', 'l', 'red'],
      },
      {
        dimension: ['10*10', '20*20'],
      },
    ],
    categoriesId: 3,
  },
];

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
        name: 'Milano Sofa Bed ',
        posterImageUrl: '/images/HomeProducts/Bedroom/Vista.webp',
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
