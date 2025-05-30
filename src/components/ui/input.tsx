'use client';
import * as React from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FaRegEnvelopeOpen, FaRegUser } from 'react-icons/fa';
import { IoPhonePortraitOutline, IoSearchSharp } from 'react-icons/io5';
import { RiLockPasswordLine } from 'react-icons/ri';

import { cn } from '@/lib/utils';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id, name, onChange, value, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [inputType, setInputType] = React.useState(type);

    const toggleShowPassword = () => {
      setShowPassword((prev) => !prev);
      setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
    };

    const getIcon = () => {
      switch (type) {
        case 'text':
          return <FaRegUser className="text-20 text-black" />;
        case 'email':
          return <FaRegEnvelopeOpen className="text-20 text-black" />;
        case 'search':
          return <IoSearchSharp className="text-20 text-black" />;
        case 'username':
          return <FaRegUser className="text-20 text-black" />;
        case 'phone':
          return <IoPhonePortraitOutline className="text-20 text-black" />;
        case 'password':
          return <RiLockPasswordLine className="text-20 text-black" />;
        default:
          return null;
      }
    };

    return (
      <div className="relative flex items-center h-[45px] sm:h-[76px] w-full rounded-full border-input custom-login-input bg-[#F6F6F6]">
        <div className="absolute left-8 custom-login-input-icon">
          {getIcon()}
        </div>
        <input
          type={inputType}
          id={id}
          name={name}
          onChange={onChange}
          value={value}
          className={cn(
            'flex-grow h-[full] rounded-full border-0 bg-[#F6F6F6] pl-20 pr-12 py-2  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 text-15 font-medium outline-none focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-15 placeholder:font-bold custom-input-bg w-[100%]',
            className,
          )}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <span
            className="absolute right-8 cursor-pointer custom-input-password-icon"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <AiFillEyeInvisible className="text-20 text-black" />
            ) : (
              <AiFillEye className="text-20 text-black" />
            )}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
