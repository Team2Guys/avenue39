'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import TopHero from '@/components/top-hero';
import { wishbredcrumbs } from '@/data/data';
import Container from '@/components/ui/Container';
import { addItem, variationProductImage } from '@cartSlice/index';
import { CartItem } from '@cartSlice/types';
import { openDrawer } from '@/redux/slices/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { IoIosHeartEmpty } from 'react-icons/io';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';
import { State } from '@/redux/store';
import { ChangeUrlHandler } from '@/config/fetch';
import { toast } from 'react-toastify';
import Counter from '@/components/counter';
import { getProductStock } from '@/config';


const WishlistPage = () => {
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State) => state.cart.items);
  const [wishlist, setWishlist] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(storedWishlist);
  }, []);
  // console.log(wishlist, 'wishlist')

  const handleDeleteItem = (product: any) => {
    const updatedWishlist = wishlist.filter((item) =>
      !(item.id === product.id &&
        item.selectedSize?.name === product.selectedSize?.name &&
        item.selectedfilter?.name === product.selectedfilter?.name)
    );

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event('WishlistChanged'));
  };

  const updateProductQuantity = (item: CartItem) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.map((wishlistItem) => {
        if (
          wishlistItem.id === item.id &&
          wishlistItem.selectedSize?.name === item.selectedSize?.name &&
          wishlistItem.selectedfilter?.name === item.selectedfilter?.name
        ) {
          return { ...wishlistItem, quantity: item.quantity };
        }
        return wishlistItem;
      });

      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
    window.dispatchEvent(new Event('WishlistChanged'));
    const variationQuantity = getProductStock({ product: item });
    if (item.quantity > variationQuantity) {
      toast.error('Insufficient stock. Please reduce quantity.');
    }
  };


  const handleAddToCart = (product: any) => {
    console.log(product, 'product');
    const itemToAdd: any = {
      ...product,
      quantity: product.quantity,
      selectedSize: product?.selectedSize,
      selectedfilter: product?.selectedfilter,
    };

    const existingCartItem = cartItems.find(
      (item: any) =>
        item.id === itemToAdd?.id &&
        item.selectedSize?.name === itemToAdd.selectedSize?.name &&
        item.selectedfilter?.name === itemToAdd.selectedfilter?.name,
    );

    if (!existingCartItem) {
      dispatch(addItem(itemToAdd));
      const updatedWishlist = wishlist.filter((item) => !(item.id === product.id && item.selectedSize?.name === product.selectedSize?.name && item.selectedfilter?.name === product.selectedfilter?.name));
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      window.dispatchEvent(new Event('WishlistChanged'));
      return
    }


    const totalStock = getProductStock({ product: itemToAdd });

    const currentQuantity = existingCartItem?.quantity || 0;
    const newQuantity = currentQuantity + itemToAdd.quantity;

    if (newQuantity > totalStock) {
      toast.error(
        `Only ${totalStock} items are in stock. You cannot add more than that.`,
      );
      return;
    }

    dispatch(addItem(itemToAdd));
    dispatch(openDrawer());

    // **Remove item from wishlist after adding to cart**
    const updatedWishlist = wishlist.filter((item) =>
      !(item.id === itemToAdd.id &&
        item.selectedSize?.name === itemToAdd.selectedSize?.name &&
        item.selectedfilter?.name === itemToAdd.selectedfilter?.name) // Remove matching item
    );

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event('WishlistChanged'));

    toast.success('Product moved to Cart successfully!');
  };

  console.log(wishlist, 'wishlist');
  return (
    <>
      <TopHero breadcrumbs={wishbredcrumbs} />
      {wishlist.length > 0 ? (
        wishlist.map((product: any, index) => (
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
                    src={variationProductImage(product as any)}
                    alt={product.name}
                  />
                </Link>
                <div className="space-y-2 py-2 md:py-0">
                  <div className='flex flex-col gap-1'>
                    <Link href={ChangeUrlHandler(product as any)}>
                      <span className="text-16 xl:text-18">{product.name}</span>
                    </Link>
                    {(product.selectedfilter || product.selectedSize) &&
                      <>
                        <div className='flex items-center gap-1 text-13'>
                          <span className='capitalize'>{product.filter?.at(0)?.heading}</span>
                          <span className='capitalize'>{product.selectedfilter?.name}</span>
                        </div>
                        <span className='text-13'>{product.selectedSize?.name}</span>
                      </>
                    }
                  </div>
                  <div className="block md:hidden space-y-2">
                    <div className=" flex items-center gap-4 ">
                      <p className="font-medium md:font-bold text-12 lg:text-xl xl:text-2xl">
                        AED{' '}
                        <span>
                          {product.selectedSize ? product.selectedSize?.discountPrice > 0 ? product.selectedSize?.discountPrice : product.selectedSize.price : product.selectedfilter ? product.selectedfilter?.discountPrice > 0 ? product.selectedfilter?.discountPrice : product.selectedfilter.price : product.discountPrice > 0 ? product.discountPrice : product.price}
                        </span>
                      </p>
                      {(product.selectedSize?.discountPrice > 0 || product.selectedfilter?.discountPrice > 0 ||
                        product.discountPrice > 0) ? (
                        <p className="font-normal md:font-bold text-10 lg:text-md xl:text-lg line-through text-lightforeground">
                          AED{' '}
                          <span>
                            {product.selectedSize ? product.selectedSize.price : product.selectedfilter ? product.selectedfilter.price : product.price}
                          </span>
                        </p>
                      ) : null}

                      <div className="flex items-center gap-4">
                        <FaTrash
                          className="cursor-pointer"
                          size={15}
                          onClick={() => handleDeleteItem(product)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center ">
                      <Counter
                        count={product.quantity}
                        stock={getProductStock({ product: product })}
                        onIncrement={() => {
                          const updatedItem = { ...product, quantity: product.quantity + 1 };
                          updateProductQuantity(updatedItem);
                        }}
                        onDecrement={() => {
                          const updatedItem = { ...product, quantity: product.quantity - 1 };
                          updateProductQuantity(updatedItem);
                        }}
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
                count={product.quantity}
                stock={getProductStock({ product: product })}
                onIncrement={() => {
                  const updatedItem = { ...product, quantity: product.quantity + 1 };
                  updateProductQuantity(updatedItem);
                }}
                onDecrement={() => {
                  const updatedItem = { ...product, quantity: product.quantity - 1 };
                  updateProductQuantity(updatedItem);
                }}
              />

            </div>
            <div className="hidden md:block md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
              <div className="flex items-center justify-evenly gap-1 lg:gap-4">
                <div className="flex items-center  gap-1 lg:gap-4">
                  <p className="font-medium md:font-bold text-12 lg:text-xl xl:text-2xl">
                    <span>
                      AED{' '}
                      {
                        product.selectedSize ? product.selectedSize?.discountPrice > 0 ? product.selectedSize?.discountPrice : product.selectedSize.price : product.selectedfilter ? product.selectedfilter?.discountPrice > 0 ? product.selectedfilter?.discountPrice : product.selectedfilter.price : product.discountPrice > 0 ? product.discountPrice : product.price
                      }
                    </span>

                  </p>
                  {(product.selectedSize?.discountPrice > 0 || product.selectedfilter?.discountPrice > 0 ||
                    product.discountPrice > 0) && (
                      <p className="font-normal md:font-bold text-10 lg:text-md xl:text-lg line-through text-lightforeground">
                        AED{' '}
                        <span>
                          {product.selectedSize ? product.selectedSize.price : product.selectedfilter ? product.selectedfilter.price : product.price}
                        </span>
                      </p>
                    )}
                </div>
                <div className="flex items-center gap-4">
                  <FaTrash
                    className="cursor-pointer"
                    size={15}
                    onClick={() => handleDeleteItem(product)}
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
