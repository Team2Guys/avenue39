import { Metadata } from 'next';
import Cart from './Cart';
import { fetchProducts } from '@/config/fetch';

export const metadata: Metadata = {
  title: 'Cart Page',
  description: 'Cart description',
  openGraph: {
    title: 'Cart',
    description: 'Cart description',
    url: 'fullUrl',
    images: [
      {
        url: 'imageUrl',
        alt: 'altText',
      },
    ],
  },
  alternates: {
    canonical: 'cart',
  },
};

const Cartpage = async () => {
  const products = await fetchProducts();
  
  for (let i = products.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [products[i], products[j]] = [products[j], products[i]];
  }


  const similarProducts = products.slice(0, 20);
  return <Cart similarProducts={similarProducts} />;
};

export default Cartpage;
