import React from "react"
import { cn } from "@/app/libs/utils"

export const ModalFooter= React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">>(({className, ...props}, ref) => (
        <div
            ref={ref}
            data-slot="modal-footer"
            className={cn("px-6 py-4 flex justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800", className)}
            {...props}
        />
));
ModalFooter.displayName = "ModalFooter";