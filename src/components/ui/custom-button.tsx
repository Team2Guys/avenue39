import React, { ReactNode } from 'react';
import { Button } from './button';
interface ICustomButtom {
  variant: 'light' | 'dark';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}
function CustomButtom({
  variant,
  children,
  className,
  onClick,
}: ICustomButtom) {
  return (
    <Button
      onClick={onClick}
      className={` w-full rounded-none uppercase py-7  ${variant == 'light' ? 'bg-[#EBEBEB] text-[#000000] hover:bg-[#e4e4e4ce]' : 'bg-[#000000] text-[#FFFFFF] hover:bg-[#000000ef]'} ${className}`}
    >
      {children}
    </Button>
  );
}

export default CustomButtom;
