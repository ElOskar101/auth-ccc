import {AppInfo} from "@/app/pages/auth/types/AppInfo.ts";
import {useState} from "react";

const APPS: AppInfo[] = [
    {
        id: 'cc',
        name: 'Control Central',
        logo: '/new-ccc-isolated-logo.svg',
        type: 'prod',
        url:"https://controlcentralcarrier.com/#",
        apiUrl:"https://carriers.dentalautomation.ai/api"
    },
    {
        id: 'incidents',
        name: 'Incidents',
        logo: '/new-incidents-logo.svg',
        type: 'prod',
        url:"https://incidents.controlcentralcarrier.com/#",
        apiUrl:"https://carriers.dentalautomation.ai/api"
    },
    {
        id: 'orioris',
        name: 'Oriois Playground',
        logo: '/orioris-logo.svg',
        type: 'prod',
        url:"https://orioris.controlcentralcarrier.com/",
        apiUrl:""
    },
    {
        id: 'dev-cc',
        name: 'Dev Control Central',
        logo: '/new-ccc-isolated-logo.svg',
        type: 'dev',
        url:"https://dev.controlcentralcarrier.com/#",
        apiUrl:"https://dev-carrier.dentalautomation.ai/api/v2"
    },
    {
        id: 'dev-incidents',
        name: 'Dev Incidents',
        logo: '/new-incidents-logo.svg',
        type: 'dev',
        url:"https://dev-incidents.controlcentralcarrier.com/#",
        apiUrl:"https://dev-carrier.dentalautomation.ai/api/v2"
    }
];

export const useAppSelector = () => {
    const [currentApp, setCurrentApp] = useState<AppInfo | null>(APPS[0] ?? null);

    return ({
        currentApp,
        setCurrentApp,
        APPS
    })
}