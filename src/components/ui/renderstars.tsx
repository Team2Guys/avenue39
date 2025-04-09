import { calculateRatingsPercentage, renderStars } from '@/config';
import { fetchReviews } from '@/config/fetch';
import { IProduct } from '@/types/prod';
import { IReview } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
interface starProps {
  card?: IProduct;
}

const RenderStars: React.FC<starProps> = ({ card }) => {
  const { data: reviews = [] } = useQuery<IReview[], Error>({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
  });
  const productId = card?.id;
  const filteredReviews = Array.isArray(reviews)
    ? reviews.filter((review) => review.productId === productId)
    : [];
  const { averageRating } = calculateRatingsPercentage(filteredReviews);
  return (
    <div className="flex gap-1">
      {averageRating > 1 && renderStars({ star: averageRating })}
    </div>
  );
};

export default RenderStars;
