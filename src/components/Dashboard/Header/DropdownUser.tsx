'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@components/Others/HelperRedux';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa6';
import { RiLogoutBoxLine } from 'react-icons/ri';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);
  const router = useRouter();

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const logoutHhandler = () => {
    try {
      Cookies.remove('2guysAdminToken');
      Cookies.remove('superAdminToken');
      router.push('/dashboard/Admin-login');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="relative z-99">
      <div
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center py-3 gap-4 text-black cursor-pointer "
      >
        <div>
          <span className="hidden text-right lg:block">
            <span className="block text-sm font-medium text-black ">
              {loggedInUser ? loggedInUser.fullname : null}
            </span>
            <span className="block text-xs text-black ">
              {loggedInUser?.role}
            </span>
          </span>
        </div>
        <div className=" flex items-center gap-3">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <Image
              src={
                loggedInUser && loggedInUser.profilePhoto
                  ? loggedInUser.profilePhoto.imageUrl
                  : '/images/dummy-avatar.jpg'
              }
              width={55}
              height={55}
              alt="User"
            />
          </div>
          <MdKeyboardArrowDown className="text-white" />
        </div>
      </div>
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-1 flex w-62 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col w-44 space-y-6 border-b border-stroke px-6 py-3 dark:border-strokedark">
          <li>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base text-black "
            >
              <FaRegUser size={20} />
              My Profile
            </Link>
          </li>
        </ul>
        <button
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base text-black "
          onClick={logoutHhandler}
        >
          <RiLogoutBoxLine size={20} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;
