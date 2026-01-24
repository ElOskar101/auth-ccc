import React from "react";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button ({children, ...props}: Props) {
    return (
        <button {...props}
                className={`hover:cursor-pointer text-white w-full bg-blue-700 box-border border border-transparent hover:bg-blue-800/90
                 focus:ring-1 disabled:bg-blue-500 focus:ring-blue-600 shadow-xs font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none ${props.className}`}>
            {children}
        </button>
    )
}