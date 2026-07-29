import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PanelProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
  /** Luminous hairline along the top edge. */
  sheen?: boolean;
};

/**
 * The bento container. Every block on the page sits in one of these:
 * surface fill, hairline stroke, 20px radius, deep soft shadow.
 * Server component — no interactivity.
 */
export function Panel({
  children,
  className,
  as: Tag = 'div',
  id,
  sheen = true,
}: PanelProps) {
  return (
    <Tag
      id={id}
      className={cn('panel relative overflow-hidden', sheen && 'sheen', className)}
    >
      {children}
    </Tag>
  );
}

/** Section header used inside panels: title on the left, action on the right. */
export function PanelHeading({
  title,
  action,
  href = '#',
  className,
}: {
  title: string;
  action?: string;
  href?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <h2 className="text-[17px] font-semibold tracking-tight">{title}</h2>
      {action && (
        <a
          href={href}
          className="text-[13px] text-accent transition-colors duration-500 hover:text-accent-hover"
        >
          {action}
        </a>
      )}
    </div>
  );
}
