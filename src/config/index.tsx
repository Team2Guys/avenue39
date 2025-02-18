import { selectTotalPrice, totalProductsInCart } from '@/redux/slices/cart';
import { State } from '@/redux/store';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { IProduct, IReview } from '@/types/types';
import { MdStar, MdStarBorder } from 'react-icons/md';

export const SubTotal = () => {
  const totalPrice = useSelector((state: State) =>
    selectTotalPrice(state.cart),
  );

  return <Fragment>{totalPrice.toLocaleString()}</Fragment>;
};

export const TotalProducts = () => {
  const totalPrice = useSelector((state: State) =>
    totalProductsInCart(state.cart),
  );
  return <Fragment>{totalPrice}</Fragment>;
};

export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const calculateRatingsPercentage = (reviews: IReview[]) => {
  const totalReviews = reviews.length;

  if (totalReviews === 0) {
    return {
      productReviews: [],
      averageRating: 0,
    };
  }

  const ratingCounts: any = {
    5: Array.isArray(reviews)
      ? reviews.filter((review) => review.star === 5).length
      : 0,
    4: Array.isArray(reviews)
      ? reviews.filter((review) => review.star === 4).length
      : 0,
    3: Array.isArray(reviews)
      ? reviews.filter((review) => review.star === 3).length
      : 0,
    2: Array.isArray(reviews)
      ? reviews.filter((review) => review.star === 2).length
      : 0,
    1: Array.isArray(reviews)
      ? reviews.filter((review) => review.star === 1).length
      : 0,
  };

  const totalStars = reviews.reduce((sum, review) => sum + review.star, 0);
  const averageRating = (totalStars / totalReviews).toFixed(1);

  const productReviews = Object.keys(ratingCounts)
    .reverse()
    .map((star) => ({
      label: `${star} star`,
      ratingValue: Math.round((ratingCounts[star] / totalReviews) * 100),
    }));

  return {
    productReviews,
    averageRating: parseFloat(averageRating),
  };
};
/* eslint-disable */
export const generateSlug = (text: string) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};
/* eslint-enable */
export const renderStars = ({ star = 0 }: { star?: number }) => {
  const stars = [];
  const maxStars = 5;
  for (let i = 1; i <= maxStars; i++) {
    if (i <= star) {
      stars.push(<MdStar key={i} size={20} className="text-warning" />);
    } else {
      stars.push(<MdStarBorder key={i} size={20} className="text-warning" />);
    }
  }
  return stars;
};


export const variationProducts = ({ products }: { products: IProduct[] }) => {
  return products?.flatMap((prod) => {
    if ((!prod.sizes || prod.sizes.length === 0) && (!prod.filter || prod.filter.length === 0)) {
      return [prod];
    }

    if (!prod.productImages || prod.productImages.length === 0) {
      return [];
    }

    const uniqueVariations = new Map();

    prod.productImages
      .filter((img) => img.index)
      .forEach((img) => {
        const sizeMatch = prod.sizes?.find(
          (size) => size.name?.toLowerCase() === img.size?.toLowerCase()
        );
        const filterMatch = prod.filter?.[0]?.additionalInformation?.find(
          (filterItem) => filterItem.name?.toLowerCase() === img.color?.toLowerCase()
        );

        const hoverImageMatch = prod.productImages.find(
          (hoverImg) => hoverImg.index === img.index && hoverImg.imageUrl !== img.imageUrl
        );

        const variationKey = img.index;

        if (!uniqueVariations.has(variationKey)) {
          uniqueVariations.set(variationKey, {
            ...prod,
            name: prod.name,
            displayName: `${prod.name} - ${img.size?.toLowerCase() === img.color?.toLowerCase()
              ? img.size
              : `${img.size ? img.size : ''} ${img.color ? `(${img.color})` : ''}`
              }`,
            sizeName: img.size,
            colorName: img.color,
            price: sizeMatch
              ? Number(sizeMatch.price)
              : filterMatch
                ? Number(filterMatch.price)
                : Number(prod.price),
            discountPrice: sizeMatch
              ? Number(sizeMatch.discountPrice)
              : filterMatch
                ? Number(filterMatch.discountPrice || 0)
                : Number(prod.discountPrice),
            posterImageUrl: img.imageUrl,
            hoverImageUrl: hoverImageMatch ? hoverImageMatch.imageUrl : prod.hoverImageUrl,
            stock: sizeMatch?.stock ?? prod.stock,
          });
        }
      });

    return Array.from(uniqueVariations.values());
  })
};

export const variationName = ({ product }: { product: IProduct }) => {
  if (product.sizeName && product.colorName && product.sizeName.includes(product.colorName)) {
    return product.displayName = `${product.name} -  ${product.sizeName}`;
  }
  else if(product.colorName && !product.sizeName){
  return product.displayName = `${product.name} -  (${product.colorName})`;
} else {
  return product.displayName;
}
}