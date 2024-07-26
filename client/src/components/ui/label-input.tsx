'use client';
import * as React from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelClass?: string;
}

const LabelInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, labelClass, type, id, name, label, onChange, value, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [inputType, setInputType] = React.useState(type);

    const toggleShowPassword = () => {
      setShowPassword((prev) => !prev);
      setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
    };

    return (
      <div className="relative flex flex-col w-full">
        <Label htmlFor={id} className={cn(
              'mb-1 px-8 text-sm font-semibold text-17 text-[#666666] ',
              labelClass,
            )} >
          {label}
        </Label>
        <div className="relative flex items-center h-[58px] w-full mt-2 rounded-full border-input bg-[#F6F6F6]">
          <input
            type={inputType}
            id={id}
            name={name}
            onChange={onChange}
            value={value}
            className={cn(
              'flex-grow h-full rounded-full border-0 bg-[#F6F6F6] pl-8 pr-12 py-2  focus-visible:outline-none focus-visible:ring-0 text-15 font-medium outline-none focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ',
              className,
            )}
            ref={ref}
            {...props}
          />
          {type === 'password' && (
            <span
              className="absolute right-8 cursor-pointer"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <AiFillEyeInvisible className="h-6 w-6 text-black" />
              ) : (
                <AiFillEye className="h-6 w-6 text-black" />
              )}
            </span>
          )}
        </div>
      </div>
    );
  },
);

LabelInput.displayName = 'LabelInput';

export { LabelInput };