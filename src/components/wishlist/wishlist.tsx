import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { IoIosHeartEmpty } from 'react-icons/io';

const WishlistCount = () => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const path = usePathname();
  const calculateWishlistCount = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistCount(wishlist.length);
  };

  useEffect(() => {
    calculateWishlistCount();

    const handleWishlistChange = () => {
      calculateWishlistCount();
    };
    window.addEventListener('WishlistChanged', handleWishlistChange);

    return () => {
      window.removeEventListener('WishlistChanged', handleWishlistChange);
    };
  }, [wishlistCount]);


  return (
    <div
      className={`xl:w-12 w-12 h-10 rounded-3xl relative flex justify-center items-center cursor-pointer ${
        path === '/wishlist' ? 'bg-main border-main text-white' : 'border-black'
      }`}
    >
      <Link href={'/wishlist'}>
        <IoIosHeartEmpty size={26} className="font-bold" />
      </Link>
      {wishlistCount > 0 && (
        <div className="w-4 h-4 rounded-full flex justify-center items-center absolute right-2 top-2 bg-black text-white text-10">
          {wishlistCount}
        </div>
      )}
    </div>
  );
};

export default WishlistCount;
