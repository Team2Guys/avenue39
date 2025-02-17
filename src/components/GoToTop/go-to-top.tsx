'use client'
import React from 'react';
import { IoIosArrowUp } from 'react-icons/io';

const GoToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed bottom-24 right-7 w-12 h-12 border-2 bg-white border-main rounded-full justify-center items-center z-10 cursor-pointer hidden md:flex"
      onClick={scrollToTop}
    >
      <IoIosArrowUp size={30} className="text-main" />
    </div>
  );
};

export default GoToTop;
