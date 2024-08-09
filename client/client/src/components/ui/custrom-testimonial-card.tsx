import Image from 'next/image';
import React from 'react';
import { MdStar, MdStarBorder } from 'react-icons/md';
import testimonialIcon from '@icons/Group1425.png';
import { ITestimonialCard } from '@/types/types';

interface CardProps {
  card: ITestimonialCard;
}
const CustromTestimonialCard: React.FC<CardProps> = ({ card }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= (card.reviews || 0)) {
        stars.push(<MdStar key={i} size={15} className="text-yellow-400" />);
      } else {
        stars.push(
          <MdStarBorder key={i} size={15} className="text-yellow-400" />,
        );
      }
    }
    return stars;
  };
  return (
    <div className="relative bg-white rounded-sm border-2 border-[#EEEEEE]  text-start py-6 px-5 w-full xl:max-w-72 ">
      <div className="flex items-center gap-3">
        <Image
          src={card.profile.src}
          alt="profile image"
          className="rounded-full"
          width={50}
          height={50}
        />
        <div>
          <h4 className="font-medium text-14">{card.name}</h4>
          <span className="flex items-center mt-1">{renderStars()}</span>
        </div>
      </div>
      <p className="mt-5 text-[#666666] text-sm leading-5">{card.comment}</p>
    </div>
  );
};

export default CustromTestimonialCard;
