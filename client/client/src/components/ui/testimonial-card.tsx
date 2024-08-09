import Image from 'next/image';
import React from 'react';
import { MdStar, MdStarBorder } from 'react-icons/md';
import testimonialIcon from '@icons/Group1425.png';
import { ITestimonialCard } from '@/types/types';

interface CardProps {
  card: ITestimonialCard;
}

const TestimonialCard: React.FC<CardProps> = ({ card }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= (card.reviews || 0)) {
        stars.push(<MdStar key={i} size={20} className="text-yellow-400" />);
      } else {
        stars.push(
          <MdStarBorder key={i} size={20} className="text-yellow-400" />,
        );
      }
    }
    return stars;
  };
  return (
    <div className="relative bg-white rounded-lg drop-shadow-md text-start py-10 ps-8 pe-10 mx-3 max-w-[400px]">
      <Image
        src={testimonialIcon}
        alt="testimonial icon"
        className="absolute top-5 right-8"
      />
      <Image
        src={card.profile.src}
        alt="profile image"
        width={card.profile.width}
        height={card.profile.height}
      />
      <h4 className="font-medium text-20 mt-4">{card.name}</h4>
      <p className="mt-4 text-17 text-lightforeground font-normal">Customer</p>
      <p className="mt-4 text-17 leading-9">{card.comment}</p>
      <div className="flex items-center gap-2 mt-9">{renderStars()}</div>
    </div>
  );
};

export default TestimonialCard;
