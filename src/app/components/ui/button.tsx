import React from "react";
import { cn } from "@/app/libs/utils.ts"

const baseStyle =   'cursor-pointer shadow-lg inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-1 disabled:opacity-50 disabled:pointer-events-none';

const variants = {
    primary: 'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-600',
    neutral: 'bg-gray-200 text-gray-700 hover:bg-gray-200 focus:ring-gray-400 dark:bg-zinc-700 dark:text-gray-100 dark:hover:bg-zinc-600',
    danger:  'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
}

const sizes = {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2.5',
    lg: 'px-5 py-3',
}

type ButtonVariant = keyof typeof variants
type ButtonSize = keyof typeof sizes

interface props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string,
    variant?: ButtonVariant,
    size?: ButtonSize,
}

export const Button = ({variant = 'primary', size = 'md', className, children, ...props}: props) => {
    return (
        <button
            {...props}
            className={cn(baseStyle, variants[variant], sizes[size], className)}
        >
            {children}
        </button>
    )
}

/*
<button {...props}
                className={`hover:cursor-pointer text-white w-full bg-blue-700 box-border border border-transparent hover:bg-blue-800/90
                 focus:ring-1 disabled:bg-blue-500 focus:ring-blue-600 shadow-xs font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none ${props.className}`}>
            {children}
        </button>
 */