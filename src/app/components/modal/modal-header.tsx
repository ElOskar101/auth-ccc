import React from "react";
import { cn } from "@/app/libs/utils"

export const ModalHeader = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">>(
    ({className, ...props}, ref) => (
        <div
        ref={ref}
        data-slot="modal-header"
        className={cn("flex items-center justify-between px-6 py-4 ", className)}
        {...props}
        />
));

ModalHeader.displayName = "ModalHeader";

