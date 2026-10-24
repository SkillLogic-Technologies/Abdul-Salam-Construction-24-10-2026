import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  arrowDirection?: 'right' | 'up-right';
  isLoading?: boolean;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export type ButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;

// Studio Minimal button: sharp pill shape, uppercase label, a bottom-up fill
// sweep on hover done in pure CSS (no per-frame JS) — plain transform/opacity
// transitions only, kept off any animation library so a row of these never
// costs more than a couple of composited layers.
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  showArrow = false,
  isLoading = false,
  href,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    'group relative inline-flex items-center justify-center overflow-hidden font-sans font-medium transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brick)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none rounded-full hover:-translate-y-px active:translate-y-0';

  const sizeStyles = {
    sm: 'h-11 px-5 text-[13px] uppercase tracking-[0.06em]',
    md: 'h-14 px-8 text-[15px] uppercase tracking-[0.06em]',
    lg: 'h-16 px-10 text-base uppercase tracking-[0.06em]'
  };

  const variantConfig: Record<
    string,
    { base: string; text: string; sweep: string }
  > = {
    primary: {
      base: 'bg-[var(--brick)] border border-[var(--brick)] shadow-[0_8px_20px_rgba(201, 162, 74,0.22)]',
      text: 'text-white',
      sweep: 'bg-[var(--brick-deep)]'
    },
    secondary: {
      base: 'bg-transparent border border-[var(--brick)]',
      text: 'text-[var(--brick)] group-hover:text-white',
      sweep: 'bg-[var(--brick)]'
    },
    outline: {
      base: 'bg-transparent border border-[var(--line)]',
      text: 'text-[var(--ink)] group-hover:text-white',
      sweep: 'bg-[var(--ink)]'
    },
    white: {
      base: 'bg-white border border-[var(--line)]',
      text: 'text-[var(--ink)]',
      sweep: 'bg-[var(--canvas-alt)]'
    },
    dark: {
      base: 'bg-[var(--brass)] border border-[var(--brass)]',
      text: 'text-white',
      sweep: 'bg-[#050810]'
    },
    ghost: {
      base: 'bg-transparent',
      text: 'text-[var(--brick)] group-hover:text-[var(--brick-deep)]',
      sweep: 'bg-transparent'
    }
  };

  const cfg = variantConfig[variant];

  const content = (
    <>
      {variant !== 'ghost' && (
        <span
          aria-hidden
          className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100 ${cfg.sweep}`}
        />
      )}
      {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin relative z-10" /> : null}
      <span className={`relative z-10 inline-flex items-center ${cfg.text}`}>{children}</span>
      {showArrow && !isLoading && (
        <ArrowRight
          className={`relative z-10 w-4 h-4 ml-2 transition-transform duration-200 ease-out group-hover:translate-x-1.5 ${cfg.text}`}
        />
      )}
    </>
  );

  const sharedClassName = `${baseStyles} ${sizeStyles[size]} ${cfg.base} ${className}`;

  if (href) {
    return (
      <a href={href} className={sharedClassName} onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}>
        {content}
      </a>
    );
  }

  return (
    <button
      className={sharedClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
};
