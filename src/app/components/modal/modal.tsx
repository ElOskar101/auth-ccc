import React, {useEffect} from "react";
import { createPortal} from "react-dom";
import {cn} from "@/app/libs/utils.ts";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    size?: keyof typeof sizes
}

const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl"
}

export const Modal = ({isOpen, onClose, children, size='xl'}:ModalProps)  => {
    useEffect(()=>{
        if (!isOpen) return;
        const handleCloseKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        }

        document.addEventListener("keydown", handleCloseKey);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleCloseKey);
            document.body.style.overflow = "";
        }

    }, [isOpen, onClose]);

    if (!isOpen) return;

    return createPortal(
        <div
            className="fixed flex inset-0 z-20 justify-center items-center"
            aria-modal="true"
            role="dialog"
        >

            {/* Background overlay */}
            <div
                className="absolute inset-0 bg-zinc-700/50 backdrop-blur-xs"
                onClick={onClose}
            />
            <div
                className={cn("relative z-10 w-full mx-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl shadow-xl dark:text-gray-50 ", sizes[size])}
                onClick={(e)=> e.stopPropagation()}
            >
                {children}

            </div>

        </div>,
        document.body);
}