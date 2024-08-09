import Image from 'next/image';
import React from 'react';
import { MdStar, MdStarBorder } from 'react-icons/md';
import testimonialIcon from '@icons/Group1425.png';
import { ITestimonialCard } from '@/types/types';
import { useRouter } from 'next/navigation';

interface CardProps {
  card: ITestimonialCard;
}

const TestimonialCard: React.FC<CardProps> = ({ card }) => {
  const router = useRouter();

  const handleBuyNowClick = () => {
    router.push('/checkout');
  };

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
    <div className="relative bg-white rounded-3xl text-start py-20 ps-8 pe-10 mx-3 max-w-[400px] shadow-lg lg:mb-4 mb-2">
      <Image
        src={testimonialIcon}
        alt="testimonial icon"
        className="absolute top-5 right-8"
      />
      <div>
        <Image
          src={card.profile.src}
          className="!flex justify-start !m-0"
          alt="profile image"
          width={card.profile.width}
          height={card.profile.height}
        />
        <h4 className="font-medium text-20 mt-4">{card.name}</h4>
        <p className="mt-4 text-17 text-lighttextforeground font-normal">
          Customer
        </p>
        <p className="mt-4 text-17 leading-9">{card.comment}</p>
        <div className="flex items-center gap-2 mt-10">{renderStars()}</div>
      </div>
    </div>
  );
};

export default TestimonialCard;
