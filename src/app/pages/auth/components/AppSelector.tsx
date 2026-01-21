import {AppSelectorItem} from "@/app/pages/auth/components/AppSelectorItem.tsx";
import {AppInfo} from "@/app/pages/auth/types/AppInfo.ts";
import { useTranslation } from "react-i18next";

interface AppSelectorProps {
    apps: AppInfo[],
    selectedAppId: string,
    onSelect: (appInfo: AppInfo) => void
}

export const AppSelector = ({apps,
                                selectedAppId,
                                onSelect}: AppSelectorProps) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white border border-gray-50 dark:border-zinc-600 dark:bg-zinc-800 shadow-lg rounded-xl mt-5 p-2">
                <p className="text-center text-lg font-semibold text-gray-700 py-2 dark:text-zinc-50">{t('login.selectApplication')}</p>
            <div className="flex  ">
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

    )
}