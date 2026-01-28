import React, {useEffect} from "react";
import { createPortal} from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal = ({isOpen, onClose, children}:ModalProps)  => {
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
                className="relative z-10 w-full max-w-2xl mx-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl shadow-xl dark:text-gray-50 "
                onClick={(e)=> e.stopPropagation()}
            >
                {children}

            </div>

        </div>,
        document.body);
}