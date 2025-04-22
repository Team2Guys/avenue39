'use client'
import { IProduct } from '@/types/prod';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

let AllCategory: React.ComponentType<any> | null = null;

export default function MainProducts({ products }: {products: IProduct[]}) {
  const [loadComponent, setLoadComponent] = useState(false);

  useEffect(() => {
    if (products.length > 1) {
      const timeout = setTimeout(() => {
        setLoadComponent(true);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [products]);

  if (loadComponent && !AllCategory) {
    AllCategory = dynamic(() =>
      import('./AllCategory').then((mod) => ({
        default: mod.default,
      })),
      {
        ssr: false,
        loading: () => <div>Loading categories…</div>,
      }
    );
  }

  return (
    <>
      {loadComponent && AllCategory && <AllCategory products={products} />}
    </>
  );
}
