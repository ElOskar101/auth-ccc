import React from "react";

export const RequiredFieldsMessage = ({children}: React.ParamHTMLAttributes<HTMLParagraphElement>) => {
    return (
        <p className="dark:text-gray-400 mt-1 text-sm font-normal text-gray-400">
            {children}
        </p>
    )
}
