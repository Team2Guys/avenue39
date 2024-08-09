import { MdArrowBackIos } from 'react-icons/md';

const HotProductPrevArrow: React.FC<any> = (props) => {
  const { onClick } = props;
  return (
    <div
      className="hot-product-prev-arrow cursor-pointer absolute -top-10 right-8"
      onClick={onClick}
    >
      <MdArrowBackIos size={20} />
    </div>
  );
};

export default HotProductPrevArrow;
