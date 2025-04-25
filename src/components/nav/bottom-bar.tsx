import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { Popover } from 'antd';
import { useSelector } from 'react-redux';
import { State } from '@/redux/store';
import Image from 'next/image';
import { loggedInUserAction } from '@/redux/slices/user/userSlice';
import Cookies from 'js-cookie';
import { useAppDispatch } from '@components/Others/HelperRedux';
import { useRouter } from 'next/navigation';
const CartItems = dynamic(() => import('../cart/items'), { ssr: false });
const WishlistCount = dynamic(() => import('../wishlist/wishlist'), { ssr: false });
import { IoPersonOutline } from 'react-icons/io5';
import { TiArrowSortedUp } from 'react-icons/ti';

const BottomBar = () => {
  const [open, setOpen] = useState(false);
  const userDetails = useSelector(
    (state: State) => state.usrSlice.loggedInUser,
  );
  const route = useRouter();
  const hide = () => {
    setOpen(false);
  };
  const dispatch = useAppDispatch();
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
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

  const { loggedInUser } = useSelector((state: State) => state.usrSlice);
  const [profilePhoto, setProfilePhoto] = useState<any>([]);

  useEffect(() => {
    if (loggedInUser) {
      setProfilePhoto({
        imageUrl: loggedInUser?.userImageUrl,
        public_id: loggedInUser.userPublicId,
      });
    }
  }, [loggedInUser]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex justify-between items-center px-4 md:hidden py-3 border-t w-full fixed bottom-0 bg-white z-[100]">
      <Link href={'/'}>
        <AiOutlineHome size={25} />
      </Link>
      <WishlistCount />
      {windowWidth < 895 && (
        <div className='relative'>
          <CartItems isMoblie={true} />
        </div>
      )}
      
      {!userDetails ? (
        <Link href={'/login'}>
          <IoPersonOutline size={22} />
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
                    : '/images/dummy-avatar.jpg'
                }
                width={55}
                height={55}
                alt={loggedInUser.name}
              />
            </div>
          </div>
        </Popover>
      )}
      <div className='flex flex-col items-center' onClick={scrollToTop}>
      <TiArrowSortedUp size={30} />
      <p className='text-11 -mt-[10px]'>On Top</p>
      </div>
    </div>
  );
};

export default BottomBar;
