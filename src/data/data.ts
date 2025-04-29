
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
export const cartbredcrumbs = [{ label: 'Home', href: '/' }, { label: 'Cart' }];
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
  { label: 'Privacy Policy' },
];
export const TReturnPolicybredcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Return  Policy' },
];
export const TShippingPolicybredcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Shipping Policy' },
];

import * as Yup from 'yup';
import { Category, SubCategory, FooterItem } from '@/types/interfaces';
import { IProductAdd, Shipping } from '@/types/prod';

export const categoryValidationSchema = Yup.object({
  name: Yup.string().required('Required'),
  // description: Yup.string().required('required'),
});


export const categoryInitialValues: Category = {
  name: '',
  description: '',
  short_description: '',
  meta_description: '',
  meta_title: '',
  canonical_tag: '',
  images_alt_text: '',
  custom_url: ""
};
export const subcategoryInitialValues: SubCategory = {
  name: '',
  description: '',
  meta_title: '',
  meta_description: '',
  canonical_tag: '',
  images_alt_text: '',
  categoriesId: [],
  custom_url: ""
};


export const AddProductvalidationSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Required'),
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
  sizes: [],
  additionalInformation: [],
  categories: [],
  subcategories: [],
  Meta_Title: '',
  Canonical_Tag: '',
  Meta_Description: '',
  Images_Alt_Text: '',
  sale_counter: '',
  filters: [],
  custom_url: "",
  shippingOptions: []
};


export const SaleBannerData = [
  {
    title: 'Shop Featured Products',
    link: '/tables/coffee-tables/lucius-coffee-table-set',
    productName: 'Lucius Coffee Table Set',
    price: '3,500',
    imageSrc: '/images/salebanner/lucis.webp',
  },
  {
    title: 'Shop Best Sellers',
    link: '/chairs/armchairs/trent-luxury-armchair',
    productName: 'Trent Luxury Armchair',
    price: '2,400',
    imageSrc: '/images/salebanner/trent.webp',
  },
];

// export const Accessories = [
//   'Droplet Stand ',
//   'Monolith Sphere Towers',
//   'Layered Elegance',
//   'Rooted Egg Stands',
//   'Abstract Vase',
// ];
export const newArrivals = [
  {
    title: 'NEW ARRIVALS',
    description:
      "Discover the latest in modern furniture, from <a href='/dining/chairs' target='_blank' style='text-decoration: underline'>dining chairs</a> to coffee tables, sofas, and home accessories. Whether you're revamping your home or adding a fresh touch, find the perfect design in various colors and sizes. Enjoy next-day delivery in Dubai, free assembly, and a 7-day evaluation period for a hassle-free shopping experience.",
  },
];


export const WhatsAppInfo: any = {
  number: '+971 50 597 4495',
};

export const footerItems: FooterItem[] = [
  {
    bgClass: "bg-footerbuy",
    text: "Try Before You Buy",
    overlayText: ["We assemble your furniture on delivery, and you have 20 minutes to decide—if not satisfied, we'll repack and process a refund."],
    showImage: true,
    imageSrc: "/assets/images/footer/buybefore.svg",

  },
  {
    bgClass: "bg-footerdeliver",
    text: "Fastest Furniture Delivery in UAE",
    overlayText: ["Get your order delivered in just 24 hours within Dubai and 48 hours across all Emirates."],
    showImage: true,
    imageSrc: "/assets/images/footer/delivery.png",
  },
  {
    bgClass: "bg-footershowroom",
    text: "Visit Our Showroom",
    overlayText: ["Experience our collection at our sister company, Two Guys Home Furnishing, located at <a class='underline' target='_blank' href='https://maps.app.goo.gl/4wnLULFAwHMdfBQ99' target='_blank'> 23 22nd St - Al Quoz Industrial Area 4 - Dubai </a> - see, touch and feel the quality first-hand."],
    showImage: true,
    imageSrc: "/assets/images/footer/showroomicon.svg",
  },
];



export const selectOption = [
  { title: 'Dubai', fee: 50 },
  { title: 'Abu Dhabi', fee: 100 },
  { title: 'Sharjah', fee: 100 },
  { title: 'Ajman', fee: 100 },
  { title: 'Ras Al Khaima', fee: 100 },
  { title: 'Umm Al Quwain', fee: 100 },
  { title: 'Fujairah', fee: 100 },
];

export const shippingOption: Shipping[] = [
  { icon: "https://res.cloudinary.com/dckxfl2yn/image/upload/v1744109358/delivery-location_ds2rrt.png", name: 'Standard Shipping', description: 'Within 3-4 days delivery after placing the order.', shippingFee: 0 },
  { icon: "https://res.cloudinary.com/dckxfl2yn/image/upload/v1744109277/delivery-truck_ahxlfz.png", name: 'Next-day Shipping', description: 'Next day delivery for orders placed before 1pm.', shippingFee: 100, otherEmiratesFee: 150, freeShippingFee: 1000 },
  { icon: "https://res.cloudinary.com/dckxfl2yn/image/upload/v1744109241/delivery-lighting_g34a3u.png", name: 'Lightning Shipping', description: 'Same day delivery for orders placed before 1pm.', shippingFee: 100, otherEmiratesFee: 150, freeShippingFee: 1000 }
]