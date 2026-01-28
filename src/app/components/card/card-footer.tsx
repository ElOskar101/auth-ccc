import React from "react";

export const CardFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(({className, ...props}, ref) => (
    <div
        {...props}
        ref={ref}
        data-slot="card-footer"
        className="flex justify-center pt-3"
    >
    </div>
));

CardFooter.displayName="CardFooter"


