import { IProduct } from '@/types/types';

export interface CartItem extends IProduct {
  quantity: number;
  selectedSize?: CartSize | null;
  selectedfilter?: CartSize | null;
}

export interface CartState {
  items: CartItem[];
}

export interface CartSize {
  name: string,
  price: string,
  discountPrice?: string,
  stock?: number
  filterName?: string;
}
