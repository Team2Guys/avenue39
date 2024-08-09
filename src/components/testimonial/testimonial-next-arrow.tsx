import React from 'react';
import { BsArrowRight } from 'react-icons/bs';

const TestimonialNextArrow: React.FC<any> = (props) => {
  const { onClick } = props;
  return (
    <div
      className="testimonial-next-arrow absolute bottom-0 left-1/2 translate-x-[20%] cursor-pointer"
      onClick={onClick}
    >
      <BsArrowRight size={40} />
    </div>
  );
};

export default TestimonialNextArrow;
