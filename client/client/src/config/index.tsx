'use client';
import { selectTotalPrice, totalProductsInCart } from '@/redux/slices/cart';
import { State } from '@/redux/store';
import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { GetServerSideProps } from 'next';

export const SubTotal = () => {
  const totalPrice = useSelector((state: State) =>
    selectTotalPrice(state.cart),
  );

  return <Fragment>{totalPrice}</Fragment>;
};

export const TotalProducts = () => {
  const totalPrice = useSelector((state: State) =>
    totalProductsInCart(state.cart),
  );
  return <Fragment>{totalPrice}</Fragment>;
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const productsRes = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-all`,
//   );
//   const products = await productsRes.json();
// console.log(products, "products")
//   return {
//     props: {
//       products,
//     },
//   };
// };
