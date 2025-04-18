import { Metadata } from 'next';
import { fetchProducts } from '@/config/fetch';
import dynamic from 'next/dynamic';
const Cart = dynamic(() => import('./Cart'))


export const metadata: Metadata = {
  title: 'Shopping Cart – Review & Secure Checkout | Avenue39',
  description: 'Review your shopping cart and proceed to our secure checkout. Don’t miss out—complete your order now at Avenue39',
  openGraph: {
    title: 'Shopping Cart – Review & Secure Checkout | Avenue39',
    description: 'Review your shopping cart and proceed to our secure checkout. Don’t miss out—complete your order now at Avenue39',
    url: "http://185.151.51.28:5004/cart",
  },
  alternates: {
    canonical: 'http://185.151.51.28:5004/cart',
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
