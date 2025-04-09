import axios, { AxiosResponse } from 'axios';
import PRODUCTS_TYPES from '@/types/interfaces';
import React from 'react';

type setTotalProducts = React.Dispatch<React.SetStateAction<PRODUCTS_TYPES[]>>;
type setTotalPage = React.Dispatch<React.SetStateAction<string | undefined>>;
type setError = React.Dispatch<React.SetStateAction<any>>;
type setLoading = React.Dispatch<React.SetStateAction<boolean>>;

export const uploadPhotosToBackend = async (files: File[]): Promise<any[]> => {
  if (files.length === 0) throw new Error('No files found');

  let Response_data: any[] = [];

  try {
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      const response: AxiosResponse<any> = await axios.post(
        `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE}/api/file-upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      Response_data.push(response.data);
    }

    return Response_data;
  } catch (error) {
    throw error;
  }
};

export const ImageRemoveHandler = async (
  imagePublicId: string,
  setterFunction: any,
) => {
  try {
    // Only call the API if public_id is not empty (i.e., it's not a cropped image without a public_id)
    if (imagePublicId) {
       await axios.delete(
        `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE}/api/file-upload/DelImage/${imagePublicId}`,
      );
    }

    // Remove the image from the state regardless of whether it has a public_id
    setterFunction((prev: any) =>
      prev.filter((item: any) => item.public_id !== imagePublicId),
    );
  } catch (error) {
    throw error;
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
    const { products, totalPages, totalProducts }: any =
      await getPaginatedproducts(pageNumber);
    setTotalProducts(products);
    setTotalPage && setTotalPage(totalPages);
    setTotalProductscount && setTotalProductscount(totalProducts);
  } catch (err: any) {
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
