import { StaticImageData } from 'next/image';
import React, { FormEventHandler, ReactNode, SetStateAction } from 'react';
export type TPolicySections = TPolicySection[];
export type TReturnPolicy = TReturnPolicy[];
export type TShippingPolicy = TShippingPolicy[];
export type TTermsCondition = TTermsCondition[];
export type TTimeRemainingArray = TTimeRemaining[];

export interface IHome {}
export interface INav {}

export interface ITypo {
  children: any;
  className?: string;
  onClick?: () => void;
}
export interface TPolicySection {
  title: string;
  description: any | any[];
}

export interface ITextIcon {
  //TODO: change Icon type
  Icon: any;
  Title: string;
  link: string;
}

export interface IContainer {
  children: ReactNode;
  className?: string;
}
export interface TimerSliderItem {
  discountText: string;
  dealText: string;
  price: string;
  productName: string;
  buttonText: string;
  image: any;
  productId: number;
  endDate: string;
}
export type BRAND = {
  logo: string;
  name: string;
  visitors: number;
  revenues: string;
  sales: number;
  conversion: number;
};
// export type TSliderSettings = {
//   dots: boolean;
//   infinite: boolean;
//   speed: number;
//   slidesToShow: number;
//   slidesToScroll: number;
// };

export type TSlide = {
  image: any;
  bannerHeading: any;
  bannerSubHeading: any;
  text: string;
  buttonText: string;
  buttonLink: string;
};
export type TTimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export interface IServiceItem {
  id: number;
  icon: StaticImageData;
  title: string;
}
export interface MenuItem {
  categoryId?: number;
  title: string;
  icon: any;
  link: string;
}

// Define the interface for the menu data object
export interface MenuData {
  [key: string]: MenuItem[];
}

export type BannerImage = {
  image: StaticImageData;
  altText: string;
};

export interface ICard {
  id: number;
  image: any;
  name: string;
  price: number;
  discount?: number;
  sale: string;
  reviews: number;
  productType?: string;
  description?: string;
  additionalInformation?: AdditionalInformation[];
}
export interface ProductImage {
  imageUrl: string;
  public_id: string;
  altText?: string;
  imageIndex?: number;

  size?: string;

  color?: string;
}
export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  discountPrice: number;
  sale?: string;
  colors?: [];
  spacification?: specsDetails[];
  posterImageUrl: string | StaticImageData;
  posterImagePublicId: string;
  posterImageAltText?: string;
  hoverImageUrl: string;
  hoverImagePublicId: string;
  productImages: ProductImage[];
  additionalInformation: AdditionalInformation[];
  categoriesId: number;
  categories?: ICategory[];
  subcategories?: ICategory[];
  sections?: [];
  createdAt?: string;
  sale_counter?: string;
  sortedSubcategories?: ICategory[];
  sizes?: Sizes[];
  filter?: Filter[];
  reviews?:any[]
}
interface Filter {
  heading: string;
  additionalInformation: {
    name: string;
    price: string;
  }[];
}
interface Sizes {
    name: string;
    price: string;
}
export interface specsDetails {
  id: number;
  specsDetails: string;
}
export interface IProductAdd {
  name: string;
  price: number;
  description: string;
  stock: number;
  discountPrice: number;
  posterImageUrl: string;
  posterImagePublicId: string;
  hoverImageUrl: string;
  hoverImagePublicId: string;
  productImages: ProductImage[];
  spacification: Array<{ specsDetails: string; _id: string }>;
  sizes?: string[];
  additionalInformation: AdditionalInformation[];
  categories: number[];
  subcategories: number[];
  Meta_Title: string;
  Canonical_Tag: string;
  Meta_Description: string;
  Images_Alt_Text: string;
  sale_counter?: string;
  filters?: any[];
  custom_url?:string
}
export interface ITestimonialCard {
  id: number;
  profile: StaticImageData;
  name: string;
  comment: string;
  reviews: number;
}

export interface ISliderData {
  tabTitle: string;
  cards: IProduct[];
}
export interface IDiscountProducts {
  id: number;
  imageUrl: StaticImageData;
  title: string;
}

export interface ISocialIcons {
  id: number;
  imageUrl: StaticImageData;
  title: string;
}
export interface ISaleItems {
  id: number;
  imageUrl: StaticImageData;
  para: string;
  btnText: string;
  btnUrl: string;
}
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// interface Product {
//   image: string;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   discount?: string;
//   rating: number;
// }

export interface MissionData {
  title: string;
  description: string;
  icon: any;
}
export interface Country {
  code: string;
  name: string;
}

export interface City {
  country: string;
  name: string;
}
export interface Feature {
  link: string;
  image: any;
  title: string;
  rating: number;
  currentPrice: number;
  originalPrice: number;
  discount: number;
}

export interface IProductCategory {
  id: string;
  name: string;
  totalItems?: number;
}

export interface IProductDetail {
  name: string;
}

export interface ITabbyList {
  id: number;
  para: string;
}
export interface ITabbyPayList {
  id: number;
  imageUrl: StaticImageData;
}

export interface ITamaraList {
  id: number;
  title?: string;
  para: string;
}

export interface IMAGE_INTERFACE {
  public_id?: string;
  imageUrl?: string;
  name?: string;
}

export interface ICategory {
  id: number;
  name: string;
  createdAt?: string;
  posterImageUrl?: string;
  posterImagePublicId?: string;
  categories?: any;
  description?: string;
  short_description?: string;
  Images_Alt_Text?: string;
  Meta_Title?: string;
  Meta_Description?: string;
  Canonical_Tag?: string;
  subcategories?: ICategory[];
}
// Timer slider data type
export type TSliderItem = {
  id: number;
  imageUrl: StaticImageData;
  productName: string;
  price: string;
  discountText: string;
  dealText: string;
  timer: string;
  productId: number;
  buttonText: string;
};
export interface USRPROPS {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  error: string | null | undefined;
  loading: boolean | null | undefined;
  inputFields: any;
  buttonTitle: string;
  title?: string;
  descrition?: string;
  InstructionText?: string;
  routingText?: string;
  navigationLink?: string;
  navigationTxt?: string;
  SelectComonent?: any;
  setadminType?: React.Dispatch<SetStateAction<string | undefined>>;
  adminType?: string | undefined;
}

export interface IReview {
  id: number;
  name: string;
  email: string;
  review: string;
  star: number;
  createdAt: string;
  productId: number;
  userProfileImg?: string;
}

export type IProductWithoutId = Omit<IProduct, 'id'>;

export interface AdditionalInformation {
  key?: string;
  value?: string;
  colors?: string[];
  dimension?: string[];
}

export interface IProductCategories {
  id: string;
  name: string;
  subcategories?: ICategory[];
}

export interface IOrder {
  id: number;
  orderId: string;
  user_email: string;
  address: string;
  phoneNumber?: string;
  products: IOrderProduct[];
  paymentStatus: IPaymentStatus;
  createdAt: string;
}

export interface IOrderProduct {
  id: number;
  orderId: string;
  createdAt: string;
  quantity: number;
  saleRecordId: number;
  productData: IProduct;
}

export interface IPaymentStatus {
  checkoutData: string;
  checkoutStatus: boolean;
  paymentStatus: boolean;
}


export interface RECORDS {
  totalAdmins: string;
  totalCategories: string;
  totalProducts: string;
  totalUsers: string;
  totalProfit: string;
  totalSales: string;
  totalRevenue: string;
  total_sub_categories: string;
  Total_abandant_order: string;
}