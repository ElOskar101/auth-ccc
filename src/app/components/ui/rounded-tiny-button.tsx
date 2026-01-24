import React from "react"

export const RoundedTinyButton = ({ children, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...props}
            className="p-2 hover:cursor-pointer hover:scale-110 rounded-full bg-white shadow-lg dark:bg-zinc-700">
            {children}
        </button>
    );
}
