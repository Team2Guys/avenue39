import Link from 'next/link';
import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { FaPinterestP } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa';

interface LinkSocial {
  className?: string;
  linkClass?: string;
  socialSize?: string;
  iconColor?: string;
  onLinkClick?: () => void;
}

const SocialLink: React.FC<LinkSocial> = ({
  className,
  linkClass,
  socialSize,
  iconColor,
  onLinkClick
}) => {
  return (
    <div className={`flex justify-start gap-3 md:gap-7 ${className}`}>
      <div onClick={onLinkClick}>
        <Link
          href="https://facebook.com/avenue39home"
          target="_blank"
          className={`${linkClass}`}
        >
          <FaFacebookF
            className={`text-[16px] md:text-[25px] ${socialSize} ${iconColor ? iconColor : 'text-white'}`}
            style={{ strokeWidth: 1 }}
          />
        </Link>
      </div>
      <div onClick={onLinkClick}>
        <Link
          href="https://instagram.com/avenue39home"
          target="_blank"
          className={`${linkClass}`}
        >
          <FaInstagram
            className={`text-[16px] md:text-[23px] ${socialSize} ${iconColor ? iconColor : 'text-white'}`}
            style={{ strokeWidth: 2 }}
          />
        </Link>
      </div>
      <div onClick={onLinkClick}>
        <Link
          href="https://www.pinterest.com/avenue39home"
          target="_blank"
          className={`${linkClass}`}
        >
          <FaPinterestP
            className={`text-[16px] md:text-[23px] ${socialSize} ${iconColor ? iconColor : 'text-white'}`}
            style={{ strokeWidth: 2 }}
          />
        </Link>
      </div>
      {/* <Link
        href="https://twitter.com/avenue39home"
        target="_blank"
        className={`${linkClass}`}
      >
        <FaXTwitter className={`text-[16px] md:text-[20px] ${socialSize}`} />
      </Link> */}
      {/* <Link href='https://www.linkedin.com/company/avenue39home' target='_blank' className={`${linkClass}`}><FaLinkedinIn className={`text-[16px] md:text-[20px] ${socialSize}`} /></Link> */}
    </div>
  );
};

export default SocialLink;
