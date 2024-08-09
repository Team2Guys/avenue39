import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiSolidToTop } from 'react-icons/bi';
import { FaRegHeart } from 'react-icons/fa';
import { IoBagOutline } from 'react-icons/io5';
import { MdCategory } from 'react-icons/md';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { CgLogIn } from 'react-icons/cg';


interface AccordionItemType {
  title: string;
  subItems: string[];
}

interface MenuDataLink {
  type: 'link';
  title: string;
  href: string;
}

interface MenuDataAccordion {
  type: 'accordion';
  title: string;
  items: AccordionItemType[];
}

type MenuData = MenuDataLink | MenuDataAccordion;

// Example data
const menuData: MenuData[] = [
  {
    type: 'link',
    title: 'DINING',
    href: '/'
  },
  {
    type: 'accordion',
    title: 'LIVING',
    items: [
      {
        title: 'LIVING',
        subItems: ['Living Storage', 'Sofa', 'Armchairs', 'Accent Chairs', 'Coffee Tables']
      },
      {
        title: 'DINING',
        subItems: [ 'Armchairs', 'Accent Chairs', 'Coffee Tables,Living Storage', 'Sofa']
      }
    ]
  },
  {
    type: 'link',
    title: 'BEDROOM',
    href: '/'
  }
];

const BottomBar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <div className='flex justify-between items-center px-5 md:hidden py-3 border-t w-full fixed bottom-0 bg-white z-50'>
      <Link href={"/"}><AiOutlineHome size={25} /></Link>
      <Link href={"/"}><FaRegHeart size={25} /></Link>
      
      <Sheet>
        <SheetTrigger asChild>
          <div className='relative'>
            <div className='triangle-shape bg-black text-white cursor-pointer z-50'><MdCategory size={25} /></div>
          </div>
        </SheetTrigger>
        <SheetContent className="pb-5">
          <div className='pt-10 space-y-1'>
            {menuData.map((item, index) => {
              if (item.type === 'link') {
                return (
                  <Link key={index} href={item.href} className='block font-bold hover:underline'>
                    {item.title}
                  </Link>
                );
              } else if (item.type === 'accordion') {
                return (
                  <Accordion key={index} type="single" collapsible className="w-full space-y-1">
                    {item.items.map((accordionItem, accIndex) => (
                      <AccordionItem key={accIndex} value={`item-${accIndex}`}>
                        <AccordionTrigger className='font-bold'>{accordionItem.title}</AccordionTrigger>
                        <AccordionContent>
                          <div className='grid space-y-2 font-semibold px-4'>
                            {accordionItem.subItems.map((subItem, subIndex) => (
                              <Link key={subIndex} className='hover:underline font-semibold text-15 flex ga-2 items-center' href={"/"}>
                                {subItem}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                );
              }
              return null;
            })}
          </div>
        </SheetContent>
      </Sheet>
            
      <Link href={"/"}><IoBagOutline size={25} /></Link>
      {/* <Link href={"/"}><CgLogIn size={25} /></Link> */}
      <Popover
              content={
                <>
                  <div className="flex flex-col gap-2 w-auto px-5 ">
                    <Link className='text-black hover:text-primary' href="/profile" onClick={hide}>
                      Profile
                    </Link>
                    <Link className='text-black hover:text-primary' href="/order-history" onClick={hide}>
                      Order History
                    </Link>
                    <Link className='text-black hover:text-primary' href="/login" onClick={hide}>
                      Logout
                    </Link>
                  </div>
                </>
              }
              title=""
              placement='bottomRight'
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <div className="flex gap-2 items-center whitespace-nowrap cursor-pointer">
                <Avatar icon={<UserOutlined />} />
              </div>
        </Popover>
    </div>
  );
};

export default BottomBar;
