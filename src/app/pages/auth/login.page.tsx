import { Label, Input, Button, LinkButton } from "../../components/ui/";
import {useNavigate} from "react-router-dom";
import {AppSelector} from "@/app/pages/auth/components/app-selector.tsx";
import React, {useEffect, useState} from "react";
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
import {LoginResponse, useLogin, UserInterface} from "@/app/pages/auth/hooks/useLogin.ts";
import {Card, CardBody, CardFooter, CardHeader} from "@/app/components/card";

export const LoginPage = ()=> {

    const navigate = useNavigate();
    const {isLoading, executeLogin, executeGetUserInfo, executeRecover, executeTotp, executeBackupCodeVerification} = useLogin();
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [user, setUser] = useState<UserInterface>({} as UserInterface);
    const {language} = useLanguageContext();
    const {currentApp, APPS, setCurrentApp} = useAppSelectorContext();
    const [searchParams] = useSearchParams();
    const [url, setUrl] = useState<URL|null>(null);
    const mode:string = searchParams.get('mode') || 'prod';
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

        try {
            const decodedURL = atob(searchParams.get("url") || "");
            const validURL = new URL(decodedURL);
            const app = validURL.href.includes('localhost') ? APPS.find(app => app.type === mode) : APPS.find(app => validURL.href.startsWith(app.url));
            if (app){
                setCurrentApp(app);
                setUrl(validURL)
            }else setUrl(null);

        } catch {}
    }, []);

    const handleRedirect = (token:string) => {
        let href = `${currentApp?.url}/?key=${btoa(token)}`|| "";
        if (url){

            const [path, hashQuery = ''] = url.hash.split('?');
            const params = new URLSearchParams(hashQuery);
            params.set('key', btoa(token));
            href = `${url.origin}/${path}?${params}`;
        }
        navigate(href);
    }

    const onHandleLogin = async (data: LoginFormData) => {
        executeLogin(data).then(
            (result)=>{
                let data = result.data as LoginResponse;
                if (!data.token) return;
                setToken(data.token);

                if (result.status === 200){
                    handleRedirect(data.token);
                }
                /*For TOTP operations*/
                if (result.status === 206){
                    executeGetUserInfo(data.token).then(
                        (result)=> {
                            setIsOpenModal(true);
                            setUser(result.data as UserInterface);
                        }
                    );
                }

            }
        ).catch( (e) => {
            toast.warning(e.message);
        });
    }

    const onHandleTwoStep = (data: TotpForm) => {
        if (data.backupCodeInstead){
            executeBackupCodeVerification(data.code, user.email).then((r)=>{
                const result = r.data as LoginResponse;
                setIsOpenModal(false);
                handleRedirect(result.token);
            }).catch((e)=>{
                toast.warning(e.message);
            });
        }else{
            executeTotp(data.code, token).then(r => {
                const result = r.data as LoginResponse;
                setIsOpenModal(false);
                if (result.deviceId)
                    localStorage.setItem('deviceId', result.deviceId);
                handleRedirect(result.token);
            }).catch( (e) => {
                toast.warning(e.message);
            });
        }
    }

    const handleRecover = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email.length == 0 || !/\S+@\S+\.\S+/.test(email)) return;
        executeRecover(email).then(async () => {
            toast.success(t('forgotPassword.successNotification'),{
                onAutoClose: ()=>{
                    setIsLostPasswordOpenModal(false);
                    setEmail('');
                }
            });
        })
    }

    return (
        <PageWrapper>
            <section className="flex flex-col space-y-5 sm:flex-row max-w-md w-full mt-3">

                <Card>
                    <CardHeader>
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
                    </CardHeader>
                    <CardBody>
                        {/* LoginPage Form */}
                        <form className="" noValidate onSubmit={form.handleSubmit(onHandleLogin)}>
                            {/*<p className="text-center font-semibold dark:text-amber-500 text-md text-orange-600">{error || ' '}</p>*/}
                            <fieldset className="space-y-5">
                                <div className="">
                                    <Label htmlFor="username">{t('login.username')}</Label>
                                    <Input type="text" id="username" autoComplete="username"
                                           disabled={currentApp?.id === 'orioris'}
                                           {...form.register("username")}
                                           placeholder={t('login.usernamePlaceholder')} required/>
                                </div>
                                <div className="">
                                    <Label htmlFor="password">{t('login.password')}</Label>
                                    <InputPassword placeholder="●●●●●●●●" className="placeholder:tracking-wide"
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
                    </CardBody>
                    <CardFooter>
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex gap-2">
                                <p className="text-gray-700 dark:text-gray-50">{t('login.isNewUser')}</p>
                                <LinkButton href="/register">
                                    {t('login.createAccount')}
                                </LinkButton>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-gray-700 dark:text-gray-50">{t('login.haveLostTheirPassword')}</p>
                                <LinkButton href="" action={()=> setIsLostPasswordOpenModal(true)}>
                                    {t('login.resetPassword')}
                                </LinkButton>

                            </div>
                        </div>
                    </CardFooter>
                </Card>
                {/* App Selector Component */}
                <AppSelector
                    apps={APPS}
                    selectedAppId={currentApp && currentApp.id || ''}
                    onSelect={(appInfo) => {
                        setUrl(null);
                        setCurrentApp(appInfo)
                    }}
                />
            </section>
            {/* TOTP Modal */}
            <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(!isOpenModal)} size="md">
                <ModalHeader>
                    {user.username ? (
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
                    ): (
                        <p className="font-semibold">Confirm your identification</p>
                    )}
                    <RoundedTinyButton className="cursor-pointer" onClick={()=> setIsOpenModal(false)}>
                        <IoCloseOutline/>
                    </RoundedTinyButton>
                </ModalHeader>

                <form onSubmit={totpForm.handleSubmit(onHandleTwoStep)}>
                    <ModalBody className="space-y-2">
                        <div className="flex justify-between">
                            <Label>{totpForm.watch('backupCodeInstead') ? 'Insert backup code:' : t('login.insertTotpCode')}</Label>
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                            <Controller
                                name="code"
                                control={totpForm.control}
                                render={({ field }) => (
                                    <InputTOTP forBackupCode={totpForm.watch('backupCodeInstead')}  {...field} />
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={!totpForm.formState.isValid}
                                variant="primary"
                            >
                                <Spinner variant="white" hidden={!isLoading} />
                                {t('defaults.accept')}
                            </Button>
                        </div>
                        <div className="flex gap-1">
                            <input type="checkbox"
                                   {...totpForm.register('backupCodeInstead')}
                                   />
                            <p className="text-gray-500 dark:text-gray-50">Use backup code instead</p>
                        </div>
                    </ModalBody>
                </form>

            </Modal>
            {/* Lost password modal */}
            <Modal isOpen={isLostPasswordOpenModal} onClose={() => setIsLostPasswordOpenModal(!isLostPasswordOpenModal)} size="md">
                <ModalHeader>

                    <p className="font-semibold capitalize self-center">
                        {t('login.resetPassword')}
                    </p>
                    <RoundedTinyButton className="cursor-pointer" onClick={()=> setIsLostPasswordOpenModal(false)}>
                        <IoCloseOutline/>
                    </RoundedTinyButton>
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handleRecover}>
                        <fieldset>
                            <Label htmlFor="email">{t('register.email')}</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="email"
                                    id="email"
                                    disabled={isLoading}
                                    required
                                    placeholder={t('register.emailPlaceholder')}
                                    onChange={(e) => setEmail(e.target.value)}/>
                                <Button disabled={email.length == 0 || !/\S+@\S+\.\S+/.test(email) || isLoading} type="submit" variant="primary">
                                    <Spinner variant="white" hidden={!isLoading} />
                                    {t('defaults.accept')}
                                </Button>
                            </div>
                        </fieldset>
                    </form>
                    <div className="mt-4">
                        <p className="dark:text-blue-400 text-blue-500">{t('forgotPassword.emailInstructions')}</p>
                    </div>
                </ModalBody>


            </Modal>
        </PageWrapper>
    );
}