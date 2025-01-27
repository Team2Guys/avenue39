export const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Contact' }];
export const aboutbreadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'About Us' },
];
export const checkout = [
  { label: 'Home', href: '/' },
  { label: 'Cart', href: '/cart' },
  { label: 'checkout' },
];
export const profilebreadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'profile' },
];
export const Orderbreadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Order History' },
];
export const productsbredcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Shop' },
];
export const cartbredcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Cart' },
];
export const wishbredcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Wishlist' },
];
export const Tersmandcondition = [
  { label: 'Home', href: '/' },
  { label: 'Terms & Conditions' },
];
export const PrivacyPolicybredcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Privacy-Policy' },
];
export const TReturnPolicybredcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Return-Policy' },
];
export const TShippingPolicybredcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Shipping-Policy' },
];

import * as Yup from 'yup';
import { Product, Category, SubCategory } from '@/types/interfaces';
import { IProductAdd } from '@/types/types';

export const validateForm = (formData: {
  fullName: string;
  email: string;
  password: string;
  confirmpassword: string;
}) => {
  if (formData.password !== formData.confirmpassword) {
    return 'Confirm password and password do not match.';
  }

  if (!formData.fullName || !formData.email || !formData.password) {
    return 'All fields are required.';
  }

  if (formData.password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  if (!/\d/.test(formData.password)) {
    return 'Password must contain at least one number.';
  }

  if (!/[!@#$%^&*]/.test(formData.password)) {
    return 'Password must contain at least one special character.';
  }

  return '';
};

export const withoutHeaderPages = ['/login', '/register', '/superAdminlogin'];

export const inputFields = [
  { name: 'name', type: 'text' },
  { name: 'description', type: 'text' },
  { name: 'price', type: 'number' },
  // { name: "category", type: 'text' },
  { name: 'discountPrice', type: 'number' },
];

export const CategorinputFields = [{ name: 'name', type: 'text' }];
export const withoutVariation = [
  { name: 'totalStockQuantity', type: 'number' },
];

export const Variation = [
  { name: 'variant', type: 'text' },
  { name: 'quantity', type: 'number' },
];

export const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
});

export const loginValidationSchema = Yup.object({
  name: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export const categoryValidationSchema = Yup.object({
  name: Yup.string().required('Required'),
  // description: Yup.string().required('required'),
});
export const subcategoryValidationSchema = Yup.object({
  title: Yup.string().required('Required'),
  CategoryId: Yup.number().required('required'),
});
export const initialValues: Product = {
  name: '',
  description: '',
  price: '',
  colors: [],
  totalStockQuantity: 0,
  variantStockQuantities: [],
  modelDetails: [],
  spacification: [],
  discountPrice: '',
  category: '',
};

export const categoryInitialValues: Category = {
  name: '',
  description: '',
  meta_description:'',
  meta_title:'',
  canonical_tag:'',
  images_alt_text:'',
};
export const subcategoryInitialValues: SubCategory = {
  name: '',
  description: '',
  meta_title: '',
  meta_description: '',
  canonical_tag: '',
  images_alt_text: '',
  categoriesId: [],
};

export const loginInitialValue = {
  name: '',
  password: '',
};

export const AddProductvalidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.number()
    .min(1, 'Minimum sales price must be at least 1')
    .required('Required'),
  discountPrice: Yup.number().nullable(),
  productImages: Yup.array().of(
    Yup.object().shape({
      colorName: Yup.string().nullable(),
    }),
  ),
  // additionalInformation: Yup.array().of(
  //   Yup.object().shape({
  //     name: Yup.string().nullable(),
  //     detail: Yup.string().nullable(),
  //   }),
  // ),
  // categoriesId: Yup.number().required('Category is required'),
});

export const AddproductsinitialValues: IProductAdd = {
  name: '',
  price: 0,
  description: '',
  stock: 0,
  discountPrice: 0,
  posterImageUrl: '',
  posterImagePublicId: '',
  hoverImageUrl: '',
  hoverImagePublicId: '',
  productImages: [],
  spacification: [],
  colors: [],
  additionalInformation: [],
  categories: [],
  subcategories: [],
  Meta_Title:'',
  Canonical_Tag:'',
  Meta_Description:'',
  Images_Alt_Text:'',
  sale_counter: '',
};

export const options = [
  {
    value: 'abu_dhabi',
    label: 'Abu Dhabi',
  },
  {
    value: 'dubai',
    label: 'Dubai',
  },
  {
    value: 'sharjah',
    label: 'Sharjah',
  },
  {
    value: 'ajman',
    label: 'Ajman',
  },
  {
    value: 'umm_al_quwain',
    label: 'Umm Al Quwain',
  },
  {
    value: 'ras_al_khaimah',
    label: 'Ras Al Khaimah',
  },
  {
    value: 'fujairah',
    label: 'Fujairah',
  },
];

export const categories: any = [
  {
    maintitle: "coffee-tables",
    data: {
      topText: "Coffee Table",
      heading: "Heading for Category Two",
      subHeading: "Subheading for Category Two",
      paragraph: "Some description about category two goes here. Some description about category two goes here",
      LeftSideImage: [
        { img: "/images/categories/Coffee-Table/banner-11a.png" },
        { img: "/images/categories/Coffee-Table/banner-12a.png" },
      ],
      RightSideImage: [
        { img: "/images/categories/Coffee-Table/banner-11.jpg" },
        { img: "/images/categories/Coffee-Table/banner-12.jpg" },
      ],
    },
  },
  {
    maintitle: "accessories",
    data: {
      topText: "Accessories",
      heading: "Accessories",
      subHeading: "Subheading for Category Two",
      paragraph: "Some description about category two goes here. Some description about category two goes here",
      LeftSideImage: [
        { img: "/images/categories/Accessories/banner-4a.png" },
      ],
      RightSideImage: [
        { img: "/images/categories/Accessories/banner-4.jpg" },
      ],
    },
  },
  { 
    maintitle: "armchairs",
    data: {
      topText: "Armchairs",
      heading: "Armchairs",
      subHeading: "Subheading for Category Two",
      paragraph: "Some description about category two goes here. Some description about category two goes here",
      LeftSideImage: [
        { img: "/images/categories/Armchairs/banner-6a.png" },
        { img: "/images/categories/Armchairs/banner-7a.png" },
      ],
      RightSideImage: [
        { img: "/images/categories/Armchairs/banner-6.jpg" },
        { img: "/images/categories/Armchairs/banner-7.jpg" },
      ],
    },
  },
  
  {
    maintitle: "barstools",
    data: {
      topText: "Barstools",
      heading: "Barstools",
      subHeading: "Subheading for Category Two",
      paragraph: "Some description about category two goes here.",
      LeftSideImage: [
        { img: "/images/categories/Barstools/banner-21a.png" },
        { img: "/images/categories/Barstools/banner-22a.png" },
      ],
      RightSideImage: [
        { img: "/images/categories/Barstools/banner-21.jpg" },
        { img: "/images/categories/Barstools/banner-22.jpg" },
      ],
      
    },
  },
  {
    maintitle: "floor-lamps",
    data: {
      topText: "Floor Lamps ",
      heading: "Floor Lamps",
      subHeading: "Subheading for Category Two",
      paragraph: "Some description about category two goes here.",
      LeftSideImage: [
        { img: "/images/categories/Floor-Lamps/banner-26a.png" },
      ],
      RightSideImage: [
        { img: "/images/categories/Floor-Lamps/banner-26.jpg" },
      ],
      
    },
  },
  {
    maintitle: "office-tables",
    data: {
      topText: "Office Tables",
      heading: "Office Tables",
      subHeading: "Subheading for Category Two",
      paragraph: "Some description about category two goes here.",
       LeftSideImage: [
        { img: "/images/categories/Office-Tables/banner-23a.png" },
        { img: "/images/categories/Office-Tables/banner-24a.png" },
      ],
      RightSideImage: [
        { img: "/images/categories/Office-Tables/banner-23.jpg" },
        { img: "/images/categories/Office-Tables/banner-24.jpg" },
      ],
      
    },
  },
  {
    maintitle: "side-tables",
    data: {
      topText: "Side Tables",
      heading: "Side Tables",
      subHeading: "Subheading for Category Two",
      paragraph: "Some description about category two goes here.",
       LeftSideImage: [
        { img: "/images/categories/Side-Tables/banner-9a.png" },
        { img: "/images/categories/Side-Tables/banner-10a.png" },
      ],
      RightSideImage: [
        { img: "/images/categories/Side-Tables/banner-9.jpg" },
        { img: "/images/categories/Side-Tables/banner-10.jpg" },
      ],
      
    },
  },
  {
    maintitle: "dining-tables",
    data: {
      topText: "Dining Tables",
      heading: "Dining Tables",
      subHeading: "Subheading for Category Two",
      paragraph: "Some description about category two goes here.",
       LeftSideImage: [
        { img: "/images/categories/Dining-Table/banner-1A.png" },
        { img: "/images/categories/Dining-Table/banner-2a.png" },
      ],
      RightSideImage: [
        { img: "/images/categories/Dining-Table/banner-1.jpg" },
        { img: "/images/categories/Dining-Table/banner-2.jpg" },
      ],
      
    },
  },
  {
    maintitle: "side-cabinets",
    data: {
      topText: "Side Cabinets",
      heading: "Side Cabinets",
      subHeading: "Subheading for Category Two",
      paragraph: "Some description about category two goes here.",
       LeftSideImage: [
        { img: "/images/categories/Coffee-Table/banner-11a.png" },
        { img: "/images/categories/Coffee-Table/banner-12a.png" },
      ],
      RightSideImage: [
        { img: "/images/categories/Coffee-Table/banner-11.jpg" },
        { img: "/images/categories/Coffee-Table/banner-12.jpg" },
      ],
      
    },
  },
  {
    maintitle: "sofas",
    data: {
      topText: "Sofaa",
      heading: "Sofaa",
      subHeading: "Subheading for Category Two",
      paragraph: "Some description about category two goes here.",
       LeftSideImage: [
         { img: "/images/categories/Sofas/banner-15a.png" },
         { img: "/images/categories/Sofas/banner-14a.png" },
        { img: "/images/categories/Sofas/banner-16a.png" },
      ],
      RightSideImage: [
        { img: "/images/categories/Sofas/banner-15.jpg" },
        { img: "/images/categories/Sofas/banner-14.jpg" },
        { img: "/images/categories/Sofas/banner-16.jpg" },
      ],
    },
  },
  {
    maintitle: "table-lamps",
    data: {
      topText: "Table Lamps",
      heading: "Table Lamps",
      subHeading: "Subheading for Category Two",
      paragraph: "Some description about category two goes here.",
       LeftSideImage: [
        { img: "/images/categories/Table-Lamps/banner-25a.png" },
      ],
      RightSideImage: [
        { img: "/images/categories/Table-Lamps/banner-25.jpg" },
      ],
      
    },
  },
  {
    maintitle: "tv-cabinets",
    data: {
      topText: "TV Cabinets",
      heading: "TV Cabinets",
      subHeading: "Subheading for Category Two",
      paragraph: "Some description about category two goes here.",
       LeftSideImage: [
        { img: "/images/categories/TV-Cabinet/banner-8a.png" },
      ],
      RightSideImage: [
        { img: "/images/categories/TV-Cabinet/banner-8.jpg" },
      ],
      
    },
  },
  {
    maintitle: "bedside-tables",
    data: {
      topText: "Beside Tables",
      heading: "Beside Tables",
      subHeading: "Subheading for Category Two",
      paragraph: "Some description about category two goes here.",
       LeftSideImage: [
        { img: "/images/categories/Bedside-Table/banner-19a.png" },
        { img: "/images/categories/Bedside-Table/banner-20a.png" },
      ],
      RightSideImage: [
        { img: "/images/categories/Bedside-Table/banner-19.jpg" },
        { img: "/images/categories/Bedside-Table/banner-20.jpg" },
      ],
      
    },
  },
  {
    maintitle: "accent-chairs",
    data: {
      topText: "Accent Chairs",
      heading: "Accent Chairs",
      subHeading: "Subheading for Category Two",
      paragraph: "Some description about category two goes here.",
       LeftSideImage: [
        { img: "/images/categories/Accent-Chairs/banner-17a.png" },
        { img: "/images/categories/Accent-Chairs/banner-18a.png" },
      ],
      RightSideImage: [
        { img: "/images/categories/Accent-Chairs/banner-17.jpg" },
        { img: "/images/categories/Accent-Chairs/banner-18.jpg" },
      ],
      
    },
  },
];

export const SaleBannerData = [
  {
    title: "Shop Featured Products",
    link: "/product/lucius-coffee-table-set",
    productName: "Lucius Coffee Table Set",
    price: "AED 3,000",
    imageSrc: "/images/salebanner/lucis.png",
  },
  {
    title: "Shop Best Sellers",
    link: "/product/fiori-side-console",
    productName: "Fiori Side Console",
    price: "AED 7,400",
    imageSrc: "/images/salebanner/fiori.png",
  },
];

export const Dining= [
  'Trulli Dining Chair',
  'Korla Dining Chair',
  'Parisio Dining Chair',
  'Savio Dining Chair',
  'Flavia Dining Chair',
  'Sapori Dining Table',
  'Fiori Side Console',
  'Floki Barstool',
  'Venice Barstool',
  'Trattori Barstool',
]
export const Living= [
  'Marlin Tub Swivel Chair (Brown & cream)',
  'Marlin Tub Swivel Chair',
  'Marlin Tub Chair',
  'Marlin Rocking Chair (White& Grey)',
  'Marlin Rocking Chair (White & Black)',
  'The Lisbon Sofa Set',
  'Lucius Coffee Table Set',
  'Finestra Side Table',
  'Vaunchy Side Table',
  'Arti Side Table',
]
export const Bedroom= [
  'Yakuba Side Table',
  'Tavola Bedside Table',
  'Moderno Bedside Table',
  'Ombra Bedside Table',
  'Accenti Bedside Table',
  'Vista Sofa Bed',
  'Sexton Floor Lamp',
  'Florento Floor Lamp',
  'Cipriani Floor Lamp',
]
export const Accessories= [
  'A Pair of Droplet Stands',
  'A Pair of Monolith Sphere Towers',
  'A Pair of Layered Elegance',
  'A Pair of Rooted Egg Stands',
  'Abstract Vase',
]
