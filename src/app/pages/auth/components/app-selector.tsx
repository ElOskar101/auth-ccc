import {AppSelectorItem} from "@/app/pages/auth/components/app-selector-item.tsx";
import {AppInfo} from "@/app/pages/auth/types/AppInfo.ts";
//import { useTranslation } from "react-i18next";

interface AppSelectorProps {
    apps: AppInfo[],
    selectedAppId: string,
    onSelect: (appInfo: AppInfo) => void
}

export const AppSelector = ({apps,
                                selectedAppId,
                                onSelect}: AppSelectorProps) => {
    //
    //flex-col flex items-center
    return (
        <div className="flex-1 sm:fixed sm:right-0 sm:inset-y-1/3 sm:mr-2">
            <div className="bg-white shadow-lg border border-gray-100 dark:border-zinc-600 dark:bg-zinc-800 rounded-full ml-3">
                {/*<p className="text-center text-lg font-semibold text-gray-700 py-2 dark:text-zinc-50">{t('login.selectApplication')}</p>*/}
                <div className="flex sm:flex-col">
                    {
                        apps.filter(a=>a.type === 'prod').map((app) => (
                            <AppSelectorItem
                                key={app.id}
                                app={app}
                                isActive={app.id === selectedAppId}
                                onClick={() => onSelect(app)}
                            />
                        ))
                    }

                </div>
            </div>
        </div>


    )
}