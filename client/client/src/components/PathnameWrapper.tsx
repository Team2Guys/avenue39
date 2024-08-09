'use client';

import { usePathname } from 'next/navigation';

import Authhook from '@/hooks/AuthHook';
import Footer from './footer/footer';
import TopNav from './nav/top-nav';
import Navbar from './nav/nav-bar';
import MenuBar from './nav/menu-bar';
import BottomBar from './nav/bottom-bar';

const PathnameWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() as string;

  const withoutHeaderPages = [
    '/login',
    '/register',
    '/superAdminlogin',
    '/forgot-password',
    '/dashboard',
  ];

  return (
    <>
      {withoutHeaderPages.includes(pathname) ||
      pathname.split('/').includes('dashboard') ? null : (
        <>
          <TopNav />
          <Navbar />
          <MenuBar />
          <BottomBar />
        </>
      )}
      {children}
      {pathname !== '/' &&
      (withoutHeaderPages.includes(pathname) ||
        pathname.split('/').includes('dashboard')) ? null : (
        <Footer />
      )}
    </>
  );
};

export default Authhook(PathnameWrapper);
