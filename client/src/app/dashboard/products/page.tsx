'use client';

import Breadcrumb from '@components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@components/Dashboard/Layouts/DefaultLayout';
import ViewProduct from '@components/Dashboard/Tables/ViewProduct';
import ProtectedRoute from '@/hooks/AuthHookAdmin';
import { useEffect, useState } from 'react';
import { product } from '@/types/interfaces';
import FormElements from '@components/Dashboard/FormElements';

const Products = () => {
  const [editProduct, setEditProduct] = useState<any | undefined>();
  const [products, setProducts] = useState<any[]>();

  const [productloading, setProductloading] = useState<boolean>(false);
  const [selecteMenu, setselecteMenu] = useState<string>('Add All Products');

  useEffect(() => {
    const productHandler = async () => {
      try {
        setProductloading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-all`,
        );
        const allProducts = await response.json();
        console.log('Products are here');
        console.log(allProducts);
        setProducts(allProducts);
        setProductloading(false);
      } catch (err) {
        console.log('error Occured');
        setProductloading(false);
      }
    };
    productHandler();
  }, [selecteMenu]);

  const EditInitialValues: any = {
    name: editProduct?.name,
    description: editProduct?.description,
    price: editProduct?.price,
    colors: editProduct?.colors,
    modelDetails: editProduct?.modelDetails,
    spacification: editProduct?.spacification,
    discountPrice: editProduct?.discountPrice,
    category: editProduct && editProduct?.category,
    sizes: editProduct && editProduct?.sizes,
    starRating: editProduct && editProduct.starRating,
    reviews: editProduct && editProduct.starRating,
    code: editProduct && editProduct.code,
    stock: editProduct && editProduct.stock,
    salePrice: editProduct && editProduct.salePrice,
    posterImageUrl: editProduct && editProduct.posterImageUrl,
    posterImageAltText: editProduct && editProduct.posterImageAltText,
    hoverImageUrl: editProduct && editProduct.hoverImageUrl,
    hoverImageAltText: editProduct && editProduct.hoverImageAltText,
    imagesUrl: editProduct && editProduct.productImages,
    purchasePrice: editProduct && editProduct.purchasePrice,
    additionalInformation: editProduct && editProduct.additionalInformation,
    Images_Alt_Text:editProduct && editProduct?.Images_Alt_Text,
    Meta_Title:editProduct && editProduct?.Meta_Title,
    Meta_Description:editProduct && editProduct?.Meta_Title,
    Canonical_Tag:editProduct && editProduct?.Meta_Title,
    // Images_Alt_Text:editProduct && editProduct?.Meta_Title,
    Og_title:editProduct && editProduct?.Meta_Title,
    Og_Image:editProduct && editProduct?.Meta_Title,
    OgUrl:editProduct && editProduct?.Meta_Title,
  };

  let productFlag: boolean = selecteMenu === 'Add All Products' ? true : false;

  return (
    <DefaultLayout>
      <Breadcrumb pageName={productFlag ? 'Products' : 'Add Products'} />
      {productFlag ? (
        <ViewProduct
          Categories={products}
          setCategory={setProducts}
          setselecteMenu={setselecteMenu}
          loading={productloading}
          setEditProduct={setEditProduct}
        />
      ) : (
        <FormElements
          setselecteMenu={setselecteMenu}
          EditInitialValues={editProduct}
          setEditProduct={setEditProduct}
          EditProductValue={
            EditInitialValues &&
            (EditInitialValues.name !== undefined ||
              EditInitialValues.category !== undefined)
              ? EditInitialValues
              : undefined
          }
        />
      )}
    </DefaultLayout>
  );
};

export default ProtectedRoute(Products);
