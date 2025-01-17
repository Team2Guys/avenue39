'use client';

import React, { useState } from 'react';
import { Table, notification, Modal } from 'antd';
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import Loader from '@components/Loader/Loader';
import { FaRegEye } from 'react-icons/fa';
import { LiaEdit } from 'react-icons/lia';
import { generateSlug } from '@/config';
import { product } from '@/types/interfaces';
import revalidateTag from '@/components/ServerActons/ServerAction';

interface Product {
  id: string;
  name: string;
  category: string;
  posterImageUrl: { imageUrl: string };
  createdAt: string;
}

interface CategoryProps {
  Categories: any;
  setCategory: any;
 /* eslint-disable */
  setselecteMenu: (menu: string) => void;
  /* eslint-enable */
  loading?: boolean;
  setEditProduct: any;
}

const ViewProduct: React.FC<CategoryProps> = ({
  Categories,
  setCategory,
  setselecteMenu,
  loading,
  setEditProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };


  // const canAddProduct=loggedInUser && (loggedInUser.role =='Admin' ?   loggedInUser.canAddProduct : true )
  const canAddProduct = true;
  // const canDeleteProduct =
  //   loggedInUser &&
  //   (loggedInUser.role == 'Admin' ? loggedInUser.canDeleteProduct : true);
  const canDeleteProduct = true;
  // const canEditproduct =
  //   loggedInUser &&
  //   (loggedInUser.role == 'Admin' ? loggedInUser.canEditproduct : true);
  const canEditproduct = true;


  const filteredProducts: Product[] =
  
  Categories?.filter((product: any) =>{
    const searchtext = searchTerm.trim().toLowerCase();

    return (
      product.name.toLowerCase().includes(searchtext) ||
      product.description.toLowerCase().includes(searchtext) ||
      product.price.toString().includes(searchtext) || 
      product.discountPrice.toString().includes(searchtext) ||
      (product.colors && product.colors.some((color: string) => color.toLowerCase().includes(searchtext))) || 
      (product.spacification && product.spacification.some((spec:any) =>
        Object.values(spec).some((value:any) =>
          value.toString().toLowerCase().includes(searchtext)
        )
      )) || 
      product.additionalInformation.some((info:any) =>
        Object.values(info).some((value:any) =>
          value.toString().toLowerCase().includes(searchtext)
        )
      ) || 
      (product.categories && product.categories.some((category:any) =>
        category.name.toLowerCase().includes(searchtext) 
      )) ||
      (product.subcategories && product.subcategories.some((subcategory:any) =>
        subcategory.name.toLowerCase().includes(searchtext)
      ))
    );
  })
  .sort((a: product, b: product) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA; 
  }) || [];
 

  const confirmDelete = (key: any) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      content: 'Once deleted, the product cannot be recovered.',
      onOk: () => handleDelete(key),
      okText: 'Yes',
      cancelText: 'No',
      okButtonProps: {
        style: {
          backgroundColor: 'black', 
          color: 'white', 
          outlineColor: 'black', 
        },
      },
      cancelButtonProps: {
        style: {
          borderColor: 'black',
          color: 'black', 
          outlineColor: 'black', 
        },
      },
    });
  };

  const handleDelete = async (key: string) => {
    // alert(key);
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/delete-product`,
        {
          headers: {
            productId: key,
          },
        },
      );
      revalidateTag('products');
      console.log(response);
      setCategory((prev: Product[]) => prev.filter((item) => item.id !== key));
      notification.success({
        message: 'Product Deleted',
        description: 'The product has been successfully deleted.',
        placement: 'topRight',
      });
    } catch (err) {
      notification.error({
        message: 'Deletion Failed',
        description: 'There was an error deleting the product.',
        placement: 'topRight',
      });
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'posterImageUrl',
      width: 150,
      key: 'posterImageUrl',
      render: (text: any, record: Product) => (
        <Image
          src={`${record?.posterImageUrl}`}
          alt={`Image of ${record.name}`}
          width={200}
          className=' sm:w-[80px] sm:h-[80px] rounded-md object-contain'
          height={200}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Stock Quantity',
      width: 170,
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
      width: 150,
      render: (text: any, record: Product) => {
        const createdAt = new Date(record.createdAt);
        const formattedDate = `${createdAt.getFullYear()}-${String(
          createdAt.getMonth() + 1,
        ).padStart(2, '0')}-${String(createdAt.getDate()).padStart(2, '0')}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: 'Time',
      dataIndex: 'createdAt',
      key: 'time',
      width: 120,
      render: (text: any, record: Product) => {
        const createdAt = new Date(record.createdAt);
        const formattedTime = `${String(createdAt.getHours()).padStart(2, '0')}:${String(
          createdAt.getMinutes(),
        ).padStart(2, '0')}`;
        return <span>{formattedTime}</span>;
      },
    },
    {
      title: 'Preview',
      key: 'Preview',
      width: 120,
      render: (text: any, record: Product) => {
        const handleClick = () => {
          const url = `/product/${generateSlug(record.name)}`;
          window.open(url, '_blank');
        };
        return <FaRegEye className="cursor-pointer" onClick={handleClick} />;
      },
    },
    {
      title: 'Edit',
      key: 'Edit',
      width: 150,
      render: (text: any, record: Product) => (
        <LiaEdit
          className={`${canEditproduct ? 'cursor-pointer' : ''} ${!canEditproduct ? 'cursor-not-allowed text-slate-200' : ''
            }`}
          size={20}
          onClick={() => {
            if (canEditproduct) {
              setEditProduct(record);
              setselecteMenu('Add Products');
            }
          }}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (text: any, record: Product) => (
        <RiDeleteBin6Line
          className={`${canDeleteProduct ? 'text-red-600 cursor-pointer' : ''} ${!canDeleteProduct ? 'cursor-not-allowed text-slate-200' : ''
            }`}
          size={20}
          onClick={() => {
            console.log(record);
            if (canDeleteProduct) {
              confirmDelete(record.id);
            }
          }}
        />
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <div className="flex justify-center mt-10">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-between gap-2 mb-4 items-center flex-nowrap text-black dark:text-white">
            <input
              className="peer lg:p-3 p-2 block outline-none border rounded-md border-gray-200 dark:bg-boxdark dark:bg-transparent dark:border-white text-11 xs:text-sm dark:focus:border-primary focus:border-dark focus:ring-dark-500 disabled:opacity-50 disabled:pointer-events-none dark:text-black"
              type="search"
              placeholder="Search Product"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div>
              <p
                className={`${canAddProduct && 'cursor-pointer rounded-md text-nowrap text-12 xs:text-base'
                  } p-2 ${canAddProduct && 'bg-primary text-white rounded-md border'
                  } flex justify-center dark:bg-main dark:border-0 ${!canAddProduct &&
                  'cursor-not-allowed bg-gray-500 text-white rounded-md'
                  }`}
                onClick={() => {
                  if (canAddProduct) {
                    setselecteMenu('Add Products');
                    setEditProduct(undefined);
                  }
                }}
              >
                Add Products
              </p>
            </div>
          </div>
          {filteredProducts && filteredProducts.length > 0 ? (
            <Table
              className="lg:overflow-hidden overflow-x-scroll !dark:border-strokedark !dark:bg-boxdark !bg-transparent"
              dataSource={filteredProducts}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
          ) : (
            <p className="text-primary dark:text-white">No products found</p>
          )}
        </>
      )}
    </div>
  );
};

export default ViewProduct;
