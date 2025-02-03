import {
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
  ITabbyPayList,
  ITabbyList,
  ITamaraList,
  TimerSliderItem,
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
import living from '@images/products/armchair.png';
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

export const timerSliderData: TimerSliderItem[] = [
  {
    productId: 23234,
    discountText: 'UPTO 50% OFF',
    dealText: 'Deal of the Day',
    price: 'AED 2400',
    productName: 'Trent Luxury Armchair',
    // bannerHeading: 'Amazing Offer Just for You!',
    buttonText: 'ADD TO CART',
    image: timerImage,
    endDate: '2024-12-31T23:59:59',
  },
  {
    productId: 23234,

    discountText: 'UPTO 50% OFF',
    dealText: 'Limited Time Offer',
    price: 'AED 2400',
    productName: 'Trent Luxury Armchair',
    // bannerHeading: 'Don’t Miss Out!',
    buttonText: 'ADD TO CART',
    image: timerImage,
    endDate: '2024-11-30T23:59:59',
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
    imageUrl: living,
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
    link: '/product/5',
    image: cardimage1,
    name: 'Sparta Coffee Table',
    price: 150.0,
    originalPrice: 300.0,
    discount: '-50%',
    rating: 3,
  },
  {
    link: '/product/5',
    image: cardimage1,
    name: 'Athena Dining Table',
    price: 200.0,
    originalPrice: 400.0,
    discount: '-50%',
    rating: 4,
  },
  {
    link: '/product/5',
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
    `We've spent decades researching and partnering with furniture manufacturers to understand the requirements of our customers and what we can do to meet their needs.`,
    'Every chair, every table, every sofa-handpicked, tested, and sourced with care, because we know that when it comes to furnishing your space, nothing but the best will do. That’s exactly why <b>Avenue39</b> was born.',
    'After spending over a decade in the UAE, we realized there was a gap in the market for furniture that’s not just stylish, but thoughtfully sourced and genuinely high-quality. So, we decided to do something about it. Unlike the mass-produced, soulless pieces you find everywhere, we wanted to bring in furniture we’d proudly have in our own homes.',
    "We began our journey with a simple idea: to make high-quality, unique, and modern furniture accessible to everyone. During this exciting journey, we built strong relationships with some of the finest furniture manufacturers, but not just anyone who makes the cut. As part of our quality control process, our Avenue39 team personally visits factories to make sure that the craftsmanship meets our standards. We also make sure the people behind the pieces are treated fairly and with respect. If a factory doesn't meet our quality and ethical standards, we walk away. No compromises.",
  ],
  paragraphs2: [
    '"We call it "attention to detail," but you can just call it "getting it right.”',
  ],
  paragraphs3: [
    'We don’t just pick items out of a catalogue and hope for the best. Every single piece of furniture goes through a hands-on test before making it into our collection. Our buyers spend time at the source, personally checking materials, craftsmanship, and durability. We sit on the sofas, run our hands over the tabletops, and inspect the finishes—if it doesn’t meet our standards, it doesn’t make the cut.',
    'Once we’re satisfied with a piece, it still has a long way to go before it reaches you. Every item is quality-checked before being loaded into shipping containers bound for Dubai. And when it arrives at our warehouse? Another round of inspections. But we don’t stop there. Our team is actually rewarded for finding faults, not passing them, meaning only the absolute best furniture gets approved for sale.',
    'We get it—furniture shopping isn’t always easy. You see something online, and it looks great, but what if it doesn’t feel right once it’s in your home? That’s exactly why we introduced our Try Before You Buy guarantee. Here’s how it works: when we deliver and assemble your new furniture, you get 30 minutes to test it out, feel the materials, see how it fits your space, and decide if it’s truly what you want. If you love it, fantastic—it’s yours. If not, no stress. We’ll pack it back up, take it away, and process your refund immediately (the exact timing depends on your bank, but usually within 7 days).',
    'Not going to be home when we deliver? No problem. We can leave the item unassembled, so you can take your time deciding. If within 7 days you change your mind, just email us at <a href="mailto:cs@avenue39.com" class="font-bold text-red-600 hover:underline ">cs@avenue39.com</a> to get a return number. Once the item is back with us and confirmed to be in perfect condition, your refund will be processed right away. No hidden fees, no fine print—just a smooth, straightforward experience.',
    'So go ahead, explore our collection, and let’s make your home a place that truly feels like you.',
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
    link: 'product/5',
    image: cardimage1,
    title: 'Sparta Coffee Table',
    rating: 4,
    currentPrice: 100,
    originalPrice: 150,
    discount: 50,
  },
  {
    link: 'product/5',
    image: cardimage1,
    title: 'Sparta Coffee Table',
    rating: 4,
    currentPrice: 50,
    originalPrice: 150,
    discount: 50,
  },
  {
    link: 'product/5',
    image: cardimage1,
    title: 'Sparta Coffee Table',
    rating: 4,
    currentPrice: 100,
    originalPrice: 150,
    discount: 30,
  },
  {
    link: 'product/5',
    image: cardimage1,
    title: 'Sparta Coffee Table',
    rating: 4,
    currentPrice: 100,
    originalPrice: 150,
    discount: 40,
  },
  {
    link: 'product/5',
    image: cardimage1,
    title: 'Sparta Coffee Table',
    rating: 4,
    currentPrice: 100,
    originalPrice: 150,
    discount: 50,
  },
  // Add more feature objects here
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
    title: 'What are in these terms & Con?',
    description: [
      "These Terms and Conditions (T&Cs) take effect the moment when you start using Avenue 39's website (www.avenue39.com) and the services provided by Avenue 39. The T&Cs are compulsory to all the visitors of the Avenue39 website, and consumers of our products and services which contain sophisticated rules on your behavior while browsing on the site, purchasing goods and engaging with the content. These Avenue39 Terms and Conditions include provisions related to the use of the site, product purchasing, account management, intellectual property, and dispute resolution. You are aware that you have accepted all the guidelines and procedures mentioned in this clause in the terms and conditions of this agreement. Avenue39 reserves all the ownership rights in respect to content, information or any product/service which may be published on this site until full immediate payment is received from the customer for the purchased product.",
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
    title: 'Return Policy',
    description: [
      'Avenue39 is a brand that people can trust, as we keep their experience with our products beyond their expectations. However, we come to terms with the fact that, occasionally, it is just impossible to prevent returns. Avenue39 has a fair and logical return and refund policy.',
      'Please read through the following details to learn how we handle returns and refunds.',
    ],
  },
  {
    title: 'Our Commitment to Quality',
    description: [
      'Every product we make meets the highest standards of craftsmanship and is durable. Our staff visits the factories personally to make sure not only that the products are good, but also that the employees are paid on time and other ethics are upheld. Our supply chain is immediately terminated if a supplier doesn&apost meet our strong criteria. Upon reaching our warehouse in Dubai, every product is given a second inspection to ensure that it is in perfect condition. You can be assured that if there&aposs a problem with your purchase, we&aposll work with you to fix it.',
    ],
  },
  {
    title: 'Return Eligibility',
    description: [
      'We have two options when it comes to returns. At the time of delivery, we can assemble the furniture for you and give you 30 minutes to decide if you are happy to keep your purchase. If you are, then great, we’ll consider that as accepted and leave you to enjoy your shiny new piece of furniture. If you decide you don’t wish to keep your purchase, no problem at all; our team will disassemble and re-pack your furniture, and a refund will be issued right away. (The time taken for monies to reach your account varies from bank to bank but is usually within 7 days)',
      'If you aren’t available or don&apost have the time to view, we can deliver your furniture without assembly and let you take your time deciding. If within 7 days you wish to return your purchase, you can contact the team at [[EMAIL_LINK]] and receive a return number. Once your item is received back and confirmed to be in its brand-new condition, we will process your refund right away. (The time taken for monies to reach your account varies from bank to bank but is usually within 7 days)',
    ],
  },
  {
    title: 'Non-Returnable Items',
    description: [
      'Certain products are excluded from our return policy due to their customised nature or other considerations. These include items that have been altered, assembled, or installed after delivery, as well as custom orders and personalised furniture. ',
    ],
  },
  {
    title: 'Contact Us',
    description: [
      'If you have any questions about our Return Policy or need assistance with a return, our dedicated Customer Support Team is here to help. You can reach us via email at [[EMAIL_LINK]]. Our team is committed to making your experience with Avenue39 as smooth and enjoyable as possible, from your initial purchase to any post-sale concerns.',
    ],
  },
];
export const ShippingPolicy = [
  {
    title: 'General Information For Delivery Of Our Products',
    description: ['All orders made through the Avenue39 website depend on product availability at the time of purchase. If any item in your order is not available, we will quickly inform you via email or provide updates on the product page.'],
  },
  {
    title: 'Delivery Policy',
    description: [
      'The following are Avenue39&aposs delivery guidelines in accordance with applicable laws and regulations:',
      '1. After you make a purchase on our website avenue39.com, we&aposll generate an invoice for your order. Our customer service staff will get in touch with you to set up and verify the delivery date and time.',
      '2. We offer next-day delivery in Dubai and 2-day delivery to all other Emirates.',
      '3. For items available for pre-order, you&aposll find specific delivery timeframes on the product detail page.',
      '4. Sometimes unexpected events out of our hands might affect delivery times causing delays we didn&apost plan for. If this happens, Avenue39&aposs customer support team will keep you in the loop and try to reschedule the delivery as as possible.',
      '5. Buyers need to give correct and full address details when they check out. Avenue39 can&apost take responsibility for delays lost orders, or wrong deliveries because of wrong or incomplete information from the customer.',
      '6. When the delivery arrives, it&aposs up to the customer to check the product, its parts, or any related info before they sign the delivery receipt.',
      '7. By signing the delivery receipt, customers show they&aposve looked over the product(s) and agree that the product doesn&apost have any visible flaws or problems that weren&apost mentioned at delivery time.',
      '8. If a product is faulty, damaged, or incorrect upon delivery, please contact our customer service team immediately at cs@avenue39.com.',
    ],
  },
  {
    title: 'Additional Services and Charges',
    description: [
      "1. Our team will assemble your items during the delivery. Should you require assembly on a date other than the delivery date, an additional charge of AED 150 will apply. ",
      '2. For items that are eligible under our "Try Before You Buy" offer, we will assemble the item and then give you 20 minutes to decide whether you will keep your purchase.',
      "3. If you decide not to buy, the item will be disassembled and repackaged. A full refund will also be initiated on our end within 24 hours, given the bank processing time."
    ],
  },
  {
    title: 'Tracking Your Order ',
    description: [
      'Once you place your order, Avenue39 will quickly process and ship your product. After your order is shipped, you will receive a tracking number through email or on the order confirmation page. This tracking number will allow you to track your shipment on the courier company’s website.',
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
