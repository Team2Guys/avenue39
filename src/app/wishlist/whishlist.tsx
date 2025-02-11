'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import TopHero from '@/components/top-hero';
import { wishbredcrumbs } from '@/data/data';
import Container from '@/components/ui/Container';
import Counter from '@/components/Counter/Counter';
import { message } from 'antd';
import { addItem } from '@cartSlice/index';
import { CartItem } from '@cartSlice/types';
import { openDrawer } from '@/redux/slices/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { IoIosHeartEmpty } from 'react-icons/io';
import Link from 'next/link';
import { generateSlug } from '@/config';
import { MdModeEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { State } from '@/redux/store';
import { ChangeUrlHandler } from '@/config/fetch';
interface IProduct {
  id: string;
  name: string;
  price: number;
  discountPrice?: number | any;
  posterImageUrl: string;
  count: number;
  stock: number;
}

const WishlistPage = () => {
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State) => state.cart.items);
  const [wishlist, setWishlist] = useState<IProduct[]>([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(storedWishlist);
  }, []);

  const handleCountChange = (id: string, newCount: number) => {
    const updatedWishlist = wishlist.map((item) => {
      if (item.id === id) {
        if (newCount > (item.stock || 0)) {
          message.error(
            `Only ${item.stock} items are in stock. Please reduce the quantity.`,
          );
          return item;
        }
        return { ...item, count: newCount };
      }
      return item;
    });

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };
  const handleDeleteItem = (id: string) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    message.success('Product removed from Wishlist successfully!');
    window.dispatchEvent(new Event('WishlistChanged'));
  };
  const handleAddToCart = (product: IProduct) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    //@ts-ignore
    const existingItem = cartItems.find((item: any) => item.id === product.id);
    if (existingItem) {
      const totalQuantity = existingItem.quantity + product.count;
      if (totalQuantity > (product.stock || 0)) {
        message.error(
          `Product already exists in the cart. You cannot add more than ${product.stock} units. Please reduce the quantity.`,
        );
        return;
      }
      const updatedCart = cart.map((item: IProduct) =>
        item.id === product.id
          ? {
            ...item,
            count: totalQuantity,
            totalPrice:
              (product.discountPrice || product.price) * totalQuantity,
          }
          : item,
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cartChanged'));
      message.success('Quantity updated in the cart!');
    } else {
      const totalQuantityInCart = cart.reduce(
        (accum: number, item: IProduct) => {
          if (item.id === product.id) {
            return accum + item.count;
          }
          return accum;
        },
        0,
      );
      if (totalQuantityInCart + product.count > (product.stock || 0)) {
        message.error(
          `You cannot add more of this product. Total stock is ${product.stock}, and you already have ${totalQuantityInCart} in your cart.`,
        );
        return;
      }
      if (product.count > (product.stock || 0)) {
        message.error(
          `Cannot add to cart. Total stock for this product is ${product.stock}.`,
        );
        return;
      }
      const newItem = { ...product, count: product.count };
      cart.push(newItem);
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartChanged'));
      message.success('Product added to Cart successfully!');
    }
    const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event('WishlistChanged'));
    //@ts-ignore
    const itemToAdd: CartItem = {
      ...product,
      quantity: product.count,
    };
    dispatch(addItem(itemToAdd));
    dispatch(openDrawer());
  };

  return (
    <>
      <TopHero breadcrumbs={wishbredcrumbs} />
      {wishlist.length > 0 ? (
        wishlist.map((product, index) => (
          <Container
            className="grid grid-cols-12 gap-3  bg-white shadow my-5 items-center mt-2 py-2"
            key={index}
          >
            <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-5 2xl:col-span-6">
              <div className="flex items-center gap-3">
                <Link href={ChangeUrlHandler(product as any)}>
                  <Image
                    className="w-[120px] h-[120px] rounded-md"
                    width={300}
                    height={300}
                    src={product.posterImageUrl}
                    alt={product.name}
                  />
                </Link>
                <div className="space-y-2 py-2 md:py-0">
                  <Link href={ChangeUrlHandler(product as any)}>
                    <span className="font-medium text-14 lg:text-16">
                      {product.name}
                    </span>
                  </Link>
                  <div className="block md:hidden space-y-2">
                    <div className=" flex items-center gap-4 ">
                      <p className="font-medium md:font-bold text-12 lg:text-xl xl:text-2xl">
                        AED{' '}
                        <span>
                          {Number(product.discountPrice) > 0 ? product.discountPrice : product.price}
                        </span>
                      </p>
                      {Number(product.discountPrice) > 0 && Number(product.price) > Number(product.discountPrice) && (
                        <p className="font-normal md:font-bold text-10 lg:text-md xl:text-lg line-through text-lightforeground">
                          AED <span>{product.price}</span>
                        </p>
                      )}
                      <div className="flex items-center gap-4">
                        <Link href={`/product/${generateSlug(product.name)}`}>
                          <MdModeEdit className="cursor-pointer" size={20} />
                        </Link>
                        <FaTrash
                          className="cursor-pointer"
                          size={15}
                          onClick={() => handleDeleteItem(product.id)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                      <Counter
                        count={product.count}
                        onChangeCount={(newCount) =>
                          handleCountChange(product.id, newCount)
                        }
                      />
                      <button
                        className="bg-main px-2 lg:px-4 py-2 rounded-md text-white w-fit"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block md:col-span-3 lg:col-span-3 xl:col-span-2 2xl:col-span-2">
              <Counter
                count={product.count}
                onChangeCount={(newCount) =>
                  handleCountChange(product.id, newCount)
                }
              />
            </div>
            <div className="hidden md:block md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
              <div className="flex items-center justify-evenly gap-1 lg:gap-4">
                <div className="flex items-center  gap-1 lg:gap-4">
                  <p className="font-medium md:font-bold text-12 lg:text-xl xl:text-2xl">
                    AED{' '}
                    <span>
                      {product.discountPrice
                        ? product.discountPrice
                        : product.price}
                    </span>
                  </p>
                  {product.discountPrice > 0 && (
                    <p className="font-normal md:font-bold text-10 lg:text-md xl:text-lg line-through text-lightforeground">
                      AED <span>{product.price}</span>
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <Link href={`/product/${generateSlug(product.name)}`}>
                    <MdModeEdit className="cursor-pointer" size={20} />
                  </Link>
                  <FaTrash
                    className="cursor-pointer"
                    size={15}
                    onClick={() => handleDeleteItem(product.id)}
                  />
                </div>
              </div>
            </div>
            <div className="hidden md:block md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-1">
              <button
                className="bg-main px-2 lg:px-4 py-2 rounded-md text-white w-fit"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </Container>
        ))
      ) : (
        <div className="flex justify-center items-center w-full h-96">
          <div className="flex flex-col gap-4 items-center">
            <IoIosHeartEmpty size={100} className="text-black" />
            <p className="font-medium text-2xl">No Items In Wishlist</p>
            <div className="">
              <Link
                href="/new-arrivals"
                className="bg-[#F6F6F6] px-6 flex justify-center items-center  hover:border-[#666666] border-[#F6F6F6] text-[#666666] h-[73px]"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WishlistPage;
