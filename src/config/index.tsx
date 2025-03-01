import { selectTotalPrice, totalProductsInCart } from '@/redux/slices/cart';
import { State } from '@/redux/store';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { IProduct, IReview } from '@/types/types';
import { MdStar, MdStarBorder } from 'react-icons/md';
import { CartItem } from '@/redux/slices/cart/types';

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
    if (prod.sizes?.length && prod.filter?.[0].additionalInformation.length) {
      prod.sizes.forEach((size) => {
        const variationKey = `${size.name}-${size.filterName || "default"}`;
        
        const matchingImage = prod.productImages.find(
          (img) =>
            img.size?.toLowerCase() === size.name?.toLowerCase() &&
            img.color?.toLowerCase() === size.filterName?.toLowerCase()
        );

        const hoverImageMatch = prod.productImages.find(
          (hoverImg) =>
            hoverImg.size?.toLowerCase() === size.name?.toLowerCase() &&
            hoverImg.color?.toLowerCase() === size.filterName?.toLowerCase() &&
            hoverImg.imageUrl !== matchingImage?.imageUrl
        );

        if (!uniqueVariations.has(variationKey)) {
          uniqueVariations.set(variationKey, {
            ...prod,
            name: prod.name,
            displayName: `${prod.name} - ${size.name}${size.filterName ? ` (${size.filterName})` : ''}`,
            sizeName: size.name,
            colorName: size.filterName,
            price: Number(size.price),
            discountPrice: Number(size.discountPrice),
            posterImageUrl: matchingImage?.imageUrl || prod.posterImageUrl,
            hoverImageUrl: hoverImageMatch ? hoverImageMatch.imageUrl : prod.hoverImageUrl,
            stock: size.stock ?? prod.stock,
          });
        }
      });
    } else if (prod.filter?.[0].additionalInformation.length) {
      prod.filter?.[0].additionalInformation.forEach((size) => {
        const variationKey = `${size.name}`;
        
        const matchingImage = prod.productImages.find(
          (img) =>
            img.color?.toLowerCase() === size.name?.toLowerCase());

        const hoverImageMatch = prod.productImages.find(
          (hoverImg) =>
            hoverImg.color?.toLowerCase() === size.name?.toLowerCase() &&
            hoverImg.imageUrl !== matchingImage?.imageUrl
        );

        if (!uniqueVariations.has(variationKey)) {
          uniqueVariations.set(variationKey, {
            ...prod,
            name: prod.name,
            displayName: `${prod.name} - ${size.name}`,
            sizeName: undefined,
            colorName: size.name,
            price: Number(size.price),
            discountPrice: Number(size.discountPrice),
            posterImageUrl: matchingImage?.imageUrl || prod.posterImageUrl,
            hoverImageUrl: hoverImageMatch ? hoverImageMatch.imageUrl : prod.hoverImageUrl,
            stock: size.stock ?? prod.stock,
          });
        }
      });
    }

    return Array.from(uniqueVariations.values());
  });
};


export const variationName = ({ product }: { product: IProduct }) => {
  if (product.sizeName && product.colorName && product.sizeName.includes(product.colorName)) {
    return product.displayName = `${product.name} -  ${product.sizeName}`;
  }
  else if (product.colorName && !product.sizeName) {
    return product.displayName = `${product.name} -  (${product.colorName})`;
  } else {
    return product.displayName;
  }
}

export const getProductStock = ({ product }: { product: CartItem }) => {
  if (!product.selectedSize && product.selectedfilter) {
    console.log(product, "productHeader")
  }

  if (product.selectedSize && product.selectedfilter) {
    const findSize = product.sizes?.find(
      (prod) => (prod.name === product.selectedSize?.name) && (prod.filterName ? prod.filterName === product.selectedfilter?.name : true)
    );
    return Number(findSize?.stock);
  } else if (!product.selectedSize && product.selectedfilter) {
    const findFilter = product.filter?.[0]?.additionalInformation?.find(
      (prod) => prod.name === product.selectedfilter?.name
    );
    return Number(findFilter?.stock);
  } else {
    return Number(product.stock);
  }
};



export const getAllStock = (product : CartItem | any ) => {
  // console.log(product, "getAllStock")
  if (!product) return '';
  let totalStock: number = 0;

  if (product.sizes && product.sizes.length > 0) {
    const sizesStock = product.sizes.find((value:any) => value.name?.trim() === product.sizeName?.trim());
    if (sizesStock) {
      totalStock = Number(sizesStock.stock);

    }

  } else if (product.filter && product.filter.length > 0) {
    let filterStock = product.filter[0].additionalInformation.find((value:any) => value.name?.trim() === product.colorName?.trim());
    if (filterStock) {
      totalStock = Number(filterStock.stock);
    }
  } else {
    totalStock = Number(product.stock);
  }

// console.log(totalStock, "getAllStock")


  return totalStock;
};
