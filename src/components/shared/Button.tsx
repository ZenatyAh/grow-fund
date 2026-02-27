import React, { forwardRef } from 'react';
import { mergeClasses as cn, type ButtonVariant, type ButtonProps, type ButtonSize } from '@/lib/utils';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            fullWidth = false,
            disabled,
            children,
            type = 'button',
            ...props
        },
        ref
    ) => {
        const baseStyles = "inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 h-12 text-center font-tajawal font-bold text-[18px] leading-[1.6] cursor-pointer";

        const variants: Record<ButtonVariant, string> = {
            primary: "bg-[var(--default,#2563EB)] text-white hover:bg-blue-700 shadow-sm",
            subtle: "bg-[#F8FAFC] border border-[#CBD5E1] text-slate-900 hover:bg-slate-50",
        };

        const sizes: Record<ButtonSize, string> = {
            sm: "px-4 min-w-[80px]",
            md: "px-8 min-w-[117px]",
            lg: "px-8 w-full max-w-[780px]"
        };

        return (
            <button
                ref={ref}
                type={type}
                disabled={disabled}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    fullWidth && "w-full",
                    className
                )}
                {...props}
            >
                <span className="truncate">{children}</span>
            </button>
        );
    }
);

Button.displayName = 'Button';
