'use client';
import Card from '@/components/ui/card';
import { IProduct } from '@/types/types';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/config/fetch';

const DummyPage = () => {
  const {
    data: products = [],
    error,
    isLoading,
  } = useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching products: {error.message}</div>;
  }

  return (
    <div>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((card) => (
          <div key={card.id}>
            <Card card={card} />
          </div>
        ))
      )}
    </div>
  );
};

export default DummyPage;
