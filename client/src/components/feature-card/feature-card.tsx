// feature-card.tsx
import React from 'react';
import Image from 'next/image';
import { IoEyeOutline } from 'react-icons/io5';
import StarRating from '../ui/star';
import { Feature, IProduct } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from '@/redux/store';
import { CartItem } from '@/redux/slices/cart/types';
import { addItem } from '@/redux/slices/cart';
import { openDrawer } from '@/redux/slices/drawer';
import { MdStar, MdStarBorder } from 'react-icons/md';
import ProductDetail from '../product-detail/product-detail';
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from '../ui/dialog';
interface CardProps {
  card: IProduct;
  isModel?: boolean;
}

const FeatureCard: React.FC<CardProps> = ({ card, isModel }) => {
  const handleEventProbation = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };
  const Navigate = useRouter();
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State) => state.cart.items);

  const itemToAdd: CartItem = {
    ...card,
    quantity: 1,
  };
  const handleAddToCard = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(addItem(itemToAdd));
    dispatch(openDrawer());
  };
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= /*card.reviews*/ (4 || 0)) {
        stars.push(<MdStar key={i} size={20} className="text-yellow-400" />);
      } else {
        stars.push(
          <MdStarBorder key={i} size={20} className="text-yellow-400" />,
        );
      }
    }
    return stars;
  };

  const productId = 5;

  const handleNavigation = (e: any) => {
    Navigate.push(`/product/${productId}`);
  };
  return (
    <div className="space-y-3 px-4 relative ">
      <div className="relative group ">
      {isModel ? null : (    
          <Dialog>
           <DialogTrigger>
              <div className="bg-white h-auto py-3 z-20 absolute top-8 right-2 w-10 rounded-3xl  flex justify-center items-center cursor-pointer opacity-0 group-hover:opacity-100 duration-300 transition-all">
                <IoEyeOutline size={25} />
              </div>
            </DialogTrigger>
            <DialogOverlay/>
          <DialogContent className="max-w-[1400px] w-11/12 bg-white px-0 sm:rounded-3xl border border-black shadow-none gap-0 pb-0">
          <div className="pb-6 px-5 xs:px-10 me-4 xs:me-7 mt-6 max-h-[80vh] overflow-y-auto custom-scroll">
                <ProductDetail params={card} isZoom={false} />
              </div>
          </DialogContent>
        </Dialog>
           
            
       )}
        <div className="bg-[#FF0000] h-auto py-2 px-4 rounded-3xl absolute top-8 left-2 flex justify-center items-center cursor-pointer">
          <p className="text-15 text-white">
            {card.sale}
            <span>%</span>
          </p>
        </div>
        <div onClick={(e) => handleNavigation(e)} className='cursor-pointer'>
          <Image
            width={400}
            height={400}
            src={card.posterImageUrl}
            alt={card.name}
            className="z-10"
          />
        </div>
      </div>
      <div className="flex justify-between px-1">
        <p className="text-15">{card.name}</p>
        <div className='flex'>
          
          {renderStars()}
    
        </div>
      </div>
      <div className="border-t flex gap-5 pt-3 px-1">
        <p className="text-12">
          Dhs.<span>{card.discountPrice}</span>.00
        </p>
        <p className="text-12 line-through text-[#A5A5A5] font-semibold">
          Dhs.<span>{card.price}</span>.00
        </p>
      </div>
      
    </div>
  );
};

export default FeatureCard;
