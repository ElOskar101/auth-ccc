import { Label, Input, Button, LinkButton } from "../../components/ui/";
import {useNavigate} from "react-router-dom";
import {AppSelector} from "@/app/pages/auth/components/app-selector.tsx";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'react-router-dom';
import i18n from 'i18next';
import { toast } from 'sonner'
import {LoginFormData, loginSchema} from "@/app/pages/auth/schema/login.schema.ts";
import {TotpForm, totpSchema} from "@/app/pages/auth/schema/totp.schema.ts";
import {PageWrapper} from "@/app/components/page-wrapper.tsx";
import {LogoImage} from "@/app/components/ui/logo-image.tsx";
import {LangAndThemeSelector} from "@/app/pages/auth/components/lang-and-theme-selector.tsx";
import {useLanguageContext} from "@/app/context/LanguageContext.tsx";
import {InputPassword} from "@/app/components/ui/input-password.tsx";
import {Controller, useForm} from "react-hook-form";
import {Modal, ModalBody, ModalHeader} from "@/app/components/modal";
import {IoCloseOutline} from "react-icons/io5";
import {RoundedTinyButton} from "@/app/components/ui/rounded-tiny-button.tsx";
import {Spinner} from "@/app/components/ui/spinner.tsx";
import {InputTOTP} from "@/app/components/ui/totp-input-masked.tsx";
import {useAppSelectorContext} from "@/app/pages/auth/context/AppSelectorContext.tsx";
import {useLogin, UserInterface} from "@/app/pages/auth/hooks/useLogin.ts";

export const LoginPage = ()=> {

    const navigate = useNavigate();
    const {isLoading, executeLogin, executeGetUserInfo, executeRecover, error} = useLogin();
    const [email, setEmail] = useState('');
    const [user, setUser] = useState<UserInterface>({} as UserInterface);
    const {language} = useLanguageContext();
    const {currentApp, APPS, setCurrentApp} = useAppSelectorContext();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';
    const comesFrom = location.state?.from?.pathname ?? '/'
    const { t } = useTranslation();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isLostPasswordOpenModal, setIsLostPasswordOpenModal] = useState<boolean>(false);
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });
    const totpForm = useForm<TotpForm>({
        resolver: zodResolver(totpSchema),
        mode: 'onChange',
    });

    useEffect(() => {
        void i18n.changeLanguage(language);
    }, [language]);

    useEffect(() => {
        if (error)
            toast.warning(error);
    }, [error]);

    const onHandleLogin = async (data: LoginFormData) => {
        const result = await executeLogin(data);
        const user = await executeGetUserInfo(result.token);
        if (user){
            setIsOpenModal(true);
            setUser(user as UserInterface);
        }
    }

    const handleRecover = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email.length == 0 || !/\S+@\S+\.\S+/.test(email)) return;
        executeRecover(email).then(async () => {
            toast.success('email sent successfully');
        })

    }

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
                                <LogoImage className={`${currentApp.type === 'dev' ? 'grayscale' : ''}`} src={currentApp.logo} alt={currentApp.name} width={100} />
                                <p className="text-center dark:text-gray-50 text-lg font-semibold text-gray-700 py-3">
                                    {`${t('login.loginTo')} ${currentApp.name}`}
                                </p>
                            </>
                        )
                    }
                    {/* LoginPage Form */}
                    <form className="" noValidate onSubmit={form.handleSubmit(onHandleLogin)}>
                        {/*<p className="text-center font-semibold dark:text-amber-500 text-md text-orange-600">{error || ' '}</p>*/}
                        <fieldset className="space-y-5">
                            <div className="">
                                <Label htmlFor="username">{t('login.username')}</Label>
                                <Input autoFocus={true} type="text" id="username" autoComplete="username"
                                       disabled={currentApp?.id === 'orioris'}
                                    {...form.register("username")}
                                       placeholder={t('login.usernamePlaceholder')} required/>
                            </div>
                            <div className="">
                                <Label htmlFor="password">{t('login.password')}</Label>
                                <InputPassword placeholder="xxxxxxxxx"
                                    disabled={currentApp?.id === 'orioris'} {...form.register("password")}/>
                            </div>
                            <div className="mb-3 flex justify-end">
                                {currentApp?.id === 'orioris' ?
                                    <Button
                                        disabled={(!form.formState.isValid && currentApp?.id !== 'orioris') || isLoading}
                                        className="justify-endr"
                                        variant="primary"
                                        type="button"
                                        onClick={() => navigate(currentApp?.url || '/')}>
                                        <Spinner variant="white" hidden={!isLoading} />
                                        {t('login.logIn')}
                                    </Button>
                                :
                                    <Button
                                        disabled={!form.formState.isValid || isLoading}
                                        className="w-full"
                                        variant={currentApp?.type === "dev" ? "neutral" : "primary"}
                                        type="submit">
                                        <Spinner variant="white" hidden={!isLoading} />
                                        {t('login.logIn')}
                                    </Button>
                                }

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
                            <LinkButton action={()=> setIsLostPasswordOpenModal(true)}>
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
            {/* TOTP Modal */}
            <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(!isOpenModal)} size="md">
                <ModalHeader>
                    <div className="flex gap-3 items-center">
                        <img className="rounded-full w-10 h-10 ring-1 ring-blue-400 p-1" alt="user" src={user.urlImage || '/new-ccc-isolated-logo.svg'}/>
                        <div className="flex-col">
                            <h2 className="font-semibold capitalize self-center">
                                {user.fullName}
                            </h2>
                            <p className="text-sm dark:text-gray-200 capitalize self-center text-zinc-700">
                                {'@'+user.username}
                            </p>
                        </div>
                    </div>
                    <RoundedTinyButton className="cursor-pointer" onClick={()=> setIsOpenModal(false)}>
                        <IoCloseOutline/>
                    </RoundedTinyButton>
                </ModalHeader>

                <ModalBody>
                    <Label>{t('login.insertTotpCode')}</Label>
                    <div className="flex items-center gap-2 mt-1">
                        <Controller
                            name="code"
                            control={totpForm.control}
                            render={({ field }) => (
                                <InputTOTP
                                    {...field}
                                    autoFocus
                                />
                            )}
                        />
                        <Button disabled={!totpForm.formState.isValid} variant="primary" onClick={()=> setIsOpenModal(false)}>
                            <Spinner variant="white" hidden={true} />
                            {t('defaults.accept')}
                        </Button>
                    </div>

                </ModalBody>

            </Modal>
            {/* Lost password modal */}
            <Modal isOpen={isLostPasswordOpenModal} onClose={() => setIsLostPasswordOpenModal(!isLostPasswordOpenModal)} size="md">
                <ModalHeader>

                    <p className="font-semibold capitalize self-center">
                        reset your password
                    </p>
                    <RoundedTinyButton className="cursor-pointer" onClick={()=> setIsLostPasswordOpenModal(false)}>
                        <IoCloseOutline/>
                    </RoundedTinyButton>
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handleRecover}>
                        <fieldset>
                            <Label htmlFor="email">Insert E-mail</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="email"
                                    id="email"
                                    required
                                    placeholder="correo"
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoFocus/>
                                <Button disabled={email.length == 0 || !/\S+@\S+\.\S+/.test(email) || isLoading} type="submit" variant="primary">
                                    <Spinner variant="white" hidden={!isLoading} />
                                    {t('defaults.accept')}
                                </Button>
                            </div>
                        </fieldset>
                    </form>
                    <p className="py-4 text-blue-500">Check your e-mail and fallow the instructions</p>
                </ModalBody>

            </Modal>
        </PageWrapper>
    );
}