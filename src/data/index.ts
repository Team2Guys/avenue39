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
  TimerSliderItem
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
    discountText: 'UPTO 50% OFF',
    dealText: 'Deal of the Day',
    price: '$99.99',
    productName: 'Trent Luxury Armchair',
    // bannerHeading: 'Amazing Offer Just for You!',
    buttonText: 'ADD TO CART',
    image: timerImage,
    endDate: '2024-12-31T23:59:59',
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
  },
  // Add more items as needed
];

export const slides: TSlide[] = [  
  {
    image: banner1,
    // bannerHeading: 'Build Your Home With Furniture',
    bannerSubHeading: 'Making Beautiful Your Home',
    text: 'Slide 1 Text 2',
    buttonText: 'Shop Now',
    buttonLink: '#',
  },
  {
    image: banner2,
    bannerSubHeading: 'Making Beautiful Your Home',
    text: 'Slide 2 Text',
    buttonText: 'Shop Now',
    buttonLink: '#',
  },
  {
    image: banner3,

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
        id: 1,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '50%',
        reviews: 3,
        productType: 'Dinner',
      },
      {
        id: 2,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '30%',
        reviews: 5,
        productType: 'Dinner',
      },
      {
        id: 3,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '50%',
        reviews: 0,
        productType: 'Dinner',
      },
      {
        id: 4,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '45%',
        reviews: 2,
        productType: 'Dinner',
      },
      {
        id: 5,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '70%',
        reviews: 4,
        productType: 'Dinner',
      },
    ],
  },
  {
    tabTitle: 'Sofa',
    cards: [
      {
        id: 1,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '50%',
        reviews: 3,
        productType: 'Dinner',
      },
      {
        id: 2,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '30%',
        reviews: 5,
        productType: 'Dinner',
      },
      {
        id: 3,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '50%',
        reviews: 4,
        productType: 'Dinner',
      },
      {
        id: 4,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '45%',
        reviews: 5,
        productType: 'Dinner',
      },
      {
        id: 5,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '70%',
        reviews: 3,
        productType: 'Dinner',
      },
    ],
  },
  {
    tabTitle: 'Lamp',
    cards: [
      {
        id: 1,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '50%',
        reviews: 3,
        productType: 'Dinner',
      },
      {
        id: 2,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '30%',
        reviews: 5,
        productType: 'Dinner',
      },
      {
        id: 3,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '50%',
        reviews: 4,
        productType: 'Dinner',
      },
      {
        id: 4,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '45%',
        reviews: 2,
        productType: 'Dinner',
      },
      {
        id: 5,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '70%',
        reviews: 3,
        productType: 'Dinner',
      },
    ],
  },
  {
    tabTitle: 'Chair',
    cards: [
      {
        id: 1,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '50%',
        reviews: 3,
        productType: 'Dinner',
      },
      {
        id: 2,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '30%',
        reviews: 5,
        productType: 'Dinner',
      },
      {
        id: 3,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '50%',
        reviews: 4,
        productType: 'Dinner',
      },
      {
        id: 4,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '45%',
        reviews: 2,
        productType: 'Dinner',
      },
      {
        id: 5,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '70%',
        reviews: 3,
        productType: 'Dinner',
      },
    ],
  },
  {
    tabTitle: 'Monitor',
    cards: [
      {
        id: 1,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '50%',
        reviews: 3,
        productType: 'Dinner',
      },
      {
        id: 2,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '30%',
        reviews: 5,
        productType: 'Dinner',
      },
      {
        id: 3,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '50%',
        reviews: 4,
        productType: 'Dinner',
      },
      {
        id: 4,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '45%',
        reviews: 2,
        productType: 'Dinner',
      },
      {
        id: 5,
        image: cardimage1,
        name: 'Sparta Coffee Table',
        price: 100,
        discount: 300,
        sale: '70%',
        reviews: 0,
        productType: 'Dinner',
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

export const bestSellerProducts: ICard[] = [
  {
    id: 1,
    image: cardimage1,
    name: 'Sparta Coffee Table',
    price: 100,
    discount: 300,
    sale: '50%',
    reviews: 3,
  },
  {
    id: 2,
    image: cardimage1,
    name: 'Sparta Coffee Table',
    price: 100,
    discount: 300,
    sale: '30%',
    reviews: 5,
  },
  {
    id: 3,
    image: cardimage1,
    name: 'Sparta Coffee Table',
    price: 100,
    discount: 300,
    sale: '50%',
    reviews: 2,
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
