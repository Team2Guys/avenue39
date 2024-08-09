import { MdArrowForwardIos } from 'react-icons/md';

const HotProductNextArrow: React.FC<any> = (props) => {
  const { onClick } = props;
  return (
    <div
      className="hot-product-next-arrow cursor-pointer absolute -top-10 right-4"
      onClick={onClick}
    >
      <MdArrowForwardIos size={20} />
    </div>
  );
};

export default HotProductNextArrow;
