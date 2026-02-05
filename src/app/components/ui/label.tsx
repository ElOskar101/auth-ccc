import React from "react";

type Props = React.LabelHTMLAttributes<HTMLLabelElement>


export function Label ({children, ...props}: Props) {
    return (
        <label
            {...props}
            className="m-4text-gray-700 dark:text-gray-50 font-semibold">
            {children}
        </label>
    );
}