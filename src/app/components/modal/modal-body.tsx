import React from "react";
import { cn } from "@/app/libs/utils.ts"

export const ModalBody = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">> (({className, ...props}, ref) => (
        <div
            ref={ref}
            data-slot="modal-body"
            {...props}
            className={cn("px-6 py-4", className)}
        />
));
ModalBody.displayName = "ModalBody";