'use client'
import { useState, useEffect, useTransition } from 'react';
import dynamic from 'next/dynamic';
import { IProduct } from '@/types/prod';

const AllCategory = dynamic(() => import('./AllCategory'), { ssr: false });

export default function MainProducts({ products }: {products: IProduct[]}) {
  const [showCategories, setShowCategories] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      setShowCategories(true);
    });
  }, []);

  return (
    <>
      {isPending && <div>Loading Products....</div>}

      {showCategories && <AllCategory products={products} />}
    </>
  );
}
