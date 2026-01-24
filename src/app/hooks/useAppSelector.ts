import {AppInfo} from "@/app/pages/auth/types/AppInfo.ts";
import {useState} from "react";

const APPS: AppInfo[] = [
    {
        id: 'ccc',
        name: 'Control Central',
        logo: '/new-ccc-isolated-logo.svg',
    },
    {
        id: 'incidents',
        name: 'Incidents',
        logo: '/new-incidents-logo.svg',
    },
    {
        id: 'orioris',
        name: 'Oriois Playground',
        logo: '/orioris-logo.svg',
    },
];

export const useAppSelector = () => {
    const [currentApp, setCurrentApp] = useState<AppInfo | null>(APPS[0] ?? null);

    return ({
        currentApp,
        setCurrentApp,
        APPS
    })
}