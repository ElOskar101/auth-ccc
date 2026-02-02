import React from "react"
import { cn } from "@/app/libs/utils.ts";

export const RoundedTinyButton = ({ children, className, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...props}
            className={cn('p-2 hover:cursor-pointer hover:scale-110 rounded-full bg-white shadow-lg dark:bg-zinc-700', className)}>
            {children}
        </button>
    );
}
