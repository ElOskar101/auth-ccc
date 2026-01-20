import { Label, Input, Button, LinkButton } from "../../components/ui/";
import {useNavigate} from "react-router-dom";
import {AppSelector} from "@/app/pages/auth/components/AppSelector.tsx";
import {useState} from "react";
import {AppInfo} from "@/app/pages/auth/types/AppInfo.ts";
import {useTranslation} from "react-i18next";
import { MdLightMode, MdNightlight } from "react-icons/md";
import i18n from 'i18next';
import {useTheme} from "@/app/hooks/useTheme.ts";


const APPS: AppInfo[] = [
    {
        id: 'ccc',
        name: 'Control Central',
        logo: '/new-ccc-logo.svg',
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

export const Login = ()=> {

    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const { t } = useTranslation();
    const [selectedApp, setSelectedApp] = useState<AppInfo | null>(APPS[0] ?? null);


    return (

        <main className="flex-1 w-full max-w-md py-6">
            <div className="p-6 shadow-lg rounded-xl bg-white border border-gray-50 dark:bg-zinc-800 dark:border-zinc-700">
                {
                <div className="flex"
                     onClick={toggleTheme}
                >
                    <button className="ml-auto p-2 hover:cursor-pointer hover:scale-110">
                        {theme === 'light' ? <MdNightlight size={22} /> : <MdLightMode color='white' size={22}/>}
                    </button>
                </div>}

                    <form className="max-w-sm mx-auto">
                        {selectedApp &&
                            (
                                <>
                                <img
                                    src={selectedApp.logo}
                                    alt={selectedApp.id}
                                    className='w-24 mx-auto'
                                />
                                <p className="text-center dark:text-gray-50 text-lg font-semibold text-gray-700 p-3 ">{`${t('login.loginTo')} ${selectedApp.name}`}</p>
                                </>
                            )
                        }

                        <div className="mb-5">
                            <Label htmlFor="email">{t('login.username')}</Label>
                            <Input className="focus:scale-110 transition-transform" type="text" id="username"
                                   placeholder={t('login.usernamePlaceholder')} required/>
                        </div>
                        <div className="mb-5">
                            <Label htmlFor="password">{t('login.password')}</Label>
                            <Input className="focus:scale-110 transition-transform" type="password" id="password"
                                   placeholder="**************" required/>
                        </div>
                        <div className="mb-5">
                            <Button
                                onClick={() => navigate('/home')}
                                disabled={false}
                                className="hover:scale-110 transition-transform"
                                type="submit">
                                {t('login.logIn')}
                            </Button>
                        </div>
                    </form>
                    <div className="flex flex-col items-center m-3 gap-3 border-t-2 pt-3 border-zinc-300">
                        <div className="flex gap-2">
                            <p className="text-gray-700 dark:text-gray-50">{t('login.isNewUser')}</p>
                            <LinkButton href="/reset-password">
                                {t('login.createAccount')}
                            </LinkButton>
                        </div>
                        <div className="flex gap-2">
                            <p className="text-gray-700 dark:text-gray-50">{t('login.haveLostTheirPassword')}</p>
                            <LinkButton href="/reset-password">
                                {t('login.resetPassword')}
                            </LinkButton>

                        </div>
                        <div className="relative inline-block text-left group">
                            <button
                                aria-haspopup="menu"
                                aria-expanded="false"
                                className="inline-flex items-center justify-center rounded-md px-4 text-gray-700 dark:text-gray-50 hover:border-b-gray-700 cursor-pointer py-2 group-hover:shadow-lg group-hover:bg-gray-100 dark:group-hover:bg-zinc-700"
                            >
                                {`${i18n.language === 'es' ? t('login.spanishLanguage') : t('login.englishLanguage')}`}
                                <svg
                                    className="ml-2 h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M19 9l-7 7-7-7"/>
                                </svg>
                            </button>


                            <div
                                className="absolute top-full z-10 w-44 dark:bg-zinc-800 origin-top-right shadow-lg rounded-md bg-white hidden group-hover:block"
                            >
                                <div className="py-1">
                                    <button
                                        onClick={() => i18n.changeLanguage('es')}
                                        className="block px-4 py-2 text-sm text-start text-blue-700 dark:hover:bg-zinc-700 hover:bg-gray-100 w-full">
                                        {t('login.spanishLanguage')}
                                    </button>
                                    <button
                                        onClick={() => i18n.changeLanguage('en')}
                                        className="block px-4 py-2 text-sm text-start dark:hover:bg-zinc-700 text-red-600 hover:bg-gray-100 w-full">
                                        {t('login.englishLanguage')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <AppSelector
                apps={APPS}
                selectedAppId={selectedApp && selectedApp.id || ''}
                onSelect={(appInfo) => setSelectedApp(appInfo)}
            />
        </main>
    );
}