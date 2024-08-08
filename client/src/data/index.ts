import {
  IChairProducts,
  ISliderData,
  BannerImage,
  IDiscountProducts,
  IServiceItem,
  TSlide,
  ICard,
  ITestimonialCard,
  Country,
  City,
  ISocialIcons,
  Feature,
  ISaleItems,
  IProductCategories,
  ITabbyPayList,
  ITabbyList,
  ITamaraList,
  TimerSliderItem,
  TPolicySection,
  IProduct,
} from '@/types/types';

import banner1 from '@images/banners/banner1.png';
import banner2 from '@images/banners/banner2.png';
import banner3 from '@images/banners/banner3.png';
import banner4 from '@images/banners/megasale.png';
import cardimage1 from '@images/imageeee.png';

import palette from '@icons/palette.png';
import delivery from '@icons/delivery-fast.png';
import privacy from '@icons/privacy.png';
import support from '@icons/chat-46.png';
import opal from '@images/products/OPALdiningtable_900x900S.png';
import armChair from '@images/products/armchair.png';
import profileimage1 from '@images/profile/Ellipse 4.png';
import profileimage2 from '@images/profile/Ellipse 5.png';

import facebook from '@icons/Icon-awesome-facebook-f.png';
import x from '@icons/Icon-awesome-twitter.png';
import instagram from '@icons/Icon-awesome-instagram.png';
import linkedin from '@icons/Icon-awesome-linkedin-in.png';
import saleimage1 from '@icons/EN0-full-logo-black.png';
import saleimage2 from '@icons/tabby-logo-charcoal.png';
import masterCard from '@icons/business.png';
import viseCard from '@icons/card.png';
import gPayCard from '@icons/pngwing.png';
// import TSImage from '@images/banners/banner1.png';
import timerImage from '@assets/images/sofa1.png';
import { TPolicySections } from '@/types/types';
import { TTermsCondition } from '@/types/types';

export const timerSliderData: TimerSliderItem[] = [
  {
    discountText: 'UPTO 50% OFF',
    dealText: 'Deal of the Day',
    price: '$99.99',
    productName: 'Trent Luxury Armchair',
    // bannerHeading: 'Amazing Offer Just for You!',
    buttonText: 'ADD TO CART',
    image: timerImage,
    endDate: '2024-12-31T23:59:59',
    productId: 5,
  },
  {
    discountText: 'UPTO 50% OFF',
    dealText: 'Limited Time Offer',
    price: '$79.99',
    productName: 'Trent Luxury Armchair',
    // bannerHeading: 'Don’t Miss Out!',
    buttonText: 'ADD TO CART',
    image: timerImage,
    endDate: '2024-11-30T23:59:59',
    productId: 5,
  },
  // Add more items as needed
];

export const slides: TSlide[] = [
  {
    image: banner1,
    bannerHeading: 'Build Your Home With Furniture',
    bannerSubHeading: 'Making Beautiful Your Home',
    text: 'Slide 1 Text 2',
    buttonText: 'Shop Now',
    buttonLink: '#',
  },
  {
    image: banner2,
    bannerHeading: 'Build Your Home With Furniture',
    bannerSubHeading: 'Making Beautiful Your Home',
    text: 'Slide 2 Text',
    buttonText: 'Shop Now',
    buttonLink: '#',
  },
  {
    image: banner3,
    bannerHeading: 'Build Your Home With Furniture',
    bannerSubHeading: 'Making Beautiful Your Home',
    text: 'Slide 3 Text',
    buttonText: 'Shop Now',
    buttonLink: '#',
  },
];
export const bannerImage: BannerImage = {
  image: banner4,
  altText: 'Banner Image',
};
export const serviceItems: IServiceItem[] = [
  {
    id: 1,
    icon: palette,
    title: 'Unique Everything',
  },
  {
    id: 2,
    icon: delivery,
    title: 'Free Shipping & Return',
  },
  {
    id: 3,
    icon: privacy,
    title: 'Secure Payments',
  },
  {
    id: 4,
    icon: support,
    title: 'Support Customer',
  },
];

export const slidersData: ISliderData[] = [
  {
    tabTitle: 'Table',
    cards: [
      {
        id: 5,
        name: 'Table Smartphone1',
        price: 699,
        description:
          'Introducing the Minsk Coffee Table – a modern marvel that enhances your living space with contemporary elegance. The round-shaped metal coffee table boasts a sleek design, combining style and functionality...',
        stock: 50,
        discountPrice: 649,
        posterImageUrl: 'https://example.com/smartphone.jpg',
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
        ],
        categoriesId: 3,
      },
      {
        id: 6,
        name: ' Table Sofa',
        price: 899,
        description: 'A comfortable 3-seater sofa.',
        stock: 20,
        discountPrice: 799,
        posterImageUrl: 'https://example.com/sofa.jpg',
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
    ],
  },
  {
    tabTitle: 'Sofa',
    cards: [
      {
        id: 5,
        name: 'Smartphone',
        price: 699,
        description:
          'Introducing the Minsk Coffee Table – a modern marvel that enhances your living space with contemporary elegance. The round-shaped metal coffee table boasts a sleek design, combining style and functionality...',
        stock: 50,
        discountPrice: 649,
        posterImageUrl: 'https://example.com/smartphone.jpg',
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
        posterImageUrl: 'https://example.com/sofa.jpg',
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
    ],
  },
  {
    tabTitle: 'Lamp',
    cards: [
      {
        id: 5,
        name: 'Smartphone',
        price: 699,
        description:
          'Introducing the Minsk Coffee Table – a modern marvel that enhances your living space with contemporary elegance. The round-shaped metal coffee table boasts a sleek design, combining style and functionality...',
        stock: 50,
        discountPrice: 649,
        posterImageUrl: 'https://example.com/smartphone.jpg',
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
        posterImageUrl: 'https://example.com/sofa.jpg',
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
    ],
  },
  {
    tabTitle: 'Chair',
    cards: [
      {
        id: 5,
        name: 'Smartphone',
        price: 699,
        description:
          'Introducing the Minsk Coffee Table – a modern marvel that enhances your living space with contemporary elegance. The round-shaped metal coffee table boasts a sleek design, combining style and functionality...',
        stock: 50,
        discountPrice: 649,
        posterImageUrl: 'https://example.com/smartphone.jpg',
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
        posterImageUrl: 'https://example.com/sofa.jpg',
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
    ],
  },
  {
    tabTitle: 'Monitor',
    cards: [
      {
        id: 5,
        name: 'Smartphone',
        price: 699,
        description:
          'Introducing the Minsk Coffee Table – a modern marvel that enhances your living space with contemporary elegance. The round-shaped metal coffee table boasts a sleek design, combining style and functionality...',
        stock: 50,
        discountPrice: 649,
        posterImageUrl: 'https://example.com/smartphone.jpg',
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
        posterImageUrl: 'https://example.com/sofa.jpg',
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
    ],
  },
];
export const discountProducts: IDiscountProducts[] = [
  {
    id: 1,
    imageUrl: opal,
    title: 'Extra 20% off Clearance*',
  },
  {
    id: 2,
    imageUrl: opal,
    title: 'Extra 20% off Clearance*',
  },
  {
    id: 3,
    imageUrl: opal,
    title: 'Extra 20% off Clearance*',
  },
  {
    id: 4,
    imageUrl: opal,
    title: 'Extra 20% off Clearance*',
  },
  {
    id: 5,
    imageUrl: opal,
    title: 'Extra 20% off Clearance*',
  },
  {
    id: 6,
    imageUrl: opal,
    title: 'Extra 20% off Clearance*',
  },
  {
    id: 7,
    imageUrl: opal,
    title: 'Extra 20% off Clearance*',
  },
  {
    id: 8,
    imageUrl: opal,
    title: 'Extra 20% off Clearance*',
  },
  {
    id: 9,
    imageUrl: opal,
    title: 'Extra 20% off Clearance*',
  },
];

export const chairProducts: IChairProducts[] = [
  {
    id: 1,
    imageUrl: armChair,
    title: 'ARMCHAIRS',
  },
  {
    id: 2,
    imageUrl: armChair,
    title: 'ARMCHAIRS',
  },
];

export const cards: ICard[] = [
  {
    id: 1,
    image: cardimage1,
    name: 'Sparta Coffee Table',
    price: 100,
    discount: 300,
    sale: '50%',
    reviews: 3,
    productType: 'DINNER',
    description:
      'Introducing the Minsk Coffee Table – a modern marvel that enhances your living space with contemporary elegance. The round-shaped metal coffee table boasts a sleek design, combining style and functionality...',
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
  },
  {
    id: 2,
    image: cardimage1,
    name: 'Sparta Coffee Table',
    price: 100,
    discount: 300,
    sale: '30%',
    reviews: 5,
    productType: 'Home',
    description:
      'Introducing the Minsk Coffee Table – a modern marvel that enhances your living space with contemporary elegance. The round-shaped metal coffee table boasts a sleek design, combining style and functionality...',
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
  },
  {
    id: 3,
    image: cardimage1,
    name: 'Sparta Coffee Table',
    price: 100,
    discount: 300,
    sale: '50%',
    reviews: 2,
    productType: 'CHAIRS',
    description:
      'Introducing the Minsk Coffee Table – a modern marvel that enhances your living space with contemporary elegance. The round-shaped metal coffee table boasts a sleek design, combining style and functionality...',
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
  },
  {
    id: 4,
    image: cardimage1,
    name: 'Sparta Coffee Table',
    price: 100,
    discount: 300,
    sale: '45%',
    reviews: 0,
    productType: 'DINNER',
    description:
      'Introducing the Minsk Coffee Table – a modern marvel that enhances your living space with contemporary elegance. The round-shaped metal coffee table boasts a sleek design, combining style and functionality...',
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
  },
  {
    id: 5,
    image: cardimage1,
    name: 'Sparta Coffee Table',
    price: 100,
    discount: 300,
    sale: '70%',
    reviews: 4,
    productType: 'Home OFFICE',
    description:
      'Introducing the Minsk Coffee Table – a modern marvel that enhances your living space with contemporary elegance. The round-shaped metal coffee table boasts a sleek design, combining style and functionality...',
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
  },
  {
    id: 6,
    image: cardimage1,
    name: 'Sparta Coffee Table',
    price: 100,
    discount: 300,
    sale: '70%',
    reviews: 5,
    productType: 'TABLES',
    description:
      'Introducing the Minsk Coffee Table – a modern marvel that enhances your living space with contemporary elegance. The round-shaped metal coffee table boasts a sleek design, combining style and functionality...',
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
  },
  {
    id: 7,
    image: cardimage1,
    name: 'Sparta Coffee Table',
    price: 100,
    discount: 300,
    sale: '45%',
    reviews: 0,
    productType: 'LIVING',
    description:
      'Introducing the Minsk Coffee Table – a modern marvel that enhances your living space with contemporary elegance. The round-shaped metal coffee table boasts a sleek design, combining style and functionality...',
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
  },
  {
    id: 8,
    image: cardimage1,
    name: 'Sparta Coffee Table',
    price: 100,
    discount: 300,
    sale: '70%',
    reviews: 4,
    productType: 'BEDROOM',
    description:
      'Introducing the Minsk Coffee Table – a modern marvel that enhances your living space with contemporary elegance. The round-shaped metal coffee table boasts a sleek design, combining style and functionality...',
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
  },
  {
    id: 9,
    image: cardimage1,
    name: 'Sparta Coffee Table',
    price: 100,
    discount: 300,
    sale: '70%',
    reviews: 5,
    productType: 'LIVING',
    description:
      'Introducing the Minsk Coffee Table – a modern marvel that enhances your living space with contemporary elegance. The round-shaped metal coffee table boasts a sleek design, combining style and functionality...',
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
  },
];

export const testimonialcards: ITestimonialCard[] = [
  {
    id: 1,
    profile: profileimage1,
    name: 'Sparta Coffee Table',
    comment:
      'It is very comfortable because there is free internet for tasks, and cheap food',
    reviews: 3,
  },
  {
    id: 2,
    profile: profileimage1,
    name: 'Sparta Coffee Table',
    comment:
      'It is very comfortable because there is free internet for tasks, and cheap food',
    reviews: 5,
  },
  {
    id: 3,
    profile: profileimage1,
    name: 'Sparta Coffee Table',
    comment:
      'It is very comfortable because there is free internet for tasks, and cheap food',
    reviews: 2,
  },
  {
    id: 4,
    profile: profileimage1,
    name: 'Sparta Coffee Table',
    comment:
      'It is very comfortable because there is free internet for tasks, and cheap food',
    reviews: 5,
  },
  {
    id: 5,
    profile: profileimage1,
    name: 'Sparta Coffee Table',
    comment:
      'It is very comfortable because there is free internet for tasks, and cheap food',
    reviews: 4,
  },
  {
    id: 6,
    profile: profileimage1,
    name: 'Sparta Coffee Table',
    comment:
      'It is very comfortable because there is free internet for tasks, and cheap food',
    reviews: 5,
  },
];
export const customtestimonialcards: ITestimonialCard[] = [
  {
    id: 1,
    profile: profileimage2,
    name: 'Dominic Greene',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    reviews: 3,
  },
  {
    id: 2,
    profile: profileimage2,
    name: 'Dominic Greene',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    reviews: 5,
  },
  {
    id: 3,
    profile: profileimage2,
    name: 'Dominic Greene',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    reviews: 2,
  },
  {
    id: 4,
    profile: profileimage2,
    name: 'Dominic Greene',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    reviews: 5,
  },
];

export const socialicons: ISocialIcons[] = [
  { id: 1, imageUrl: facebook, title: 'Facebook' },
  { id: 2, imageUrl: x, title: 'X' },
  { id: 3, imageUrl: instagram, title: 'Instagram' },
  { id: 4, imageUrl: linkedin, title: 'LinkedIn' },
];

export const saleitems: ISaleItems[] = [
  {
    id: 1,
    imageUrl: saleimage1,
    para: 'Availble at checkout',
    btnText: 'Show Now',
    btnUrl: '',
  },
  {
    id: 2,
    imageUrl: saleimage2,
    para: 'Availble at checkout',
    btnText: 'Show Now',
    btnUrl: '',
  },
];

export const productData = [
  {
    link: '/',
    image: cardimage1,
    name: 'Sparta Coffee Table',
    price: 150.0,
    originalPrice: 300.0,
    discount: '-50%',
    rating: 3,
  },
  {
    link: '/',
    image: cardimage1,
    name: 'Athena Dining Table',
    price: 200.0,
    originalPrice: 400.0,
    discount: '-50%',
    rating: 4,
  },
  {
    link: '/',
    image: cardimage1,
    name: 'Athena Dining Table',
    price: 200.0,
    originalPrice: 400.0,
    discount: '-50%',
    rating: 4,
  },
];

export const data = {
  paragraphs: [
    'Having been established in the UAE for over a decade, the time was right to have a division solely focussed on sourcing and buying the best pieces of unique, modern furniture for your home. The owners are passionate about furnishings and every item selected is something worthy of their own homes. Our buyers spend time hand testing each and every product.',
    "We visit the factories personally to ensure staff welfare. We take important steps in speaking to the factory staff to be certain that they are treated with respect and dignity and receiving their salaries on time. Any factory that doesn't adhere to our strict stipulations are struck off from our supply chain. Every item is quality checked before being loaded onto containers bound for our warehouse in Dubai.",
    "Our team at source are paid bonuses to find faults, making it more stringent that goods don't pass this stage easily. Once the products arrive in the UAE, they are once again meticulously checked for any flaws or faults.",
    "Only then are they assigned a shelf space and available to sell. Another unique trait of ours is the Try Before You Buy guarantee. This allows you to order any item which we deliver and assemble in your home and give you 30 mins to really test and decide if you're satisfied with your selection. If you are, then great. If not, we will simply repack the item and refund your money by the next day time taken for the money to reach your account varies from bank to bank. The TBYB guarantee is available on the majority of items on our website. Those items not a part of this guarantee will be clearly marked.",
  ],
};
export const products = [
  {
    id: 1,
    name: 'Sparta Coffee Table',
    price: 123.45,
    originalPrice: 200.0,
    imageUrl: cardimage1,
  },
  {
    id: 2,
    name: 'Sparta Coffee Table',
    price: 123.45,
    originalPrice: 200.0,
    imageUrl: cardimage1,
  },
  {
    id: 3,
    name: 'Sparta Coffee Table',
    price: 123.45,
    originalPrice: 200.0,
    imageUrl: cardimage1,
  },
];

// Country data
export const countries: Country[] = [
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'QA', name: 'Qatar' },
];

// City data
export const cities: City[] = [
  { country: 'AE', name: 'Dubai' },
  { country: 'AE', name: 'Abu Dhabi' },
  { country: 'KW', name: 'Kuwait City' },
  { country: 'KW', name: 'Al Ahmadi' },
  { country: 'SA', name: 'Riyadh' },
  { country: 'SA', name: 'Jeddah' },
  { country: 'QA', name: 'Doha' },
  { country: 'QA', name: 'Al Rayyan' },
];

export const features: Feature[] = [
  {
    image: cardimage1,
    title: 'Sparta Coffee Table',
    rating: 4,
    currentPrice: 100,
    originalPrice: 150,
    discount: 50,
  },
  {
    image: cardimage1,
    title: 'Sparta Coffee Table',
    rating: 4,
    currentPrice: 50,
    originalPrice: 150,
    discount: 50,
  },
  {
    image: cardimage1,
    title: 'Sparta Coffee Table',
    rating: 4,
    currentPrice: 100,
    originalPrice: 150,
    discount: 30,
  },
  {
    image: cardimage1,
    title: 'Sparta Coffee Table',
    rating: 4,
    currentPrice: 100,
    originalPrice: 150,
    discount: 40,
  },
  {
    image: cardimage1,
    title: 'Sparta Coffee Table',
    rating: 4,
    currentPrice: 100,
    originalPrice: 150,
    discount: 50,
  },
  // Add more feature objects here
];

export const productcetagories: IProductCategories[] = [
  { id: 1, title: 'DINNER', totalItems: 12 },
  { id: 2, title: 'LIVING', totalItems: 12 },
  { id: 3, title: 'BEDROOM', totalItems: 12 },
  { id: 4, title: 'CHAIRS', totalItems: 12 },
  { id: 5, title: 'TABLES', totalItems: 12 },
  { id: 6, title: 'Home OFFICE', totalItems: 12 },
  { id: 7, title: 'Home', totalItems: 12 },
];

export const bestSellerProducts: IProduct[] = [
  {
    id: 8,
    name: 'test',
    price: 699,
    description: 'Latest smartphone with advanced features.',
    stock: 100,
    discountPrice: 599,
    posterImageUrl: 'https://example.com/smartphone-x.jpg',
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
  {
    id: 8,
    name: 'test',
    price: 699,
    description: 'Latest smartphone with advanced features.',
    stock: 100,
    discountPrice: 599,
    posterImageUrl: 'https://example.com/smartphone-x.jpg',
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

export const tabbyfeature: ITabbyList[] = [
  { id: 1, para: 'No interest. No fees.' },
  { id: 2, para: 'Trusted by 4,5m+ customers.' },
  { id: 3, para: 'Shariah-compliant.' },
];

export const tabbyhowitwork: ITabbyList[] = [
  { id: 1, para: 'Choose Tabby at checkout' },
  { id: 2, para: 'Enter your information and add your debit or credit card.' },
  { id: 3, para: 'Your first payment is taken when the order is made.' },
  { id: 4, para: 'We will send you a reminder when your next payment is due' },
];

export const tabbypayicon: ITabbyPayList[] = [
  { id: 1, imageUrl: masterCard },
  { id: 2, imageUrl: viseCard },
  { id: 3, imageUrl: gPayCard },
];

export const tamarawhy: ITamaraList[] = [
  { id: 1, para: 'Sharia-compliant' },
  { id: 2, para: 'No late fees' },
  { id: 3, para: 'Quick and easy' },
];
export const tamaralist: ITamaraList[] = [
  {
    id: 1,
    para: 'ayment options availability may vary based on your order value and Tamara record.',
  },
  { id: 2, para: 'Subject to terms and conditions.' },
  { id: 3, para: 'Tamara is Sharia-compliant.' },
  { id: 4, para: 'Eligible for customers in United Arab Emirates.' },
  {
    id: 5,
    para: 'Your final payment plan may vary depending on your credit history.',
  },
];

export const tamarafeature: ITamaraList[] = [
  {
    id: 1,
    title: 'Split in 4',
    para: 'Pay a fraction now and the rest in 3 payments over the next 3 months. No late fees, shariah-compliant!*',
  },
  {
    id: 2,
    title: 'Pay in Full',
    para: 'Pay the full amount today and enjoy exclusive perks with Tamara!*',
  },
];

export const tankyousildercards: ICard[] = [
  {
    id: 1,
    image: cardimage1,
    name: 'Sparta Coffee Table',
    price: 100,
    discount: 300,
    sale: '50%',
    reviews: 3,
    productType: 'DINNER',
  },
  {
    id: 2,
    image: cardimage1,
    name: 'Sparta Coffee Table',
    price: 100,
    discount: 300,
    sale: '30%',
    reviews: 5,
    productType: 'Home',
  },
  {
    id: 3,
    image: cardimage1,
    name: 'Home Chairs',
    price: 100,
    discount: 300,
    sale: '50%',
    reviews: 2,
    productType: 'CHAIRS',
  },
  {
    id: 4,
    image: cardimage1,
    name: 'Sparta Coffee Table',
    price: 100,
    discount: 300,
    sale: '45%',
    reviews: 0,
    productType: 'DINNER',
  },
  {
    id: 5,
    image: cardimage1,
    name: 'Sparta Coffee Table',
    price: 100,
    discount: 300,
    sale: '70%',
    reviews: 4,
    productType: 'Home OFFICE',
  },
  {
    id: 6,
    image: cardimage1,
    name: 'Sparta Coffee Table',
    price: 100,
    discount: 300,
    sale: '70%',
    reviews: 5,
    productType: 'TABLES',
  },
  {
    id: 7,
    image: cardimage1,
    name: 'Office Table',
    price: 100,
    discount: 300,
    sale: '45%',
    reviews: 0,
    productType: 'LIVING',
  },
  {
    id: 8,
    image: cardimage1,
    name: 'Chai Table',
    price: 100,
    discount: 300,
    sale: '70%',
    reviews: 4,
    productType: 'BEDROOM',
  },
  {
    id: 9,
    image: cardimage1,
    name: 'Test Coffee Table',
    price: 100,
    discount: 300,
    sale: '70%',
    reviews: 5,
    productType: 'LIVING',
  },
];
export const TermsCondition = [
  {
    title: 'What’s in These Terms?',
    description: [
      "These Terms and Conditions (T&Cs) take effect the moment when you start using Avenue 39's website (www.avenue39.com) and the services provided by Avenue 39. The T&Cs are compulsory to all the visitors of the Avenue39 website, and consumers of our products and services which contain sophisticated rules on your behavior while browsing on the site, purchasing goods and engaging with the content. These Avenue39 Terms and Conditions include provisions related to the use of the site, product purchasing, account management, intellectual property, and dispute resolution. You are aware that you have accepted all the guidelines and procedures mentioned in this clause in the term and conditions of this agreement. Avenue39 reserves all the ownership rights in respect to content, information or any product/service which may be published on this site until full immediate payment is received from the customer for the purchased product.",
      'Avenue39 was then incorporated and registered under the laws of the local jurisdiction where it operates. Main office is situated at 23 22nd Street, Al Quoz Industrial Area 4 - Dubai and which is our leading trade office.',
      'If you have any issues, inquiries, or general customer support, please email our sales team at [[EMAIL_LINK]]. We guarantee that our customer service is always readily available and will handle any customer concerns you may have about our products, services, or the terms of use in our website speedily.',
      'Taking our website and its terms into account, your consent implies your acceptance and appreciation of these T&Cs. This is a legal agreement, and when you continue to operate on a given website, you will be deemed to agree and abide by the rules and regulations stipulated here.',
      'Being aware of your rights and obligations is, hence, something very important and the only means you can be able to do this is by reading them thoroughly. Furthermore we advise it to be necessary to review any related documents as our Privacy Policy and our Return Policy it is also possible use and they are both considered essential for these T&Cs design.',
    ],
  },

  {
    title: 'Products and Services Offered',
    description: [
      'Avenue39 has various products that are now modern furnishings that can be found within our website for instance, living room sets, bedroom furniture, arm chairs, leisure chairs, coffee tables, TV cabinets, office tables, and all the other products. In our website store, every product has a title and detailed description with the images above which clearly show the features and beauty of the item.',

      'Avenue39 has now made it easier for our clients with a customer support system that can help with any questions or challenges you might have regarding our products and services. We provide guidance on choosing the ideal piece of furniture, while we are ready to help on an ongoing basis after a purchase has been done. Our kind assistants will always make sure your shopping with us is a pleasure.',
      'Procuring a product on Avenue39 starts with selecting the ones that interest you, adding them to the cart, then proceeding through the check out process available on our website. At the last stage, you will be prompted to put in your shipping address and authorize the payment information, and then your order will be completed. We will email you confirmation upon receipt of your order to produce an email which gives you a rundown of your purchase.',
      'Your offer of purchasing stands before us, but this will be only settled once we email you of the shipment of your ordered product. The information presented serves as an assertion that your relationship with Avenue39 is now governed by these Terms and Conditions. At this time the items in your shopping cart are not reserved for you and may be purchased by any other customers until your order has been confirmed and the process of order processing has been completed.',
      ' Avenue39 avoids taking orders when the product is discontinued or there are mistakes in pricing and product descriptions that cannot be resolved, or if there is no permission to pay ahead. Sometimes we will need to cancel orders in cases which are infrequent and to do that there may be unforeseen operational problems. We will contact you by email when this happens and refund in full.',
    ],
  },
  {
    title: 'Pricing and Payment',
    description: [
      'The local currency is the currency used on the Avenue39 website page on which all the product sale prices are indicated, it also has the current tax rates if the “net” prices were meant. We take all measures to make sure that all prices which could be found on our website are precise. But, nonetheless, proper price posting is not guaranteed. We would notify you in case we find the price of your ordered products was different and then offer you either of the options of confirming the order at the right price or canceling it. However, if we are unable to extend the order as pending, it will be regarded as canceled.',
      'In the case of mis-describing the product or price that has an impact on your purchase, we will inform you promptly and ask whether you would like to confirm the order with the updated details or to cancel it. This is regardless of whether you are trying to return a product that was not as described or exchanging under our Return Policy.',
      'Avenue39 not only accepts payments through Visa and MasterCard but also through debit cards and online systems. On landing the page, you will be redirected to make a payment, and your orders can only be dispatched after full payment and verification. For example, your payment details which can be a credit card, debit card or PayPal are processed using the latest secure environment.',
      "That's why you are obliged to go through an authentication of genuineness, identity and authorized final approval by your payment provider until we can start processing an order. In cases when our payment provider fails to approve the payment, regardless of delays and technical errors in delivering your order, we shall not be responsible for them.",
    ],
  },
  {
    title: 'Use of Materials',
    description: [
      'Copyright and trademark law protects Avenue39’s trade address, logos, designs, packaging images and marketing materials. You are not supposed to utilize these materials without the written authorization from Avenue39 and all the related rights reserved.',
      'It is not permitted to reproduce any information or misuse these resources anyhow and the law applies in such cases. It involves two specific procedures, such as, duplicating the work, moving it to another location without the original owner’s consent.',
    ],
  },
  {
    title: 'Changes to Policies',
    description: [
      'Avenue39 has the right to change its regulation of products that it sells at any given time including the one on returns and refunds. As a result we are going to have a possibility to take a look at the impact of these alterations when the announcement will be made.',
      'We state that we should not be taken accountable for an incomplete visualization from the result of certain platform related policies, third parties, or system failures.',
    ],
  },
  {
    title: 'Disclaimer of Liability',
    description: [
      'Avenue39 is not composed to hold any liability claims as a result of the use of our products or engagement with our services. Indirect, incidental, or consequential damages are not unlike consequential damages or animo delictum.',
    ],
  },
  {
    title: 'Intellectual Property Rights',
    description: [
      'Avenue39 considers its intellectual jurisdiction as the property of the organization which owns all the products, trademarks, designs, and its official website contents. Such characteristics are generally provided for by the national and international legislation.',
      ' Disregarding the right’s exclusivity and copyright conditions can be prosecuted through legal measures in order to ensure the sustainable existence of Avenue39.',
    ],
  },
  {
    title: 'Privacy and Personal Information',
    description: [
      'Avenue39, as an organization committed to the protection of private information, would like to inform you that the company does not gather personal data. We take the utmost care to protect all information about the users conforming with the Privacy Policy which is in line with the data protection laws. By using our services, you accept the Privacy Policy, as described in the document, where we will be collecting, processing, and using your personal data.',
    ],
  },
  {
    title: 'Indemnity',
    description: [
      'With acknowledgment, we absolve Avenue39, and all parties said under us including offices, agents, employees, and partners from any results caused by our breach of these Terms and Conditions or the laws or property rights of a third party for the claims or actions against us that pay legal fees and costs. Below is a representation of the scope of your obligation for coverage pertaining to your usage of Avenue39’s services, any breaches of these terms, or infringement of any intellectual property or other right of any person or entity.',
    ],
  },
  {
    title:
      "What's Can Be Regarded as Mandatory Territory Law to the Specific Disputes? ",
    description: [
      "Avenue39's services are under the jurisdiction of the federal laws of the United Arab Emirates, and these conditions and terms in this guide constitute the foundation of our contract.",
    ],
  },
  {
    title: 'In Case of Any Queries, Contact Us On:',
    description: [
      'Should you have any questions or need further assistance, please do not hesitate to contact our customer service team.',
      'You can reach us by phone at [[PHONE_LINK]] or by email at [[EMAIL_LINK]].',
      'Our dedicated team is available to ensure that your experience with Avenue39 is seamless and satisfactory.',
    ],
  },
];

export const policySections = [
  {
    title: '',
    description: [
      "Your privacy matters to Avenue39, so we've outlined how we handle your information according to the rules and regulations. By agreeing to this privacy policy, you are authorizing us to use your information (provided by you at the time of purchase).",
      'Why and How do we collect information? ',
      '1. Whenever you buy something through the Avenue39 website, the first step is to set up an account, or use our services. We collect some of your general details required to make a purchase for example; your name, address, email, phone number, and payment details.  ',
      '2. For our business and marketing purposes, we also keep track of how you use our website, browser details, which pages you visit and how long you stay there.',
      '3. Avenue39 only needs this information to complete your purchases, deliver your products to you timely, help you out in case you need it, and make sure our website works well for you. ',
      "4. If the customer agrees with this policy, Avenue39 is authorized to send you emails about the latest products, deals and promotions. If you decide you don't want these emails anymore, you can always unsubscribe.",
      '5. By agreeing to this privacy policy, Avenue39 is authorized to share information with other companies that will help to provide our services and deliver products timely. Like the ones that process your payments or help ship your orders.',
      "6. In some adverse circumstances, If the law requires it or if it's inevitable to protect our rights as a business dealing with customers, or prevent fraud, we might also have to share your information.",
      '7. If our company ever merges with another or gets bought by another investor, your information might be transferred for future correspondence.',
      '8. We take protective measures to secure your information and use various security measures to keep it safe from unauthorized access, leaks and scammers.',
      '9. In case your personal information like name, location, payment details are changed, you can update the information while making a new purchase with Avenue39. ',
      '10. If you ever want us to delete your information from our systems and our partner’s databases, just let us know via email. ',
      "We might change this privacy policy once in a while according to the new rules and regulations under the laws of the United Arab Emirates. If we make any major changes, we'll update the policy here on our website, and maybe inform you via email, also a good idea to check this page whenever you decide to make a new purchase.",
    ],
  },
  {
    title: 'Contact Us',
    description: [
      'If you have any questions about this privacy policy, you can contact us:',
      'Email: [[EMAIL_LINK]]',
      'Phone: [[PHONE_LINK]] ',
      'WhatsApp: [[WHATSAPP_LINK]]',
    ],
  },
];
export const ReturnPolicy = [
  {
    title: '',
    description: [
      'Avege39 is a brand people can trust as we keep their experience of our products beyond their expectations. However, we come to terms with the fact that occasionally, it is just impossible to prevent returns.',
      'Avenue39 has a fair and logical return and refund policy. As we make our payment policy quite transparent to everyone, possible returns within 7 days of acceptance or purchase of your item for a full refund or exchange. Comprise the rule that you are supposed to bring only the items that are unworn and new just as they were delivered for you.',
      'All rights, the initiators of returns are asked to return the products to their usual store when they do not achieve the expected result.',
      'To start the return procedure, follow these steps:',
      '1. Send an email to us with your concerns and complaints due to which you made the decision to return the product.',
      '2. The customer care service will contact you as soon as they receive the email you have sent to cs@avenue39.com within 24 hours from getting the product.',
      '3. Within the email textbox area include details such as your name, order number and the phone number used to process your purchase.',
      'IWe will always emphasize on the promptity with Avenue39. You will receive the detailed guidance within 1 working day. Even more, they will inform you if your product can be accepted or not.',
    ],
  },
  {
    title: 'Condition for returning item; what items can be returned?',
    description: [
      'To qualify for a full refund of your purchase with Avenue39, you need to check the following conditions, to find whether your product is eligible or not:',
      '1. These provided items must not have been worn and nor altered by the customer.',
      '2. Products cannot be altered after purchase, any dismantling will result in the item being deemed ineligible for a return or refund.',
      'You have the product to be delivered to us via courier, in the same conditions as the way you originally bought them. Submitted products must be accompanied by the original packaging, manuals, and other accessories if there is any.',
      'If I have a quality question about the item, please let us know.',
    ],
  },
  {
    title: 'What should I do if I receive a faulty or damaged product?',
    description: [
      'We are a team that ensures each customer will receive A1 product in A1 condition for sure. You have the option to request for a refund or replacement of the Avenue39 product that arrives to you in a faulty or damaged state by notifying the Avenue39 team within 24 hours of you having received the product.',
    ],
  },
  {
    title: 'How to notify us:',
    description: [
      'Email us at [[EMAIL_LINK]] to get your product fixed in case of any damages or faults. Please attach a short description about the problem and photos of the damage to make the process go smoothly.',
      'Importantly, we would like to point out that all the claims for faulty and damaged goods mentioned by customers after the 24-hour time have expired cannot be accepted by us. Avenue39 will not have any part in it, which means the return will no longer be on them and therefore will not be liable to fulfil it.',
    ],
  },
  {
    title: 'How are refunds processed?',
    description: [
      'You can enjoy your purchase with confidence knowing that we stand ready to serve if any undesirable conditions are found. We will send you an email to specify in the order received the returned item. Besides, we will give you an update about your refund whether it is approved or not. Please note that we will refund your money in case it is approved. The cash or store credit which will be refunded to you according to the refund policy, will automatically be applied back to your original processing place within certain periods.',
    ],
  },
];
export const ShippingPolicy = [
  {
    title: '',
    description: ['Delivery takes 5 days within UAE'],
  },
  {
    title: 'General Information for Delivery of our Products',
    description: [
      'All orders placed by the customers with Avenue39 through the website are subject to product availability at the time of order. If an item in your order is unavailable at the time of purchase, we will notify you through email or website product page.',
    ],
  },
  {
    title: 'Delivery Policy',
    description: [
      'Below are Avenue39 delivery guidelines, according to the laws and regulations:',
      '1. After you place an order through our website(avenue39.com) and an invoice will be generated including the details. Our customer service team will contact you to schedule the delivery time and date.',
      '2. We aim to deliver all orders within 2 working days for addresses within Dubai city limits.',
      '3.  In the case the customer has pre-order requirements, the specific delivery times will be mentioned on the product’s detail page.',
      '4.  Delivery times often get affected by unforeseen circumstances, in some cases beyond our control, resulting in unexpected delays of the delivery of your product. In such severe cases, Avenue39’s customer support team will make sure to keep you informed and reschedule the delivery at the earliest available opportunity.',
      '5.  While making a purchase, customers are responsible for providing accurate and correct address details on the order confirmation page. Avenue39 is not liable or responsible for any delays, misplacements, or incorrect deliveries if they arise. The customer is solely responsible for incorrect or incomplete information, resulting in delay or cancellation of the ordered item.',
      '6.  It will be your responsibility to thoroughly examine the product, its parts or any other details, at the time of delivery before signing the delivery receipt. ',
      '7. By signing the delivery receipt, customers agree to this policy and acknowledge that they have inspected the product(s) at the time of delivery. They agree that the product is free from any visible faults or undisclosed issues.  ',
      '8.  If a product is found to be faulty, damaged, not the same product ordered by customers upon delivery, notify our customer service at cs@avenue39.com.',
    ],
  },
  {
    title: 'Additional Services and Charges',
    description: [
      "After you have successfully placed an order on our website, we will make sure to ship the product immediately. Once your order is shipped by Avenue39, a tracking number will be shared with you via email or order confirmation page. This number will help you to track your order's progress via the courier company’s website.",
    ],
  },
  {
    title: 'Questions',
    description: [
      'If you have any further questions, concerns and complains about the delivery and shipment of your order, or if you need to discuss delivery preferences, please contact us at:',
      'Email: [[EMAIL_LINK]]',
      'Phone: [[PHONE_LINK]] ',
      'WhatsApp: [[WHATSAPP_LINK]]',
    ],
  },
];
