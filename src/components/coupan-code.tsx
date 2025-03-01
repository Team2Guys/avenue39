import React, { useState } from 'react';
import { LabelInput } from './ui/label-input';

const Coupan = ({ label, handleCoupon }: any) => {
  const [coupon, setCoupon] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCoupon(coupon);
    }
  };

  const handleCouponApply = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    console.log("Coupon applied:", coupon);
    handleCoupon(coupon);
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
        onKeyPress={handleKeyPress}
      />
      <button
        type="button"
        onClick={handleCouponApply}
        disabled={coupon === ''}
        className={`h-[55px] px-2 w-48 bg-black text-white hover:text-black hover:bg-white text-sm rounded-md border-2 border-black ${coupon === '' && 'opacity-40'}`}
      >
        Apply Coupon
      </button>
    </div>
  );
};

export default Coupan;
