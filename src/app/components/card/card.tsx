import React from 'react';
import {cn} from "@/app/libs/utils.ts";

const cardSizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    '2xl': "max-w-2xl",
    '3xl': "max-w-3xl",
} as const;

type CardSize = keyof typeof cardSizes;

interface CardProps extends React.ComponentProps<'div'> {
    size?: CardSize;
}


export const Card = React.forwardRef<HTMLDivElement, CardProps>(({className,  size = 'md', ...props}, ref) => (
    <div
        {...props}
        ref={ref}
        data-slot="card"
        className={cn("flex-none w-full shadow-md rounded-xl bg-white border border-gray-50 dark:bg-zinc-800 dark:border-zinc-600 p-4"
            ,cardSizes[size], className)}
    >
    </div>
));

Card.displayName = 'Card';
