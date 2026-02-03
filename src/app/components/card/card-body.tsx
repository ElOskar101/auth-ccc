import React from "react";
import { cn } from "@/app/libs/utils.ts";

export const CardBody = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(({className, ...props}, ref) => (
    <div
        {...props}
        ref={ref}
        className={cn('', className)}
        data-slot="card-body"
    >

    </div>
));

CardBody.displayName = 'CardBody';