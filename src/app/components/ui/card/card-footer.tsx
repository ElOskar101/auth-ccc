import React from "react";

export const CardFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(({className, ...props}, ref) => (
    <div
        {...props}
        ref={ref}
        data-slot="card-footer"
        className="flex-none w-full max-w-md shadow-md rounded-xl bg-white border border-gray-50 dark:bg-zinc-800 dark:border-zinc-600 p-4"
    >
    </div>
));

CardFooter.displayName="CardFooter"


