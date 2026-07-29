import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-md border px-2 py-[3px] text-[11px] font-medium',
  {
    variants: {
      variant: {
        default: 'border-fg/10 bg-fg/[0.05] text-fg2',
        accent: 'border-accent/20 bg-accent/10 text-accent',
        success: 'border-success/20 bg-success/10 text-success',
        warning: 'border-warning/20 bg-warning/10 text-warning',
        info: 'border-info/20 bg-info/10 text-info',
      },
      shape: {
        square: 'rounded-md',
        pill: 'rounded-full px-2.5',
      },
    },
    defaultVariants: { variant: 'default', shape: 'square' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, shape, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, shape }), className)} {...props} />;
}

/** Small monospace tag used for tech chips on cards. */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-fg/[0.08] bg-fg/[0.04] px-2 py-[3px] font-mono text-[10.5px] text-fg2">
      {children}
    </span>
  );
}
