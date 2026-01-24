import { Label, Input, Button, LinkButton } from "../../components/ui/";
import {useNavigate} from "react-router-dom";
import {AppSelector} from "@/app/pages/auth/components/app-selector.tsx";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import { BsFillEyeFill } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";
import i18n from 'i18next';
import {useLanguage} from "@/app/hooks/useLanguage.ts";
import {LoginFormData, loginSchema} from "@/app/pages/auth/schema/login.schema.ts";
import {PageWrapper} from "@/app/components/page-wrapper.tsx";
import {LogoImage} from "@/app/components/ui/logo-image.tsx";
import {useAppSelector} from "@/app/hooks/useAppSelector.ts";
import {LangAndThemeSelector} from "@/app/pages/auth/components/lang-and-theme-selector.tsx";
import {useLanguageContext} from "@/app/context/LanguageContext.tsx";

export const LoginPage = ()=> {

    const navigate = useNavigate();
    const {language} = useLanguageContext();
    const {currentApp, APPS, setCurrentApp} = useAppSelector();
    const { t } = useTranslation();
    const [formData, setFormData] = useState<LoginFormData>({username: "", password: ""});
    const [isValid, setIsValid] = useState<boolean|null>(null);

    useEffect(() => {
        void i18n.changeLanguage(language);
    }, [language])

    const onHandleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = loginSchema.safeParse(formData);

        if (!result.success) return;
        navigate('')

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

        <PageWrapper>
            <section className="relatve flex flex-row max-w-md w-full mt-3">
                <div className=" flex-none w-full max-w-md shadow-md rounded-xl bg-white border border-gray-50 dark:bg-zinc-800 dark:border-zinc-600 p-4">
                    {/* Theme Toggle Button */}
                    <div className="flex">
                        <LangAndThemeSelector/>
                    </div>
                    {currentApp &&
                        (
                            <>
                                <LogoImage src={currentApp.logo} alt={currentApp.name} />
                                <p className="text-center dark:text-gray-50 text-lg font-semibold text-gray-700 py-3 ">{`${t('login.loginTo')} ${currentApp.name}`}</p>
                            </>
                        )
                    }
                    {/* LoginPage Form */}
                    <form className="" noValidate onSubmit={onHandleLogin}>
                        <fieldset className="space-y-5">
                            <p className="text-center font-semibold dark:text-amber-500 text-md text-orange-600">{'Invalid credentials'}</p>
                            <div className="">
                                <Label htmlFor="username">{t('login.username')}</Label>
                                <Input className="focus:scale-110 transition-transform" type="text" id="username" name="username" autoComplete="username"
                                       onChange={handleChange}
                                       placeholder={t('login.usernamePlaceholder')} required/>
                            </div>
                            <div className="">
                                <Label htmlFor="password">{t('login.password')}</Label>
                                <Input className="focus:scale-110 transition-transform" type="password" id="password" name="password" autoComplete="current-password"
                                       onChange={handleChange}
                                       placeholder="**************" required/>
                            </div>
                            <div className="mb-3">
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
                            <LinkButton href="/register">
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
                                className="inline-flex items-center justify-center rounded-md text-gray-700 dark:text-gray-50 hover:border-b-gray-700 cursor-pointer p-2 group-hover:shadow-lg group-hover:bg-gray-100 dark:group-hover:bg-zinc-700"
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
                                        className="block px-4 py-2 text-sm text-start text-blue-700 dark:hover:bg-zinc-700 hover:bg-gray-100 w-full cursor-pointer">
                                        {t('login.spanishLanguage')}
                                    </button>
                                    <button
                                        onClick={() => onHandleChangeLanguage('en')}
                                        className="block px-4 py-2 text-sm text-start dark:hover:bg-zinc-700 text-red-600 hover:bg-gray-100 w-full cursor-pointer">
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
                    selectedAppId={currentApp && currentApp.id || ''}
                    onSelect={(appInfo) => setCurrentApp(appInfo)}
                />
            </section>
        </PageWrapper>
    );
}