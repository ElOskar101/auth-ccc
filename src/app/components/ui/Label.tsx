import React from "react";

type Props = React.LabelHTMLAttributes<HTMLLabelElement>


export function Label ({children, ...props}: Props) {
    return (
        <label
            {...props}
            className="block mb-1 text-md text-shadow-lg font-medium text-heading">
            {children}
        </label>
    );
}