import { AdditionalInformation } from '@/data/products';
import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';

export interface IHome {}
export interface INav {}

export interface ITypo {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
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

// export type TSliderSettings = {
//   dots: boolean;
//   infinite: boolean;
//   speed: number;
//   slidesToShow: number;
//   slidesToScroll: number;
// };

export type TSlide = {
  image: any;
  bannerHeading: string;
  bannerSubHeading: string;
  text: string;
  buttonText: string;
  buttonLink: string;
};

export interface IServiceItem {
  id: number;
  icon: StaticImageData;
  title: string;
}
export interface MenuItem {
  title: string;
  icon: string;
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

export interface ITestimonialCard {
  id: number;
  profile: StaticImageData;
  name: string;
  comment: string;
  reviews: number;
}

export interface ISliderData {
  tabTitle: string;
  cards: ICard[];
}
export interface IDiscountProducts {
  id: number;
  imageUrl: StaticImageData;
  title: string;
}

export interface IChairProducts {
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

interface TopHeroProps {
  title?: string;
  breadcrumbs: BreadcrumbItem[];
}
interface Product {
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
}

interface SideCardProps {
  data: Product[];
}
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
  image: any;
  title: string;
  rating: number;
  currentPrice: number;
  originalPrice: number;
  discount: number;
}

export interface IProductCategories {
  id: number;
  title: string;
  totalItems: number;
}

export interface IProductDetail {
  id: number;
}

export interface ITabbyList{
  id: number;
  para: string;
}
export interface ITabbyPayList{
  id: number;
  imageUrl: StaticImageData;
}

export interface ITamaraList{
  id: number;
  title?: string;
  para: string;
}

export interface IMAGE_INTERFACE {
  public_id?: string;
  imageUrl?: string;
  name?: string;
}