import { H1, P14 } from '@/styles/typo';
import { ITextIcon } from '@/types/types';
import Link from 'next/link';
import React from 'react';

const TextIcon = ({ Icon, Title, link }: ITextIcon) => {
  return (
    <Link href={link} target="_blank" className="flex items-center gap-2">
      {Icon}
      <P14>{Title}</P14>
    </Link>
  );
};

export default TextIcon;
