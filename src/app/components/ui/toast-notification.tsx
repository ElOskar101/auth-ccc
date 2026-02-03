import { cn } from "@/app/libs/utils"
import {IoCloseOutline} from "react-icons/io5";
import {Spinner} from "@/app/components/ui/spinner.tsx";
import { GoNoEntry } from "react-icons/go";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiCircleCheck } from "react-icons/ci";
import { IoWarningOutline } from "react-icons/io5";
import React from "react";

type ToastVariant = 'success' | 'error' | 'info' | 'warning' | 'loading';

const variants: Record<ToastVariant, React.ReactNode> = {
    success: <CiCircleCheck className="text-green-500" size={32}/>,
    error: <GoNoEntry className="text-red-500" size={28}/>,
    info: <IoIosInformationCircleOutline className="text-blue-400" size={32}/>,
    warning: <IoWarningOutline className="text-amber-400" size={28}/>,
    loading:<Spinner/>,
}

export const ToastNotification = () => {
    return(
        <div className={cn('absolute top-0 right-0 m-5 w-full max-w-xs py-1 px-2',
            'bg-white dark:bg-zinc-800 hover:dark:bg-zinc-800/50 rounded-full shadow-md dark:border border-gray-600 dark:border-zinc-600 hover:bg-white/30 cursor-pointer hover:shadow-lg')}>

            <div className="flex justify-between items-center">
                <div className="flex gap-3 h-7 items-center">
                    {/**/}
                    {variants['error']}

                    <p className="text-gray-700 dark:text-zinc-200">Fill out all sites</p>
                </div>

                <IoCloseOutline className="hover:cursor-pointer dark:hover:bg-gray-500 hover:bg-gray-300 rounded-full dark:text-white" />
            </div>



        </div>
    )

}