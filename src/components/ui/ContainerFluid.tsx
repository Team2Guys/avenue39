import { IContainer } from '@/types/types';
import React from 'react';

const ContainerFluid: React.FC<IContainer> = ({ children, className }) => {
  return (
    <div
      className={`w-full max-w-[2000px] mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default ContainerFluid;
