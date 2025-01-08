'use client';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { State } from '@redux/store';
import { ProductState } from '../slices/main/types';
// eslint-disable-next-line no-unused-vars
type UseProductSlice = <T = unknown>(selector: (state: ProductState) => T) => T;

const products = (state: State) => state.products;

export const useProductSlice: UseProductSlice = (selector) =>
  useSelector(createSelector(products, selector));
