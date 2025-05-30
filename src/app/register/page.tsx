'use client';
const LoginForm = dynamic(() => import('@/components/register/login-form'))
import Services from '@/components/services/services';
import UseAuth from '@/hooks/useAuth';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Register = () => {
  const [activeTab, setActiveTab] = useState('register');
  console.log(setActiveTab, 'setActiveTab');
  const router = useRouter();
  const handleTabChange = (value: string) => {
    router.push(`/${value}`);
  };
  return (
    <>
      <div className="grid grid-cols-1 justify-center px-2 pt-5">
        <div
          className={`max-w-screen-sm w-full mx-auto px-2 py-5 xs:p-5 sm:p-10 shadow-[0px_3px_6px_#00000029] rounded-md h-fit mb-5 login-form-wrapper`}
        >
          <h1 className='text-center text-20 sm:text-3xl font-semibold mb-4'>Welcome to Avenue39</h1>
          <LoginForm onTabChange={handleTabChange} activeTab={activeTab} />
        </div>
      </div>
      <Services className="custom-services-wrapper" />
    </>
  );
};

export default UseAuth(Register);
