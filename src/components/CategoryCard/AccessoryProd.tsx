
"use client"
import { fetchPaginagedAccessory } from '@/config/fetch';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import CardSkeleton from '../cardSkelton';
import { IProduct } from '@/types/prod';
import ProductSkeleton from '../Skaleton/productSkeleton';
import CategoryWrapper from './CategoryWrapper';
const Card = dynamic(() => import('../ui/card'), {
    loading: () => <CardSkeleton />,
})


const AccessoryProd = ({ redirect, CategoryName, CategoryDescription }: { redirect?: string, CategoryName: string, CategoryDescription: string }) => {
    const [currentPage, setCurrentPage] = useState(1); // To track the current page
    const [paginatedProducts, setPaginatedProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1); // To track the total number of pages
    const [loading, setTloading] = useState(false); // To track the total number of pages


    useEffect(() => {
        // Fetch the products for the current page
        const getProducts = async () => {
            try {
                setTloading(true)
                const data = await await fetchPaginagedAccessory("ACCESSORIES", currentPage, 5,);
                setPaginatedProducts(data.products);
                setTotalPages(data.totalPages);
            } catch {
                return "errr"
            } finally {
                setTloading(false)

            }

        };

        getProducts();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        // Ensure page is within valid range
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    console.log(totalPages, "paginatedProducts")


    return (


        <CategoryWrapper redirect={redirect} CategoryName={CategoryName} CategoryDescription={CategoryDescription}>



            <div className='flex md:flex-nowrap flex-wrap'>
                {/* Render products */}


                {
                    loading ?
                        <div className='flex gap-5'>

                            {Array(5)
                                .fill(null)
                                .map((_, index) => (
                                    <ProductSkeleton imageHeight="h-[300px] xl:h-[290px]" key={index} />

                                ))}
                        </div>

                        :

                        paginatedProducts.length > 0 && paginatedProducts.map((product: IProduct) => (
                            <Card
                                key={product.id}
                                card={product}
                                category
                                isLoading={false}
                                slider={false}
                                isHomepage
                                redirect='redirect'
                                cardLayout="grid"
                            />
                        ))}

            </div>

            <div className="flex items-center justify-center space-x-2 mt-4 ">
                {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;
                    return (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-2 h-2 rounded-full flex items-center my-3 justify-center
          ${currentPage === page ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}
          hover:bg-black hover:text-white transition`}
                        >
                            {/* {page} */}
                        </button>
                    );
                })}
            </div>

        </CategoryWrapper>


    );
};

export default AccessoryProd;
