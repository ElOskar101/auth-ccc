import React from 'react'
import { cn } from '@/app/libs/utils'

type SpinnerSize = 'sm' | 'md' | 'lg'
type SpinnerVariant = 'primary' | 'neutral' | 'white'

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: SpinnerSize
    variant?: SpinnerVariant
}

const sizes: Record<SpinnerSize, string> = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-4',
}

const variants: Record<SpinnerVariant, string> = {
    primary: 'border-blue-600 border-t-transparent',
    neutral: 'border-gray-400 border-t-transparent',
    white: 'border-white border-t-transparent',
}

export function Spinner({
                            size = 'md',
                            variant = 'primary',
                            className,
                            ...props
                        }: SpinnerProps) {
    return (
        <div
            role="status"
    aria-label="Cargando"
    className={cn(
        'inline-block rounded-full animate-spin',
        sizes[size],
        variants[variant],
        className
)}
    {...props}
    />
)
}
