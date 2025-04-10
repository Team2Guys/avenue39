import { ITypo } from '@/types/types';
import React from 'react';

export function ProductName({ children, className }: ITypo) {
  return (
    <div
      className={`font-helvetica text-bold text-[26px] text-primary  ${className}`}
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

