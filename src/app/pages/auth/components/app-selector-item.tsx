import {AppInfo} from "@/app/pages/auth/types/AppInfo.ts";

interface AppSelectorItemProps {
    app: AppInfo,
    isActive: boolean,
    onClick: () => void
}

export const AppSelectorItem = ({
                                    app,
                                    isActive,
                                    onClick,
                                }: AppSelectorItemProps) => {

    return (

        <button
            onClick={onClick}
            aria-label={`Select ${app.name}`}
            className="flex-1 flex flex-col text-center items-center cursor-pointer p-3"
        >
            <img
            src={app.logo}
            alt={app.id}
            className={`p-3 h-17 shadow-lg  rounded-full hover:bg-gray-100 dark:hover:bg-zinc-500 hover:shadow-xl hover:scale-110 transition-transform ring-2 ring-gray-50
                ${isActive
                ? 'bg-gray-200 dark:ring-2 dark:bg-zinc-700 dark:ring-blue-500 dark:brightness-110 dark:contrast-125 dark:saturate-125'
                : 'bg-white'}`}
            />
            {/*<p className="text-gray-700 dark:text-zinc-50 p-1">{app.name}</p>*/}
        </button>
    )
}