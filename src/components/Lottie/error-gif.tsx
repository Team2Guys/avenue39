'use client';
import React from 'react';
import { useLottie } from 'lottie-react';

const style = {
  height: 250,
};

const Lottie = ({ data }: any) => {
  const options = {
    animationData: data,
    loop: true,
  };

  const { View } = useLottie(options, style);

  return <>{View}</>;
};

export default Lottie;
