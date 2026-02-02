export interface AppInfo {
    id: string;
    name: string;
    logo: string;
    type: 'dev' | 'prod',
    url: string;
    apiUrl?: string;
}