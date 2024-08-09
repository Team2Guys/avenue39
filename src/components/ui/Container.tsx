import { IContainer } from '@/types/types';
import React from 'react';

const Container: React.FC<IContainer> = ({ children, className }) => {
  return (
    <div
      className={`w-full max-w-[1720px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
