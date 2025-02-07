import { ITypo } from '@/types/types';
import React from 'react';

export function H1({ children, className }: ITypo) {
  return (
    <div
      className={`h-[26px] w-[69px] ${className}   text-justify text-red tex`}
    >
      {children}
    </div>
  );
}
export function ProductName({ children, className }: ITypo) {
  return (
    <div
      className={`$ font-helvetica text-bold text-[26px] text-primary  ${className}`}
    >
      {children}
    </div>
  );
}

export function ProductPrice({ children, className }: ITypo) {
  return (
    <div
      className={` font-helvetica text-[20px] text-justify text-primary  ${className}`}
    >
      {children}
    </div>
  );
}
export function NormalText({ children, className }: any) {
  return (
    <div className={` text-[20px] text-justify text-primary  ${className}`}>
      {children}
    </div>
  );
}
export function H1Bold({ children, className }: ITypo) {
  return (
    <div
      className={`h-[26px] w-[69px]  ${className} text-justify text-primary`}
    >
      {children}
    </div>
  );
}
export function P14({ children, className }: ITypo) {
  return (
    <div
      className={`text-[10px] lg:text-[12px] xl:text-[14px] font-semibold hover:underline ${className} `}
    >
      {children}
    </div>
  );
}
