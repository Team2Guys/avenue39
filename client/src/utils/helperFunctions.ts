import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import PRODUCTS_TYPES from '@/types/interfaces';

type setTotalProducts = React.Dispatch<React.SetStateAction<PRODUCTS_TYPES[]>>;
type setTotalPage = React.Dispatch<React.SetStateAction<string | undefined>>;
type setError = React.Dispatch<React.SetStateAction<any>>;
type setLoading = React.Dispatch<React.SetStateAction<boolean>>;

export const uploadPhotosToBackend = async (files: File[]): Promise<any[]> => {
  const formData = new FormData();

  if (files.length === 0) throw new Error('No files found');


  
  try {
    for (const file of files) {
      console.log('hello from files');
      formData.append('file', file);
    }

    const response: AxiosResponse<any> = await axios.post(
      `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE}/api/file-upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    console.log(response);
    return response.data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

export const ImageRemoveHandler = async (
  imagePublicId: string,
  setterFunction: any,
) => {
  const requestConfig: AxiosRequestConfig = {
    data: { imageUrl: imagePublicId },
  };
  console.log('function called');
  console.log(imagePublicId);
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE}/api/file-upload/DelImage/${imagePublicId}`,
    );
    console.log('Image removed successfully:', response.data);
    setterFunction((prev: any) =>
      prev.filter((item: any) => item.public_id != imagePublicId),
    );
  } catch (error) {
    console.error('Failed to remove image:', error);
  }
};

export const getPaginatedproducts = async (page: number) => {
  try {
    let response: any = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getPaginateProducts?page=${page}`,
    );
    let products = response.data.products;
    let totalPages = response.data.totalPages;
    let currentPage = response.data.currentPage;
    let totalProducts = response.data.totalProducts;
    return {
      products,
      totalPages,
      currentPage,
      totalProducts,
    };
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    } else if (err.message) {
      throw new Error(err.message);
    } else {
      throw new Error('unexpected Error occured');
    }
  }
};

export let getPRODUCTS = async (
  setTotalProducts: setTotalProducts,
  setError: setError,
  setLoading: setLoading,
  pageNumber: number,
  setTotalPage?: setTotalPage,
  setTotalProductscount?: any,
) => {
  try {
    setLoading(true);
    const { products, totalPages, currentPage, totalProducts }: any =
      await getPaginatedproducts(pageNumber);
    setTotalProducts(products);
    setTotalPage && setTotalPage(totalPages);
    setTotalProductscount && setTotalProductscount(totalProducts);
  } catch (err: any) {
    console.log(err, 'err');
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else if (err.message) {
      setError(err.message);
    } else {
      setError('An unexpected error occurred.');
    }
  } finally {
    setLoading(false);
  }
};
