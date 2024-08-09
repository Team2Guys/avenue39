import React from 'react';
import Image from 'next/image';
import { BannerImage } from '@/types/types';

type ImageBannerProps = {
  bannerImage: BannerImage;
};

const ImageBanner: React.FC<ImageBannerProps> = ({ bannerImage }) => {
  return (
    <div className="">
      <Image
        className="!position-unset"
        src={bannerImage.image}
        alt={bannerImage.altText}
        objectFit="cover"
        quality={100}
      />
    </div>
  );
};

export default ImageBanner;
