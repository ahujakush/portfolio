import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-500 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        /* Solid light button — the primary CTA in the hero */
        solid:
          'bg-fg text-bg hover:bg-fg/90 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-16px_rgb(var(--fg)/0.6)]',
        /* Brand blue */
        accent:
          'bg-accent text-white hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-glow',
        /* Dark tile — secondary CTA */
        tile: 'tile text-fg hover:border-accent/35 hover:bg-accent/[0.07] hover:-translate-y-0.5',
        /* Frosted overlay */
        glass: 'glass text-fg hover:border-accent/35 hover:-translate-y-0.5',
        ghost: 'text-fg2 hover:bg-fg/[0.06] hover:text-fg',
      },
      size: {
        sm: 'h-9 px-3.5 text-[13px]',
        default: 'h-11 px-5',
        lg: 'h-12 px-6 text-[15px]',
        icon: 'size-9 rounded-lg',
        pill: 'h-10 rounded-full px-5',
      },
    },
    defaultVariants: { variant: 'tile', size: 'default' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
