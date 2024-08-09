import { GoArrowLeft } from 'react-icons/go';

const CustomPrevArrow: React.FC<any> = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-prev-arrow" onClick={onClick}>
      <GoArrowLeft size={20} />
    </div>
  );
};

export default CustomPrevArrow;
