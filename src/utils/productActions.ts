// utils/productActions.ts
import { toast } from 'react-toastify';
import { MouseEvent } from 'react';
import { addItem } from '@/redux/slices/cart';
import { openDrawer } from '@/redux/slices/drawer';
import { AppDispatch } from '@/redux/store';

/**
 * Defer non-urgent tasks to avoid blocking the main thread
 */
const runWhenIdle = (cb: () => void) => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    (window as any).requestIdleCallback(cb);
  } else {
    setTimeout(cb, 1); // Fallback for unsupported browsers
  }
};

const makeKey = (item: any) =>
  `${item.id}-${item.selectedSize?.name}-${item.selectedfilter?.name}`;

/**
 * Add item to cart (client dispatch logic)
 */
export const handleAddToCartCard = (
  e: MouseEvent<HTMLElement>,
  card: any,
  itemToAdd: any,
  cartItems: any[],
  totalStock: number,
  dispatch: AppDispatch
) => {
  e.stopPropagation();
  localStorage.removeItem('buyNowProduct');

  const exists = cartItems.find(
    (item) =>
      item.id === card?.id &&
      item.selectedSize?.name === itemToAdd.selectedSize?.name &&
      item.selectedfilter?.name === itemToAdd.selectedfilter?.name
  );

  if (!exists) {
    dispatch(addItem(itemToAdd));
    dispatch(openDrawer());
    return;
  }

  const newQty = (exists.quantity || 0) + 1;
  if (newQty > totalStock) {
    toast.error(`Only ${card?.stock} items are in stock. You cannot add more than that.`);
    return;
  }

  dispatch(addItem(itemToAdd));
  dispatch(openDrawer());
};

/**
 * Add item to wishlist (localStorage-based)
 */
export const handleAddToWishlistCard = (
  e: MouseEvent<HTMLElement>,
  card: any,
  itemToAdd: any,
  totalStock: number
) => {
  e.stopPropagation();

  runWhenIdle(() => {
    let wishlist: any[] = [];

    try {
      const stored = localStorage.getItem('wishlist');
      wishlist = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(wishlist)) wishlist = [];
    } catch {
      wishlist = [];
    }

    const key = makeKey(itemToAdd);
    const wishlistMap = new Map(wishlist.map((item: any) => [makeKey(item), item]));
    const existing = wishlistMap.get(key);

    if (!existing) {
      wishlistMap.set(key, itemToAdd);
      toast.success('Product added to Wishlist!');
    } else {
      const newQty = (existing.quantity || 0) + 1;
      if (newQty > totalStock) {
        toast.error(`Only ${card?.stock} items are in stock.`);
        return;
      }

      wishlistMap.set(key, { ...existing, quantity: newQty });
      toast.success('Product quantity updated in Wishlist.');
    }

    const updatedWishlist = Array.from(wishlistMap.values());
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event('WishlistChanged'));
  });
};
