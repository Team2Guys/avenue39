import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './types';
import { message } from 'antd';

interface CartState {
  items: CartItem[];
}
const initialState: CartState = {
  items: [],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) =>
          i.id === item.id &&
          i.selectedSize?.name === item.selectedSize?.name &&
          i.selectedfilter?.name === item.selectedfilter?.name
      );

      const getItemPrice = (item: CartItem) => {
        let price;
        if (item.selectedSize) {
          price = Number(item.selectedSize.discountPrice)
            ? Number(item.selectedSize.discountPrice)
            : Number(item.selectedSize.price);
        } else if (item.selectedfilter) {
          price = Number(item.selectedfilter.discountPrice)
            ? Number(item.selectedfilter.discountPrice)
            : Number(item.selectedfilter.price);
        } else {
          price = item.discountPrice ? item.discountPrice : item.price;
        }
        return price;
      };

      if (existingItem) {
        const newQuantity = existingItem.quantity + item.quantity;
        if (newQuantity > (item.stock || 0)) {
          message.error(
            `Only ${item?.stock} items are in stock. You cannot add more.`
          );
          return;
        }
        existingItem.quantity = newQuantity;
      } else {
        if (item.quantity > (item.stock || 0)) {
          message.error(`Cannot add more than ${item.stock} items to the cart.`);
          return;
        }
        const price = getItemPrice(item);
        const discountPrice = price;
        state.items.push({
          ...item,
          price,
          discountPrice,
        });
      }
    },

    removeItem: (state, action: PayloadAction<CartItem>) => {
      const { id, selectedSize, selectedfilter } = action.payload;
      if (selectedfilter && !selectedSize) {
        state.items = state.items.filter(
          (item) => !(item.id === id && (item.selectedfilter?.name === selectedfilter.name && item.selectedSize === null))
        );
      } else if (selectedfilter && selectedSize) {
        state.items = state.items.filter(
          (item) => !(item.id === id && item.selectedSize?.name === selectedSize?.name && item.selectedfilter?.name === selectedfilter?.name)
        );
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      }
    },


    updateItemQuantity: (
      state,
      action: PayloadAction<{
        id: number;
        quantity: number;
        selectedSize?: { name: string; price: string; stock?: number };
        selectedfilter?: { name: string; price: string; stock?: number };
      }>
    ) => {
      const { id, quantity, selectedSize, selectedfilter } = action.payload;
      const item = state.items.find(
        (i) =>
          i.id === id &&
          (selectedSize ? i.selectedSize?.name === selectedSize.name : true) &&
          (selectedfilter ? i.selectedfilter?.name === selectedfilter.name : true)
      );

      if (item) {
        item.quantity = quantity;
      }
    },


  },
});



export const selectTotalPrice = (state: CartState): number => {

  return state.items.reduce((total, item) => {
    // let price;
    // if (item.selectedSize) {
    //   price = Number(item.selectedSize.discountPrice) ? Number(item.selectedSize.discountPrice) : Number(item.selectedSize.price);
    // }
    // else if (item.selectedfilter) {

    //   price = Number(item.selectedfilter.discountPrice) ? Number(item.selectedfilter.discountPrice) : Number(item.selectedfilter.price);
    // }
    // else {
    //   price = item.discountPrice ? item.discountPrice : item.price;
    // }
    const price = item.discountPrice ? item.discountPrice : item.price;
    return total + price * item.quantity;

  }, 0);
};

export const totalProductsInCart = (state: CartState): number => {
  return state.items.reduce((total, item) => total + item.quantity, 0);
};

export const variationProductImage = (item: CartItem) => {
  const filterImage = item.productImages.find((image) => image.color === item.selectedfilter?.name);
  const sizeImage = item.productImages.find((image) => image.color === item.selectedSize?.name);
  if (sizeImage && filterImage) {
    return sizeImage.imageUrl;
  } else if (filterImage && !sizeImage) {
    return filterImage.imageUrl;
  } else {
    return item.posterImageUrl;
  }
}
export const { addItem, removeItem, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
