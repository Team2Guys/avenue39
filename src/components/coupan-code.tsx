import React, { useState } from 'react';
import { LabelInput } from './ui/label-input';

const Coupan = ({ label, handleCoupon }: any) => {
  const [coupon, setCoupon] = useState('');

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(e.target.value);
  };

  return (
    <div className="flex flex-wrap sm:flex-nowrap w-full items-end space-x-2 space-y-1 md:space-y-0">
      <LabelInput
        labelClass="px-2"
        label={label}
        className="rounded-none custom-input-bg"
        name="coupon"
        type="text"
        placeholder="Enter your coupon code"
        value={coupon}
        onChange={handleInputChange}
      />
      <button
        type="button"
        onClick={() => handleCoupon(coupon)}
        disabled={coupon === ''}
        className={`h-[55px] px-2 w-48 bg-black text-white hover:text-black hover:bg-white text-sm rounded-md border-2 border-black ${coupon === '' && 'opacity-40'}`}
      >
        Apply Coupon
      </button>
    </div>
  );
};

export default Coupan;
