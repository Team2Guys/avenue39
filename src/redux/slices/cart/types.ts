import { ICard } from '@/types/types';

export interface CartItem extends ICard {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
