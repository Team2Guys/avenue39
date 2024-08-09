import { ITypo } from '@/types/types';
import React from 'react';
import { Open_Sans } from 'next/font/google';

const h1 = Open_Sans({
  weight: '400',
  subsets: ['latin-ext'],
});
const productName = Open_Sans({
  weight: '700',
  subsets: ['latin-ext'],
});
const normal = Open_Sans({
  weight: '500',
  subsets: ['latin-ext'],
});
const h1bold = Open_Sans({
  weight: '700',
  subsets: ['latin-ext'],
});
const Para14 = Open_Sans({
  weight: '400',
  subsets: ['latin-ext'],
});

export function H1({ children, className }: ITypo) {
  return (
    <div
      className={`h-[26px] w-[69px] ${className}  ${h1.className} text-justify text-red tex`}
    >
      {children}
    </div>
  );
}
export function ProductName({ children, className }: ITypo) {
  return (
    <div
      className={`${productName.className} text-[26px] text-justify text-primary  ${className}`}
    >
      {children}
    </div>
  );
}
export function ProductPrice({ children, className }: ITypo) {
  return (
    <div
      className={`${productName.className} text-[20px] text-justify text-primary  ${className}`}
    >
      {children}
    </div>
  );
}
export function NormalText({ children, className }: ITypo) {
  return (
    <div
      className={`${normal.className} text-[20px] text-justify text-primary  ${className}`}
    >
      {children}
    </div>
  );
}
export function H1Bold({ children, className }: ITypo) {
  return (
    <div
      className={`h-[26px] w-[69px]  ${className}  ${h1bold.className} text-justify text-primary`}
    >
      {children}
    </div>
  );
}
export function P14({ children, className }: ITypo) {
  return (
    <div
      className={`text-[10px] lg:text-[12px] xl:text-[14px] ${className}  ${Para14.className}`}
    >
      {children}
    </div>
  );
}
