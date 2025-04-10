import { StaticImageData } from 'next/image';
import React, { FormEventHandler, ReactNode, SetStateAction } from 'react';
import { IProduct } from './prod';

export interface ITypo {
  children: any;
  className?: string;
  onClick?: () => void;
}


export interface IContainer {
  children: ReactNode;
  className?: string;
}

export interface IServiceItem {
  id: number;
  icon: StaticImageData;
  title: string;
  description?: string
}
interface MenuItem {
  categoryId?: number;
  title: string;
  link: string;
}

export interface MenuData {
  [key: string]: MenuItem[];
}

export interface City {
  country: string;
  name: string;
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
export interface IOrder {
  id: number;
  orderId: string;
  user_email: string;
  address: string;
  phoneNumber?: string;
  products: IOrderProduct[];
  paymentStatus: IPaymentStatus;
  createdAt: string;
  firstName?: string;
  lastName?: string;
}

export interface IOrderProduct {
  id: number;
  orderId: string;
  createdAt: string;
  quantity: number;
  saleRecordId: number;
  productData: IProduct;
  color?: string;
  selectedSize: Array<{ filterName?: string | undefined}>

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
