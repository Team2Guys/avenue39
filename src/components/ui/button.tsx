import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-black text-white hover:text-black hover:bg-white hover:border-black hover:border',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-black hover:bg-lightbackground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'bg-white text-black underline-offset-4 hover:bg-black hover:text-white rounded-3xl text-sm',
        login:
          'bg-black text-white underline-offset-4 hover:bg-black hover:text-white rounded-full text-sm',
        underline: 'bg-transparent text-black hover:underline text-sm',
        black:
          'bg-black text-white hover:text-black hover:bg-white text-sm rounded-md border-2 border-black ',
        main:
          'bg-main text-white hover:text-main hover:bg-transparent text-sm rounded-md border border-main ',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  disable?: boolean | null | undefined;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps | any>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
