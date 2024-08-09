import { ICard, IProduct } from '@/types/types';

export interface CartItem extends IProduct {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
