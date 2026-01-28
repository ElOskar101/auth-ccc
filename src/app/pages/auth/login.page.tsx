import { Label, Input, Button, LinkButton } from "../../components/ui/";
import {useNavigate} from "react-router-dom";
import {AppSelector} from "@/app/pages/auth/components/app-selector.tsx";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import { zodResolver } from '@hookform/resolvers/zod';
import i18n from 'i18next';
import {LoginFormData, loginSchema} from "@/app/pages/auth/schema/login.schema.ts";
import {PageWrapper} from "@/app/components/page-wrapper.tsx";
import {LogoImage} from "@/app/components/ui/logo-image.tsx";
import {useAppSelector} from "@/app/hooks/useAppSelector.ts";
import {LangAndThemeSelector} from "@/app/pages/auth/components/lang-and-theme-selector.tsx";
import {useLanguageContext} from "@/app/context/LanguageContext.tsx";
import {InputPassword} from "@/app/components/ui/input-password.tsx";
import {useForm} from "react-hook-form";
import {RequiredFieldsMessage} from "@/app/pages/auth/components/required-fields-message.tsx";

export const LoginPage = ()=> {

    const navigate = useNavigate();
    const {language} = useLanguageContext();
    const {currentApp, APPS, setCurrentApp} = useAppSelector();
    const { t } = useTranslation();
    const [formData, setFormData] = useState<LoginFormData>({username: "", password: ""});
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });
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
                                <LogoImage src={currentApp.logo} alt={currentApp.name} width={100} />
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
                                <InputPassword/>
                            </div>
                            <div className="mb-3">
                                <Button
                                    disabled={!isValid}
                                    className="w-full"
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