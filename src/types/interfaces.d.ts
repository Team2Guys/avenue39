import React, { FormEventHandler, SetStateAction } from 'react';
import { ICategory, Shipping } from './types';
import { CartItem } from '@/redux/slices/cart/types';
import { IProduct, ProductImage } from './prod';

React.FormEvent<HTMLFormElement>;
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

export interface PRODUCTCARDPROPS {
  ImgUrl: string;
  title: string;
  strikThroughPrice: string;
  price: string;
  width?: any;
  height?: any;
}
export interface TCategories {
  topText: string;
  heading: string;
  subHeading?: string; // Optional
  paragraph: string;
  LeftSideImage: string[];
  rightSideImages?: string[]; // Optional
}
export interface Product {
  name: string;
  description: string;
  price: string;
  category: string;
  colors: { colorName: string }[];
  totalStockQuantity: number;
  variantStockQuantities: { variant: string; quantity: number }[];
  modelDetails: { name: string; detail: string }[];
  spacification: { specsDetails: string }[];
  discountPrice: string;
  category: string;
  shippingOptions?: Shipping[];
}

export interface Category {
  name: string;
  description?: string;
  short_description?: string;
  meta_description?: string;
  meta_title?: string;
  canonical_tag?: string;
  images_alt_text?: string;
  posterImageUrl?: IMAGE_INTERFACE;
  custom_url?:string
}
export interface SubCategory {
  name: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  canonical_tag?: string;
  images_alt_text?: string;
  categoriesId: number[];
  custom_url? :string
}

interface CloudinaryImage {
  public_id: string | undefined;
  imageUrl: string | undefined;
  _id: string | undefined;
}

export interface IMAGE_INTERFACE {
  public_id?: string;
  imageUrl?: string;
  name?: string;
}

interface Images {
  posterImageUrl: string | undefined;
  hoverImageUrl: string | undefined;
  imageUrl: CloudinaryImage[];
}

export interface ProductWithImages extends Product, Images {}

export interface FormValues {
  name: string;
  description: string;
  salePrice: string;
  purchasePrice: string;
  discountPrice: string;
  starRating: string;
  reviews: string;
  colors: { colorName: string }[];
  modelDetails: { name: string; detail: string }[];
  spacification: { specsDetails: string }[];
  sizes: string[];
  category: string;
  code: string;
  totalStockQuantity: number;
  variantStockQuantities: { variant: string; quantity: number }[];
  price?: string;
  additionalInformation?: string;
}

interface Color {
  colorName?: string;
}
interface ModelDetail {
  name?: string;
  detail?: string;
}

interface Specification {
  specsDetails?: string;
}
interface sizes {
  sizesDetails?: string;
}

interface PRODUCTS_TYPES {
  _id?: any;
  name: string;
  posterImageUrl?: Image;
  hoverImageUrl?: Image;
  description?: string;
  salePrice?: number;
  purchasePrice?: number;
  category?: string;
  imageUrl?: IMAGE_INTERFACE[];
  discountPrice?: any;
  colors?: Color[];
  modelDetails?: ModelDetail[];
  spacification?: Specification[];
  createdAt: Date;
  updatedAt: Date;
  starRating?: string;
  reviews?: string;
  totalStockQuantity?: number;
  sizes?: sizes[];
  isFeatured?: any;
  price?: number;
  count?: any;
  length?: any;
  totalPrice?: any;
}

export default PRODUCTS_TYPES;

export interface ADDPRODUCTFORMPROPS {
  setselecteMenu: any;
  EditInitialValues?: any | undefined;
  EditProductValue?: Product | undefined;
  setEditProduct?: any;
  subCategories?: ICategory[];
  categoriesList?: ICategory[];
}

export interface Categories_Types {
  posterImageUrl: {
    public_id: string;
    imageUrl: string;
  };
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: any;
}

export interface product {
  posterImageUrl: { public_id: string; imageUrl: string; altText: string };
  hoverImageUrl: { public_id: string; imageUrl: string; altText: string };
  _id: string;
  name: string;
  description: string;
  salePrice: number;
  purchasePrice: number;
  category: string;
  imageUrl: Array<{
    public_id: string;
    imageUrl: string;
    _id: string;
    altText: string;
  }>;
  discountPrice: number;
  colors: Array<{ colorName: string; _id: string }>;
  modelDetails: Array<{ name: string; detail: string; _id: string }>;
  spacification: Array<{ specsDetails: string; _id: string }>;
  createdAt: string;
  starRating: string;
  reviews: string;
  productImages?: any;
  additionalInformation?: any;
  sizes: Array<string>;
  stock?: string;

  updatedAt: string;

  price: string;
  __v: number;
  code: string;
  Meta_Title: string;
  Meta_Description: string;
  URL: string;
  Canonical_Tag: string;
  Images_Alt_Text: string;
  Og_title: string;
  Og_description: string;
  Og_Image: string;
  OgUrl: string;
}

/* eslint-disable */
declare module 'react-qr-scanner' {
  import { Component } from 'react';
  interface QrReaderProps {
    delay?: number;
    onError?: (error: any) => void;
    onScan?: (data: string | null) => void;
    style?: React.CSSProperties;
  }
  class QrReader extends Component<QrReaderProps, {}> {}
  export default QrReader;
}
/* eslint-enable */

export interface IHomeProducts {
  name: string;
  products: IProductsImage[];
}

export interface IProductsImage {
  name: string;
  posterImageUrl: string;
}

export interface FooterItem {
  bgClass: string;
  text: string;
  overlayText: string[];
  showImage: boolean;
  imageSrc?: string;
}

export interface PotraitCardProps {
    card: IProduct,
    finalUrl: string,
    handleAddToWishlist: any,
    displayName: string | undefined,
    averageRating: number | undefined,
    handleEventProbation: any,
    handleAddToCard: any,
    itemToAdd: CartItem | any,
    uniqueSizes: any,
    slider: boolean | undefined,
    isLandscape: boolean | undefined,
    cardImageHeight: string | undefined,
    productImage?: ProductImage,
    displayTag: any,
    isOutStock: boolean,
    isModel: boolean | undefined,
    className: string | undefined,
    skeletonHeight: string | undefined,
    isHomepage: boolean | undefined,
    calculateHeight: string | undefined,
    portSpace: string | undefined,
    accessoriesSlider: boolean | undefined,
    fill?: boolean,
    isAccessory?: boolean,
}

export interface CardProps {
  card: IProduct;
  isModel?: boolean;
  className?: string;
  skeletonHeight?: string;
  isLoading?: boolean;
  category?: boolean;
  cardImageHeight?: string;
  slider?: boolean;
  isHomepage?: boolean;
  calculateHeight?: string;
  portSpace?: string;
  productImages?: ProductImage;
  redirect?: string;
  SubcategoryName?: ICategory;
  mainCatgory?: string;
  cardLayout?: string;
  accessoriesSlider?: boolean;
  fill?: boolean;
  isLandscape?: boolean;
  isAccessory?: boolean;
}