import React, {createContext, useContext, ReactNode} from "react";
import {useAppSelector as useAppSelectorLogic} from "@/app/pages/auth/hooks/useAppSelector.ts";
import {AppInfo} from "@/app/pages/auth/types/AppInfo.ts";

interface AppSelectorContextType {
    currentApp: AppInfo|null;
    setCurrentApp: React.Dispatch<React.SetStateAction<AppInfo | null>>;
    APPS: AppInfo[];
}

const AppSelectorContext = createContext<AppSelectorContextType | undefined>(undefined)

export const AppSelectorProvider = ({children}: {children: ReactNode}) => {
    const appSelectorLogic = useAppSelectorLogic();
    return (
        <AppSelectorContext.Provider value={appSelectorLogic}>
            {children}
        </AppSelectorContext.Provider>
    );
}

export const useAppSelectorContext = () => {
    const context = useContext(AppSelectorContext);
    if (!context) {
        throw new Error("useAppSelectorContext should be use inside of a AppSelector provider");
    }
    return context;
};