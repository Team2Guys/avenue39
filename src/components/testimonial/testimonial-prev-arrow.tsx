import { BsArrowLeft } from 'react-icons/bs';

const TestimonialPrevArrow: React.FC<any> = (props) => {
  const { onClick } = props;
  return (
    <div
      className="testimonial-prev-arrow absolute bottom-0 left-1/2 translate-x-[-120%] cursor-pointer"
      onClick={onClick}
    >
      <BsArrowLeft size={40} />
    </div>
  );
};

export default TestimonialPrevArrow;
