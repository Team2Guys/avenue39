import { IHomeProducts } from '@/types/interfaces';
import { IProduct } from '@/types/types';
import productImg1 from '@images/products/imageeee.png';

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
  imageUrl: '/images/catalogue/sofa.png',
  title: 'CATALOGUE',
  buttonText: 'DOWNLOAD ',
  fileUrl:
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
};
export const ColorBannerData = [
  {
    imageUrl: '/images/ave1.jpg',
    imageUrl2: '/images/ave2.png',
    Heading: 'luxury furniture',
    Description:
      'Avenue39 is a popular destination for interior designers and home improvement enthusiasts all over the UAE and offers an eclectic selection of luxury home decor.',
  },
  {
    imageUrl: '/images/catalogue/design_chair1.png',
    imageUrl2: '/images/catalogue/design_chair12.png',
    Heading: 'dining furniture',
    Description:
      "We're home to beautiful dining chairs that tick off all the latest styles, from Industrial to Minimalist, Scandi to Mid-century. We've designed our dining furniture collection based on customer feedback and the latest trends to make sure it's beautiful, trendy, and durable.",
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
        posterImageUrl: '/images/HomeProducts/Dining/Trulli.png',
      },
      {
        name: 'Korla Dining Chair',
        posterImageUrl: '/images/HomeProducts/Dining/Korla.png',
      },
      {
        name: 'Parisio Dining Chair',
        posterImageUrl: '/images/HomeProducts/Dining/Parisio.png',
      },
      {
        name: 'Savio Dining Chair',
        posterImageUrl: '/images/HomeProducts/Dining/Savio.png',
      },
      {
        name: 'Flavia Dining Chair',
        posterImageUrl: '/images/HomeProducts/Dining/Flavia.png',
      },
      {
        name: 'Sapori Dining Table',
        posterImageUrl: '/images/HomeProducts/Dining/Sapori.png',
      },
      {
        name: 'Fiori Side Cabinet',
        posterImageUrl: '/images/HomeProducts/Dining/Fiori.png',
      },
      {
        name: 'Floki Barstool',
        posterImageUrl: '/images/HomeProducts/Dining/Floki.png',
      },
      {
        name: 'Venice Barstool',
        posterImageUrl: '/images/HomeProducts/Dining/Venice.png',
      },
      {
        name: 'Trattori Barstool',
        posterImageUrl: '/images/HomeProducts/Dining/Trattori.png',
      },
      {
        name: 'Ricordi Dining Table',
        posterImageUrl: '/images/HomeProducts/Dining/Ricordi.png',
      },
      {
        name: 'Serenita Side Cabinet',
        posterImageUrl: '/images/HomeProducts/Dining/Serenita.png',
      },
    ],
  },
  {
    name: 'living',
    products: [
      {
        name: 'Lisbon Sofa',
        posterImageUrl: '/images/HomeProducts/Living/Lisbon.png',
      },
      {
        name: 'Nordic Coffee Table with the Side Table',
        posterImageUrl: '/images/HomeProducts/Living/Nordic.png',
      },
      {
        name: 'Finestra Side Table',
        posterImageUrl: '/images/HomeProducts/Living/Finestra.png',
      },
      {
        name: 'Vaunchy Side Table',
        posterImageUrl: '/images/HomeProducts/Living/Vaunchy.png',
      },
      {
        name: 'Arti Side Table',
        posterImageUrl: '/images/HomeProducts/Living/Arti.png',
      },
      {
        name: 'Marlin Tub Chair',
        posterImageUrl: '/images/HomeProducts/Living/Marlin.png',
      },
      {
        name: 'Marlin Tub Swivel Chair',
        posterImageUrl: '/images/HomeProducts/Living/Swivel.png',
      },
      {
        name: 'Marlin Rocking Chair',
        posterImageUrl: '/images/HomeProducts/Living/rocking.png',
      },
      {
        name: 'Braga Armchair',
        posterImageUrl: '/images/HomeProducts/Living/Braga.png',
      },
      {
        name: 'Capri Leather Swivel Chair',
        posterImageUrl: '/images/HomeProducts/Living/Capri.png',
      },
      {
        name: 'Hallie Sofa',
        posterImageUrl: '/images/HomeProducts/Living/Hallie.png',
      },
      {
        name: 'Torino Coffee Table',
        posterImageUrl: '/images/HomeProducts/Living/Torino.png',
      },
    ],
  },
  {
    name: 'bedroom',
    products: [
      {
        name: 'Tavola Bedside Table',
        posterImageUrl: '/images/HomeProducts/Bedroom/Tavola.png',
      },
      {
        name: 'Moderno Bedside Table',
        posterImageUrl: '/images/HomeProducts/Bedroom/Moderno.png',
      },
      {
        name: 'Ombra Bedside Table',
        posterImageUrl: '/images/HomeProducts/Bedroom/Ombra.png',
      },
      {
        name: 'Accenti Bedside Table',
        posterImageUrl: '/images/HomeProducts/Bedroom/Accenti.png',
      },
      {
        name: 'Vista Sofa Bed',
        posterImageUrl: '/images/HomeProducts/Bedroom/Vista.png',
      },
      {
        name: 'Milano Sofa Bed ',
        posterImageUrl: '/images/HomeProducts/Bedroom/Vista.png',
      },
      {
        name: 'Yakuba Side Table',
        posterImageUrl: '/images/HomeProducts/Bedroom/Yakuba.png',
      },
      {
        name: 'Sexton Floor Lamp',
        posterImageUrl: '/images/HomeProducts/Bedroom/Sexton.png',
      },
      {
        name: 'Florento Floor Lamp',
        posterImageUrl: '/images/HomeProducts/Bedroom/Florento.png',
      },
      {
        name: 'Cipriani Floor Lamp',
        posterImageUrl: '/images/HomeProducts/Bedroom/Cipriani.png',
      },
      {
        name: 'Melodia Sofa Bed',
        posterImageUrl: '/images/HomeProducts/Bedroom/Melodia.png',
      },
    ],
  },
  {
    name: 'accessories',
    products: [
      {
        name: 'Droplet Stand ',
        posterImageUrl: '/images/HomeProducts/Accessories/Droplet.png',
      },
      {
        name: 'A Pair of Layered Elegance',
        posterImageUrl: '/images/HomeProducts/Accessories/Layered.png',
      },
      {
        name: 'Abstract Vase',
        posterImageUrl: '/images/HomeProducts/Accessories/Abstract.png',
      },
      {
        name: 'Monolith Sphere Tower ',
        posterImageUrl: '/images/HomeProducts/Accessories/Monolith.png',
      },
      {
        name: 'Pair of Rooted Egg Stands',
        posterImageUrl: '/images/HomeProducts/Accessories/Rooted.png',
      },
    ],
  },
];
