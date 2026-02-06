import {PageWrapper} from "@/app/components/page-wrapper.tsx";
import {Card, CardBody, CardFooter, CardHeader} from "@/app/components/card";
import {LogoImage} from "@/app/components/ui/logo-image.tsx";
import {LangAndThemeSelector} from "@/app/pages/auth/components/lang-and-theme-selector.tsx";
import {Modal, ModalHeader, ModalBody, ModalFooter} from "@/app/components/modal";
import { IoCloseOutline } from "react-icons/io5";
import {Button, Input, Label, LinkButton} from "@/app/components/ui";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import i18n from "i18next";
import {useLanguageContext} from "@/app/context/LanguageContext.tsx";
import {InputPassword} from "@/app/components/ui/input-password.tsx";
import {RequiredFieldsMessage} from "@/app/pages/auth/components/required-fields-message.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RegisterFormData, registerSchema, passwordRules} from "@/app/pages/auth/schema/register.schema.ts";
import {RoundedTinyButton} from "@/app/components/ui/rounded-tiny-button.tsx";
import {useAppSelectorContext} from "@/app/pages/auth/context/AppSelectorContext.tsx";
import {AppSelector} from "@/app/pages/auth/components/app-selector.tsx";
import {useRegister} from "@/app/pages/auth/hooks/useRegister.ts";
import {Spinner} from "@/app/components/ui/spinner.tsx";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";
import {PasswordRule} from "@/app/components/ui/password-rules.tsx";

export const RegisterPage = ()=> {
    const {language} = useLanguageContext();
    const {currentApp, APPS, setCurrentApp} = useAppSelectorContext();
    const {executeRegister, isLoading, error} = useRegister();
    const navigate = useNavigate();
    const [termsAndConditionsAccepted, setTermsAndConditionsAccepted] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
    });
    const password = form.watch('password') || '';
    const repeatedPassword = form.watch('repeatedPassword') || '';
    const { t } = useTranslation();

    useEffect(() => {
        void i18n.changeLanguage(language);

        if (currentApp?.id === 'orioris' && APPS.length > 0)
            void setCurrentApp(APPS[0] || currentApp);
    }, [language, APPS]);

    const onHandleRegister = async (data: RegisterFormData) => {
        const toastId = toast.loading('Creating Account...');
        const result = await executeRegister(data);
        if (result){
            toast.success('Account created successfully', {id: toastId, action: {label:t('register.goToLogin'), onClick: () => navigate('/login', {replace: true})}});
            form.reset();
        }
    }

    return (
        <PageWrapper>
            <section className="flex flex-col space-y-5 sm:flex-row max-w-md w-full mt-3">
            <Card size="2xl">
                <CardHeader>
                    <div className="flex">
                        <LangAndThemeSelector/>
                    </div>
                    {currentApp && (
                        <>
                            <LogoImage
                                className={`${currentApp.type === 'dev' ? 'grayscale' : ''}`}
                                src={currentApp.logo}
                                alt={currentApp.id}
                                width={100}
                            />
                        </>
                    )
                    }
                    <p className="text-center font-semibold dark:text-amber-500 text-md text-orange-600">{currentApp?.type === "dev" ? t('register.accountForDevelopersWarning'): error ? error : ""}</p>
                </CardHeader>
                <CardBody onClick={()=>{console.log(form.formState.errors, form.formState.isValid)}}>
                    <form noValidate onSubmit={form.handleSubmit(onHandleRegister)} >
                        <fieldset className="space-y-3">
                            <div className="" >
                                <Label
                                    htmlFor="fullName"
                                >{t('register.fullName')}</Label>
                                <Input
                                    autoFocus={true}
                                    id="fullName"
                                    {...form.register('fullName')}
                                    placeholder={t('register.fullNamePlaceholder')}
                                />
                                {form.formState.errors.fullName?.message && (
                                    <RequiredFieldsMessage>{t(form.formState.errors.fullName.message)}</RequiredFieldsMessage>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="">
                                    <Label
                                        htmlFor="username"
                                    >{t('register.username')}</Label>
                                    <Input
                                        id="username"
                                        {...form.register('username')}
                                        placeholder={t('register.usernamePlaceholder')}
                                    />
                                    {form.formState.errors.username?.message && (
                                        <RequiredFieldsMessage>{t(form.formState.errors.username.message)}</RequiredFieldsMessage>
                                    )}
                                </div>
                                <div className="">
                                    <Label
                                        htmlFor="email"
                                    >{t('register.email')}</Label>
                                    <Input
                                        id="email"
                                        {...form.register('email')}
                                        placeholder={t('register.emailPlaceholder')}
                                    />
                                    {form.formState.errors.email?.message && (
                                        <RequiredFieldsMessage>{t(form.formState.errors.email.message)}</RequiredFieldsMessage>
                                    )}
                                </div>

                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="">
                                    <Label
                                        htmlFor="password"
                                    >{t('register.password')}</Label>
                                    <InputPassword
                                        {...form.register('password')}
                                        placeholder={t('register.passwordPlaceholder')}/>
                                    <PasswordRule password={password}/>

                                </div>
                                <div className="">
                                    <Label
                                        htmlFor="repeated-password"
                                    >{t('register.repeatPassword')}</Label>
                                    <InputPassword
                                        id="repeatedPassword"
                                        {...form.register('repeatedPassword')}
                                        placeholder={t('register.repeatedPasswordPlaceholder')}
                                    />
                                    {(password && repeatedPassword) && (
                                        <p className={`mt-2 text-sm ${password !== repeatedPassword ? "text-gray-400":"text-green-600"}`}>
                                            {password === repeatedPassword ? '✔' : '•'}{t('register.formRules.passwordRule5')}
                                        </p>
                                    )}

                                </div>
                            </div>

                            <div className="flex gap-1">

                                <input type="checkbox"
                                       checked={termsAndConditionsAccepted}
                                       onChange={()=>{setTermsAndConditionsAccepted(!termsAndConditionsAccepted)}}/>
                                <p className="text-gray-500 dark:text-gray-50">{t("register.acceptThe")}
                                    <LinkButton href={'#'} action={()=>setOpenModal(true)}>{t("register.t&c")}</LinkButton>
                                </p>
                            </div>


                            <Button
                                disabled={!termsAndConditionsAccepted || !form.formState.isValid || isLoading || (password !== repeatedPassword)}
                                type="submit"
                                role="button"
                                className="w-full"
                                variant={currentApp?.type === "dev" ? "neutral" : "primary"}
                            >{isLoading && <Spinner variant="white"/>}{t('register.createAccount')}</Button>

                        </fieldset>
                    </form>
                </CardBody>
                <CardFooter>
                    <LinkButton href='/login' options={{replace: true}}>{t('register.backToLogin')}</LinkButton>
                </CardFooter>
            </Card>

            <AppSelector apps={APPS.filter(a => a.id !== 'orioris')} selectedAppId={currentApp && currentApp.id || ''} onSelect={(appInfo) => setCurrentApp(appInfo)}/>
            </section>
            {/* TERMS AND CONDITIONS MODAL */}
            <Modal isOpen={openModal} onClose={()=>setOpenModal(false)} size="3xl">
                <ModalHeader>
                    <h2 className="font-semibold capitalize">
                        {t("register.t&c")}
                    </h2>
                    <RoundedTinyButton className="cursor-pointer" onClick={()=> setOpenModal(false)}>
                        <IoCloseOutline/>
                    </RoundedTinyButton>
                </ModalHeader>

                <ModalBody className="bg-gray-50 mx-2 dark:bg-zinc-800 max-h-[50vh] overflow-y-auto">
                    <h1 className="text-lg font-[arial] uppercase ">
                        1- {t("t&c.createAccountTitle1")}
                    </h1>
                    <div className="font-serif leading-relaxed text-gray-700 dark:text-gray-200 space-y-2">

                        <p>• {t("t&c.createAccountExplanation1")}</p>
                        <p>• {t("t&c.createAccountExplanation2")}</p>
                        <p>• {t("t&c.createAccountExplanation3")}</p>
                    </div>

                    <h1 className="text-lg font-[arial] uppercase mt-4 ">
                        2- {t("t&c.agreementTitle1")}
                    </h1>
                    <div className="font-serif leading-relaxed text-gray-700 dark:text-gray-200 space-y-2">

                        <p>• {t("t&c.agreementTopic1")}</p>
                        <p>• {t("t&c.agreementTopic2")}</p>
                        <p>• {t("t&c.agreementTopic3")}</p>
                        <p>• {t("t&c.agreementTopic4")}</p>
                    </div>

                    <h1 className="text-lg font-[arial] uppercase mt-4 ">
                        3- {t("t&c.createAccountClarificationTitle1")}
                    </h1>
                    <div className="font-serif leading-relaxed text-gray-700 dark:text-gray-200 space-y-3 italic">

                        <p>{t("t&c.createAccountClarification1")}</p>
                        <p>{t("t&c.createAccountClarification2")}</p>
                        <p>{t("t&c.createAccountClarification3")}</p>
                        <p>{t("t&c.createAccountClarification4")}</p>
                        <p>{t("t&c.createAccountClarification5")}</p>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="neutral"
                        onClick={()=>{setOpenModal(false)}}
                    >{t("defaults.close")}</Button>
                </ModalFooter>
            </Modal>
        </PageWrapper>
    );
}


