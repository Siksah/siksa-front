import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Typography } from '@/components/ui/typography';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-normal font-sans transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[0.1875rem] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-orange-60 active:bg-orange-60',
        destructive:
          'bg-destructive text-white hover:bg-destructive focus-visible:ring-destructive/20',
        outline:
          'border border-border bg-background shadow-xs hover:bg-secondary hover:text-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-grey-20',
        navy: 'bg-navy text-white hover:opacity-90 active:opacity-80',
        'orange-text':
          'bg-white text-orange-50 border-0 hover:bg-grey-10 active:bg-grey-20',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        handwriting:
          'bg-navy text-white font-sans hover:opacity-90 active:opacity-80',
      },
      size: {
        default: 'h-[3.3125rem] px-6 text-md has-[>svg]:px-4',
        sm: 'w-[10.125rem] h-[3.3125rem] px-[3rem] py-[0.75rem] text-md has-[>svg]:px-4',
        lg: 'w-[20rem] h-[4.0625rem] px-[5.3125rem] py-[0.3125rem] text-[2.5rem] has-[>svg]:px-6',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  sketchyIntensity?: number;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  sketchyIntensity = 0.7,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  const isHandwriting = variant === 'handwriting';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {isHandwriting && typeof children === 'string' ? (
        <Typography
          as="span"
          sketchy={true}
          sketchyIntensity={sketchyIntensity}
        >
          {children}
        </Typography>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
