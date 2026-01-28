import React from "react";

const CardHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(({className, ...props}, ref) => (
    <div
        {...props}
        ref={ref}
        className=""
        data-slot="card-header"
    >
    </div>
));

CardHeader.displayName = 'CardHeader'

export {CardHeader};