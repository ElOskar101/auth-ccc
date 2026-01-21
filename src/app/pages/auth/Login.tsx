import { Label, Input, Button, LinkButton } from "../../components/ui/";
import {useNavigate} from "react-router-dom";
import {AppSelector} from "@/app/pages/auth/components/AppSelector.tsx";
import React, {useEffect, useState} from "react";
import {AppInfo} from "@/app/pages/auth/types/AppInfo.ts";
import {useTranslation} from "react-i18next";
import { MdLightMode } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { BsFillEyeFill } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";
import i18n from 'i18next';
import {useTheme} from "@/app/hooks/useTheme.ts";
import {useLanguage} from "@/app/hooks/useLanguage.ts";
import {LoginFormData, loginSchema} from "@/app/pages/auth/schema/login.schema.ts";


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

export const Login = ()=> {

    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const {language, changeLanguage} = useLanguage();
    const { t } = useTranslation();
    const [formData, setFormData] = useState<LoginFormData>({username: "", password: ""});
    const [isValid, setIsValid] = useState<boolean|null>(null);
    const [selectedApp, setSelectedApp] = useState<AppInfo | null>(APPS[0] ?? null);

    useEffect(() => {
        void i18n.changeLanguage(language);
    }, [language])

    const onHandleChangeLanguage = (lang: string) => {
        changeLanguage(lang);
    }

    const onHandleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = loginSchema.safeParse(formData);

        if (!result.success) return;

    }

    const validateForm = (data: LoginFormData) => {
        const result = loginSchema.safeParse(data);
        setIsValid(result.success);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const updated = { ...formData, [name]: value };
        setFormData(updated);
        validateForm(updated);
    };

    return (

        <main className="flex-1 w-full max-w-md py-6">
            <div className="p-6 shadow-lg rounded-xl bg-white border border-gray-50 dark:bg-zinc-800 dark:border-zinc-600">
                {/* Theme Toggle Button */}
                <div className="flex"
                     onClick={toggleTheme}
                >
                    <button className="ml-auto p-2 hover:cursor-pointer hover:scale-110 rounded-full bg-gray-100 shadow-lg dark:bg-zinc-700">
                        {theme === 'light' ? <IoMoonOutline color="gray" size={22} /> : <MdLightMode color="white" size={22}/>}
                    </button>
                </div>
                {/* Login Form */}
                <form className="max-w-sm mx-auto" noValidate onSubmit={onHandleLogin}>
                    {selectedApp &&
                        (
                            <>
                            <img
                                src={selectedApp.logo}
                                alt={selectedApp.id}
                                className='w-24 mx-auto dark:brightness-110
                                    dark:contrast-110
                                    dark:saturate-110'
                            />
                            <p className="text-center dark:text-gray-50 text-lg font-semibold text-gray-700 p-3 ">{`${t('login.loginTo')} ${selectedApp.name}`}</p>
                            </>
                        )
                    }
                    <fieldset className="space-y-5">
                        <div className="mb-5">
                            <Label htmlFor="username">{t('login.username')}</Label>
                            <Input className="focus:scale-110 transition-transform" type="text" id="username" name="username" autoComplete="username"
                                   onChange={handleChange}
                                   placeholder={t('login.usernamePlaceholder')} required/>
                        </div>
                        <div className="mb-5">
                            <Label htmlFor="password">{t('login.password')}</Label>
                            <Input className="focus:scale-110 transition-transform" type="password" id="password" name="password" autoComplete="current-password"
                                   onChange={handleChange}
                                   placeholder="**************" required/>
                        </div>
                        <div className="mb-5">
                            <Button
                                disabled={!isValid}
                                className="focus:ring-2 focus:ring-indigo-500"
                                type="submit">
                                {t('login.logIn')}
                            </Button>
                        </div>
                    </fieldset>

                </form>
                {/* Additional Links and Language Selector */}
                <div className="flex flex-col items-center gap-3">
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
                                        onClick={() => onHandleChangeLanguage('es')}
                                        className="block px-4 py-2 text-sm text-start text-blue-700 dark:hover:bg-zinc-700 hover:bg-gray-100 w-full">
                                        {t('login.spanishLanguage')}
                                    </button>
                                    <button
                                        onClick={() => onHandleChangeLanguage('en')}
                                        className="block px-4 py-2 text-sm text-start dark:hover:bg-zinc-700 text-red-600 hover:bg-gray-100 w-full">
                                        {t('login.englishLanguage')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            {/* App Selector Component */}
            <AppSelector
                apps={APPS}
                selectedAppId={selectedApp && selectedApp.id || ''}
                onSelect={(appInfo) => setSelectedApp(appInfo)}
            />
        </main>
    );
}