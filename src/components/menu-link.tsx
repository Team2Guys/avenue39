import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface MenuItem {
  icon: string | StaticImageData;
  title: string;
  link: string;
}

interface MenuLinkProps {
  menudata: MenuItem[];
}

const MenuLink: React.FC<MenuLinkProps> = ({ menudata }) => {
  return (
    <>
      {menudata.map((item, index) => (
        <Link href={item.link} className="flex gap-2 items-center" key={index}>
          <div className="rounded-md h-20 w-20 border">
            <Image src={item.icon} alt="menu" width={80} height={80} />
          </div>
          <span className="text-17 font-semibold">{item.title}</span>
        </Link>
      ))}
    </>
  );
};

export default MenuLink;
