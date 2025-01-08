import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiLogInCircle } from 'react-icons/bi';
import { IoBagOutline } from 'react-icons/io5';
import { MdCategory } from 'react-icons/md';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Popover } from 'antd';
import { useSelector } from 'react-redux';
import { State } from '@/redux/store';
import { menuData } from '@/data/menu';
import { generateSlug } from '@/config';
import { IoIosHeartEmpty } from 'react-icons/io';
import SocialLink from '../social-link';
import Image from 'next/image';
import { loggedInUserAction } from '@/redux/slices/user/userSlice';
import Cookies from 'js-cookie';
import { useAppDispatch } from '@components/Others/HelperRedux';
import { useRouter } from 'next/navigation';
const BottomBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const userDetails = useSelector(
    (state: State) => state.usrSlice.loggedInUser,
  );
  const route = useRouter();

  const hide = () => {
    setOpen(false);
  };
  const dispatch = useAppDispatch();

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const logoutHhandler = () => {
    try {
      Cookies.remove('user_token', { path: '/' });

      dispatch(loggedInUserAction(null));

      route.push('/login');
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
 
  const { loggedInUser } = useSelector((state: State) => state.usrSlice)
  const [profilePhoto, setProfilePhoto] = useState<any>([]);
  useEffect(() => {
    if (loggedInUser) {
      setProfilePhoto({imageUrl : loggedInUser?.userImageUrl, public_id : loggedInUser.userPublicId})
    }
  
  }, [loggedInUser])
  
  return (
    <div className="flex justify-between items-center px-4 md:hidden py-3 border-t w-full fixed bottom-0 bg-white z-50">
      <Link href={'/'}>
        <AiOutlineHome size={25} />
      </Link>
      <Link href={'/wishlist'}>
        <IoIosHeartEmpty size={25} />
      </Link>
      {/* <Link href={"/"}><FaRegHeart size={25} /></Link> */}

      <Sheet>
        <SheetTrigger asChild>
          <div className="relative w-14">
            <div className="triangle-shape bg-black text-white cursor-pointer z-50">
              <MdCategory size={25} />
            </div>
          </div>
        </SheetTrigger>
        <SheetContent className="pb-5">
          <div className="pt-10 space-y-2">
            {Object.keys(menuData).map((menu, menuIndex) => {
              if (
                menu === 'tvCabinets' ||
                menu === 'clearance' ||
                menu === 'megaSale'
              ) {
                const isMegaSale = menu === 'megaSale';

                return (
                  <SheetClose asChild key={menuIndex}>

                  <div
                    
                    onClick={()=>{route.push(`/products/${generateSlug(menuData[menu][0]?.title || '')}`)}}
                    
                    className={`block font-bold hover:underline ${isMegaSale ? 'text-red-600' : ''}`}
                    >
                    {menu.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  </div>
                    </SheetClose>
                );
              }

              return (
                <Accordion
                  key={menuIndex}
                  type="single"
                  collapsible
                  className="w-full "
                >
                  <AccordionItem value={`item-${menuIndex}`}>
                    <AccordionTrigger className="font-bold">
                      {menu.replace(/([A-Z])/g, ' $1').toUpperCase()}
                    </AccordionTrigger>
                    <AccordionContent>
                      <SheetClose asChild>
                        <div className="grid font-semibold space-y-2 px-4">
                          {menuData[menu].map((subItem, subIndex) => (
                            <div
                              key={subIndex}
                              onClick={()=>{route.push(`/products/${generateSlug(subItem.title || '')}`)}}
                             
                              className="hover:underline font-semibold text-15 flex gap-2 items-center"
                            >
                              {subItem.title}
                            </div>
                          ))}
                        </div>
                      </SheetClose>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            })}
          </div>
          <div className='mt-3'>
          <SocialLink />
          </div>
        </SheetContent>
      </Sheet>

      <Link href={'/cart'}>
        <IoBagOutline size={25} />
      </Link>
      {!userDetails ? (
        <Link href={'/login'}>
          <BiLogInCircle size={25} />
        </Link>
      ) : (
        <Popover
          content={
            <>
              <div className="flex flex-col gap-2 w-auto px-5 ">
                <Link
                  className="text-black hover:text-primary"
                  href="/profile"
                  onClick={hide}
                >
                  Profile
                </Link>
                <Link
                  className="text-black hover:text-primary"
                  href="/order-history"
                  onClick={hide}
                >
                  Order History
                </Link>
                <Link
                  className="text-black hover:text-primary"
                  href="/login"
                  onClick={() => logoutHhandler()}
                >
                  Logout
                </Link>
              </div>
            </>
          }
          title=""
          placement="bottomRight"
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <div className="flex gap-2 items-center whitespace-nowrap cursor-pointer">
          <div className="h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    src={
                      profilePhoto && profilePhoto.imageUrl
                        ? profilePhoto.imageUrl
                        : "/images/dummy-avatar.jpg"
                    }
                    width={55}
                    height={55}
                    alt={loggedInUser.name}
                  />
                </div>
          </div>
        </Popover>
      )}
    </div>
  );
};

export default BottomBar;
