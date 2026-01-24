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
    //const { t } = useTranslation();
    return (
        <div className="absolute right-0 top-1/4">
            <div className="bg-white shadow-lg border border-gray-100 dark:border-zinc-600 dark:bg-zinc-800 rounded-full ml-3">
                {/*<p className="text-center text-lg font-semibold text-gray-700 py-2 dark:text-zinc-50">{t('login.selectApplication')}</p>*/}
                <div className="flex-col flex items-center">
                    {
                        apps.map((app) => (
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