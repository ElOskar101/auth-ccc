import {AppSelectorItem} from "@/app/pages/auth/components/AppSelectorItem.tsx";
import {AppInfo} from "@/app/pages/auth/types/AppInfo.ts";

interface AppSelectorProps {
    apps: AppInfo[],
    selectedAppId: string,
    onSelect: (appInfo: AppInfo) => void
}

export const AppSelector = ({apps,
                                selectedAppId,
                                onSelect}: AppSelectorProps) => {
    return (
        <div className="mt-5 flex p-2 bg-white shadow-lg rounded-xl">

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
    )
}