import { cn } from '@/lib/utils';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning';
  className?: string;
}

export function Badge({ children, variant = 'primary', className }: BadgeProps) {
  const variants = {
    primary: 'bg-accent-soft text-accent',
    secondary: 'bg-secondary text-secondary-foreground',
    outline: 'border border-border bg-transparent',
    success: 'bg-green-500/15 text-green-400',
    warning: 'bg-amber-500/15 text-amber-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors duration-200',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}