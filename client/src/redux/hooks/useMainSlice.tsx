'use client';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { MainState } from '@mainSlice/types';
import { State } from '@redux/store';
// eslint-disable-next-line no-unused-vars
type UseMainSlice = <T = unknown>(selector: (state: MainState) => T) => T;

const main = (state: State) => state.main;

export const useMainSlice: UseMainSlice = (selector) =>
  useSelector(createSelector(main, selector));
