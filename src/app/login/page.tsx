'use client';
import React, { Fragment, useState } from 'react';
import { LoginForm } from '@/components/register/login-form';
import Services from '@/components/services/services';
import { useRouter } from 'next/navigation';
import UseAuth from '@/hooks/useAuth';
const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const router = useRouter();
  const handleTabChange = (value: string) => {
    router.push(`/${value}`);
    setActiveTab("login");
  };
  return (
    <Fragment>
      <div className="grid grid-cols-1 justify-center px-2 pt-5">
        <div
          className={`${activeTab === 'login' ? 'max-w-screen-sm' : 'max-w-screen-md'} w-full mx-auto px-2 py-5 xs:p-5 sm:p-10 shadow-[0px_3px_6px_#00000029] rounded-md mb-5 h-fit login-form-wrapper`}
        >
          <h1 className='text-center text-20 sm:text-3xl font-semibold mb-4'>Welcome to Avenue39</h1>
          <LoginForm onTabChange={handleTabChange} activeTab={activeTab} />
        </div>
      </div>
      <Services className="custom-services-wrapper" />
    </Fragment>
  );
};

export default UseAuth(Login);
