import { ICategory, IProduct } from '@/types/types';
import axios from 'axios';

export const fetchProducts = async (): Promise<IProduct[]> => {
  console.log(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-all`,
  );
  return response.data;
};

export const fetchCategories = async (): Promise<ICategory[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/get-all`,
  );
  return response.data;
};

export const fetchReviews = async (): Promise<ICategory[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/get-all`,
  );
  return response.data;
};

// const fetchProducts = async (): Promise<IProduct[]> => {
//   return new Promise<IProduct[]>((resolve, reject) => {
//     setTimeout(async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-all`,
//         );
//         resolve(response.data);
//       } catch (error) {
//         reject(error);
//       }
//     }, 2000); // Simulate a 2-second delay
//   });
// };
