'use client'
import { IOrderProduct } from '@/types/types';
import React from 'react'

const OrderSummary = ({userDetail}: {userDetail: any, }) => {
    const sendOrderSummary = (userDetail: { products: IOrderProduct[] }, phoneNumber: string) => {
        let message = 'Order Summary:\n\n';

        userDetail.products.forEach((product: IOrderProduct) => {
            message += `Product: ${product.productData.name}\n`;
            if (product?.selectedSize?.[0]?.filterName) {
                message += `Color: ${product.selectedSize[0].filterName}\n`;
            }
            message += `Price: AED ${product.productData?.discountPrice > 0 ? product.productData?.discountPrice : product.productData?.price}\n`;
            message += `Quantity: ${product.quantity}\n\n`;
        });

        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappLink, '_blank');
    };
    return (
        <button
            onClick={() => sendOrderSummary(userDetail, userDetail.phoneNumber)}
            className="bg-black px-6 lg:flex justify-center items-center rounded-md text-white h-[50px] hover:border-[#666666] border border-[#F6F6F6] font-helvetica flex"
        >
            Send Order Summary to WhatsApp
        </button>
    )
}

export default OrderSummary