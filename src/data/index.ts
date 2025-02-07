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
import banner2 from '@images/banners/banner2.jpg';
import banner3 from '@images/banners/banner3.webp';
import banner4 from '@images/banners/megasale.webp';
import cardimage1 from '@images/imageeee.webp';

import palette from '@icons/palette.png';
import delivery from '@icons/delivery-fast.png';
import privacy from '@icons/privacy.png';
import support from '@icons/chat-46.png';
import opal from '@images/products/OPALdiningtable_900x900S.webp';
import living from '@images/products/armchair.webp';
import profileimage1 from '@images/profile/Ellipse 4.png';

import facebook from '@icons/Icon-awesome-facebook-f.png';
import x from '@icons/Icon-awesome-twitter.png';
import instagram from '@icons/Icon-awesome-instagram.png';
import linkedin from '@icons/Icon-awesome-linkedin-in.png';
import saleimage1 from '@icons/EN0-full-logo-black.png';
import saleimage2 from '@icons/tabby-logo-charcoal.png';
import masterCard from '@icons/business.png';
import viseCard from '@icons/card.png';
import gPayCard from '@icons/pngwing.png';
import timerImage from '@assets/images/sofa1.jpg';

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
    title: "General Terms",
    description: [
      "Product availability and payment confirmation are required for all transactions.",
      "These terms and conditions are subject to change at any moment and without prior notification or announcement by Avenue39."
    ]
  },
  {
    title: "Pricing & Payment",
    description: [
      "All prices are mentioned with products in AED (United Arab Emirates Dirham) and include VAT.",
      "Prices can change at any time without prior notice or announcement, but confirmed purchases won't be impacted.",
      "The full amount for products must be paid before orders can be shipped.",
      "As mentioned at checkout, we accept bank transfers via credit/debit cards."
    ]
  },
  {
    title: "Order Processing & Cancellations",
    description: [
      "Orders can be cancelled up to 1 hour after they are placed.",
      "Once manufacturing has started, custom or made-to-order products cannot be cancelled.",
      "If there are pricing problems, supply shortages, or suspicions of fraud, Avenue39 has the right to reject or cancel any order."
    ]
  },
  {
    title: "Delivery & Shipping",
    description: [
      "We deliver all around the United Arab Emirates. At this time, international shipping is not available.",
      "Delivery estimates are provided at checkout and depend on product availability and your location.",
      "When the order is delivered, customers need to make sure that someone is at the delivery location to accept it and check it.",
      "We will send information to customers regarding any disruptions, but Avenue39 is not liable for delays brought on by unanticipated events."
    ]
  },
  {
    title: "Returns & Refunds",
    description: [
      "Returns of regular stock items in their original packing and condition are allowed within seven days after delivery.",
      "Products that are manufactured to order or customised are not refundable unless there is a manufacturing fault.",
      "After the returned item has been successfully inspected, refunds will be executed in 5-7 business days.",
      "Customers are required to inform Avenue39 immediately and provide photographic proof if a product is damaged upon delivery."
    ]
  },
  {
    title: "Warranty & Product Care",
    description: [
      "All of Avenue39's products come backed by a limited guarantee against manufacturing faults. Each product has different warranty coverage.",
      "Damage brought on by regular wear and use, misconduct, incorrect installation, or exposure to extreme conditions is not covered by the guarantee.",
      "To ensure lifetime, customers must follow the product care instructions."
    ]
  },
  {
    title: "Custom Orders",
    description: [
      "Custom and made-to-order items are non-refundable and demand complete purchase in advance.",
      "Although they might change, estimated production and delivery dates will be discussed at the time of purchase."
    ]
  },
  {
    title: "Intellectual Property",
    description: [
      "It is strictly forbidden to distribute, reproduce, or copy any type of content in the form of photos or information on the Avenue39 website without the written permission of Avenue39."
    ]
  },
  {
    title: "Limitation of Liability",
    description: [
      "Any indirect, incidental, or consequential damages resulting from the usage of our products are not the responsibility of Avenue39.",
      "Delivery delays brought on by outside factors, such as supply chain problems, extreme weather, or delays in transit, are unfortunate. We are here to offer advice and assistance to the best of our ability."
    ]
  },
  {
    title: "Contact Information",
    description: [
  ]
  }
];


export const policySections = [
  {
    title: 'Privacy Policy',
    description: [
      "When you visit www.avenue39.com (the 'Website'), we collect, use, disclose, and secure your information under this Privacy Policy. You agree to the terms and conditions stated in this privacy policy by using or accessing our website. If you disagree with any aspect of this policy, we respect your decision to stop using this website. ",
    ],
  },
  {
    title: 'What Information Do We Collect?',
    description: [
      "To execute your transaction and better our services, we collect specific information when you purchase on the Avenue39 website. This comprises:",
      "Personal Details: Name, address, phone number, email, and payment information are variations on personal information.",
      "Browsing information: Time spent on our website, pages seen, and browser information for marketing and commercial purposes.",
      "We only collect this data to fulfill your order, guarantee prompt delivery, offer customer service, and improve our website for a more enjoyable online shopping experience.",
    ],
  },
  {
    title: 'Why Do We Collect Your Information?',
    description: [
      "We use your data to:",
      "Safely manage your purchases and transactions.",
      "Deliver your purchases to the appropriate address.",
      "Customise our website to the interests and behaviours of our customers.",
      "Offer customer service if you require help.",
      "Provide marketing information about special offers, new items, and promotions (only if you opt-in).",
      "You may unsubscribe from marketing emails at any moment if you no longer want to receive them.",
    ],
  },
  {
    title: 'How Do We Share Your Information?',
    description: [
      "Avenue39 may provide your information to outside service partners who help with fulfilling your orders, payment processing, and effective service delivery.",
      "Additionally, we could share your information if mandated by law or legal procedures to protect our company's rights to stop fraud, security risks, and improper usage of our website.",
      "Your information could be sent to the new company in case Avenue39 gets merged or acquired.",
      "Your personal information is never traded or sold to unaffiliated third parties. ",
    ],
  },
  {
    title: 'How Do We Keep Your Information Safe?',
    description: [
      "To protect your data from cyber threats, unauthorised access, and leaks, we implement effective safety precautions. Secure methods of payment and encryption are employed on our website to protect the privacy of your financial information.",
      "Any modifications you make to your name, address, or payment information will be reflected in subsequent purchases you make.",
    ],
  },
  {
    title: 'How Do You Manage Your Data?',
    description: [
      "When making a new purchase, you have the option to update your personal information.",
      "Just send us an email to request that your data be removed from our systems and those of our service providers.",
      "Contact our representatives in customer service if you have any questions about how we manage your data.",
    ],
  },
  {
    title: 'Policy Updates',
    description: [
      "To conform to the UAE laws and regulations, we might, at times, modify our privacy statement. We will update this page and, if required, send you an email to let you know about any major changes. Before making a purchase, we recommend consulting this policy.",
    ],
  },
  {
    title: 'Contact Us',
    description: [
      "For inquiries or requests regarding data, contact us at [[EMAIL_LINK]]",
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
      "Every product we make meets the highest standards of craftsmanship and is durable. Our staff visits the factories personally to make sure not only that the products are good, but also that the employees are paid on time and other ethics are upheld. Our supply chain is immediately terminated if a supplier doesn't meet our strong criteria. Upon reaching our warehouse in Dubai, every product is given a second inspection to ensure that it is in perfect condition. You can be assured that if there's a problem with your purchase, we'll work with you to fix it.",
    ],
  },
  {
    title: 'Return Eligibility',
    description: [
      "We have two options when it comes to returns. At the time of delivery, we can assemble the furniture for you and give you 30 minutes to decide if you are happy to keep your purchase. If you are, then great, we’ll consider that as accepted and leave you to enjoy your shiny new piece of furniture. If you decide you don’t wish to keep your purchase, no problem at all; our team will disassemble and re-pack your furniture, and a refund will be issued right away. (The time taken for monies to reach your account varies from bank to bank but is usually within 7 days)",
      "If you aren’t available or don't have the time to view, we can deliver your furniture without assembly and let you take your time deciding. If within 7 days you wish to return your purchase, you can contact the team at [[EMAIL_LINK]] and receive a return number. Once your item is received back and confirmed to be in its brand-new condition, we will process your refund right away. (The time taken for monies to reach your account varies from bank to bank but is usually within 7 days)",
    ],
  },
  {
    title: 'Non-Returnable Items',
    description: [
      "Certain products are excluded from our return policy due to their customised nature or other considerations. These include items that have been altered, assembled, or installed after delivery, as well as custom orders and personalised furniture. ",
    ],
  },
  {
    title: 'Contact Us',
    description: [
      "If you have any questions about our Return Policy or need assistance with a return, our dedicated Customer Support Team is here to help. You can reach us via email at [[EMAIL_LINK]]. Our team is committed to making your experience with Avenue39 as smooth and enjoyable as possible, from your initial purchase to any post-sale concerns.",
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
      "The following are Avenue39's delivery guidelines in accordance with applicable laws and regulations:",
      "1. After you make a purchase on our website avenue39.com, we'll generate an invoice for your order. Our customer service staff will get in touch with you to set up and verify the delivery date and time.",
      "2. We offer next-day delivery in Dubai and 2-day delivery to all other Emirates.",
      "3. For items available for pre-order, you'll find specific delivery timeframes on the product detail page.",
      "4. Sometimes unexpected events out of our hands might affect delivery times causing delays we didn't plan for. If this happens, Avenue39's customer support team will keep you in the loop and try to reschedule the delivery as as possible.",
      "5. Buyers need to give correct and full address details when they check out. Avenue39 can't take responsibility for delays lost orders, or wrong deliveries because of wrong or incomplete information from the customer.",
      "6. When the delivery arrives, it's up to the customer to check the product, its parts, or any related info before they sign the delivery receipt.",
      "7. By signing the delivery receipt, customers show they've looked over the product(s) and agree that the product doesn't have any visible flaws or problems that weren't mentioned at delivery time.",
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
      'If you have any questions, concerns, or complaints regarding the delivery or shipment of your order, or if you would like to discuss specific delivery preferences, please contact us at:',
      'Email: [[EMAIL_LINK]]',
      'Phone: [[PHONE_LINK]] ',
      'WhatsApp: [[WHATSAPP_LINK]]',
    ],
  },
];
