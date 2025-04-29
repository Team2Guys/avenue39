import React from 'react';
import { Skeleton } from '../ui/skeleton';

const ProductSkeleton = ({ imageHeight }: { imageHeight: string }) => {
  return (
    <div className="flex flex-col gap-3 w-full ">
      <Skeleton className={`w-full ${imageHeight} rounded-[35px]`} />
      <Skeleton className="w-full max-w-52 mx-auto h-5" />
      <Skeleton className="w-28 h-5 mx-auto" />
      <div className="flex gap-2 justify-center mb-2">
        <Skeleton className="w-28 h-8 rounded-full" />
        <Skeleton className="w-28 h-8 rounded-full" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
