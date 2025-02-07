import { Metadata } from 'next';
import React from 'react'
import WishlistPage from './whishlist';

export const metadata: Metadata = {
    title: 'Wishlist | Save Your Favorite Luxury Furniture Pieces',
    description: `Create your wishlist and keep track of your favourite furniture and décor items. Shop when you're ready and never miss out on your dream pieces!`,
    openGraph: {
        title: 'Wishlist',
        description: `Create your wishlist and keep track of your favourite furniture and décor items. Shop when you're ready and never miss out on your dream pieces!`,
        images: [
            {
                url: 'imageUrl',
                alt: 'altText',
            },
        ],
    },
};

const Wishlist = () => {
    return (
        <WishlistPage />
    )

}

export default Wishlist

