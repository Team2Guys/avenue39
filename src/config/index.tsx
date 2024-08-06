'use client';
import { selectTotalPrice, totalProductsInCart } from '@/redux/slices/cart';
import { State } from '@/redux/store';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

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
