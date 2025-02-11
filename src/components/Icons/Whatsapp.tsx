
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import whatsapp from "../../../public/assets/whatsapp.png"
import { WhatsAppInfo } from '@/data/data';

const WhatsIcon = () => {
  return (
    <Link
      href={`https://wa.me/${WhatsAppInfo.number.replaceAll(' ', '')}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-36 md:bottom-6 right-6 " style={{zIndex:205}}>
      <Image width={100} height={100} className='w-14 h-14' src={whatsapp} alt='whatsapp'/>
    </Link>
  );
};

export default WhatsIcon;
