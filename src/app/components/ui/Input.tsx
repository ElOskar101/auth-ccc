import React from "react";
type Props = React.InputHTMLAttributes<HTMLInputElement>
export function Input (props: Props) {
    return (
        <input
            {...props}
            className={`text-lg text-gray-700 p-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-50 focus:ring-0 ${props.className}`}
        />
    )
}