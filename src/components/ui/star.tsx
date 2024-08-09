'use client';
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
interface StarRatingProps {
  disabled?: boolean;
  defaultValue?: number;
  onChange?: (rating: number) => void;
}
const StarRating: React.FC<StarRatingProps> = ({
  disabled = false,
  defaultValue = 0,
  onChange,
}) => {
  const [rating, setRating] = useState(defaultValue);

  useEffect(() => {
    setRating(defaultValue);
  }, [defaultValue]);

  const handleClick = (index: number) => {
    if (disabled) return;
    const newRating = index + 1;
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  return (
    <div className="star-rating gap-1">
      {[...Array(5)].map((star, index) => (
        <FaStar
          key={index}
          className={`star ${index < rating ? 'filled' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default StarRating;
