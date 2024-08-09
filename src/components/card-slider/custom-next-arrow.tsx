import React from 'react';
import { GoArrowRight } from 'react-icons/go';

const CustomNextArrow: React.FC<any> = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-next-arrow" onClick={onClick}>
      <GoArrowRight size={20} />
    </div>
  );
};

export default CustomNextArrow;
