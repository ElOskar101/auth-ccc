import React from "react";

export const CardBody = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(({className, ...props}, ref) => (
    <div
        {...props}
        ref={ref}
        className=""
        data-slot="card-body"
    >

    </div>
));

CardBody.displayName = 'CardBody';