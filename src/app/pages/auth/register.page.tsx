import {PageWrapper} from "@/app/components/page-wrapper.tsx";
import {Card, CardBody, CardFooter, CardHeader} from "@/app/components/card";
import {LogoImage} from "@/app/components/ui/logo-image.tsx";
import {useAppSelector} from "@/app/hooks/useAppSelector.ts";
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
import {RegisterFormData, registerSchema} from "@/app/pages/auth/schema/register.schema.ts";
import {RoundedTinyButton} from "@/app/components/ui/rounded-tiny-button.tsx";

const passwordRules = [
    {
        label: 'Menos de 25 caracteres',
        test: (v: string) => v.length < 25,
    },{
        label: 'Mínimo 8 caracteres',
        test: (v: string) => v.length >= 8,
    },
    {
        label: 'Un número',
        test: (v: string) => /[0-9]/.test(v),
    },
    {
        label: 'Una letra',
        test: (v: string) => /[a-zA-Z]/.test(v),
    }
];


export const RegisterPage = ()=> {
    const { currentApp } = useAppSelector();
    const {language} = useLanguageContext();
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
    }, [language]);

    const onHandleRegister = () => {
        return true;
    }

    return (
        <PageWrapper>
            <Card>
                <CardHeader>
                    <div className="flex">
                        <LangAndThemeSelector/>
                    </div>
                    {currentApp && (
                        <>
                            <LogoImage
                                src='/new-ccc-isolated-logo.svg'
                                alt={currentApp.id}
                                width={100}
                            />
                        </>
                    )
                    }

                </CardHeader>
                <CardBody>
                    <form noValidate onSubmit={form.handleSubmit(onHandleRegister)} >
                        <fieldset className="space-y-3">
                            <div className="">
                                <Label
                                    htmlFor="username"
                                >{t('register.username')}</Label>
                                <Input
                                    id="username"
                                    {...form.register('username')}
                                    placeholder={t('register.usernamePlaceholder')}
                                />
                                {form.formState.errors.username && (
                                    <RequiredFieldsMessage>{form.formState.errors.username.message}</RequiredFieldsMessage>
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
                                {form.formState.errors.email && (
                                    <RequiredFieldsMessage>{form.formState.errors.email.message}</RequiredFieldsMessage>
                                )}
                            </div>

                            <div className="">
                                <Label
                                    htmlFor="password"
                                >{t('register.password')}</Label>
                                <InputPassword
                                    {...form.register('password')}
                                    placeholder={t('register.passwordPlaceholder')}/>
                                <ul className="mt-2 space-y-1 text-sm">
                                    {passwordRules.map(rule => {
                                        const valid = rule.test(password);
                                        return (
                                            <li
                                                key={rule.label}
                                                className={valid ? 'text-green-600 dark:text-green-500' : 'text-gray-400'}
                                            >
                                                {valid ? '✔' : '•'} {rule.label}
                                            </li>
                                        );
                                    })}
                                </ul>
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
                                        {password === repeatedPassword ? '✔' : '•'} Password must match
                                    </p>
                                )}

                            </div>

                            <div className="flex gap-1">
                                <input type="checkbox" checked={termsAndConditionsAccepted} onChange={()=>{setTermsAndConditionsAccepted(!termsAndConditionsAccepted)}}/>
                                <p className="text-gray-500 dark:text-gray-50">{t("register.acceptThe")}
                                    <LinkButton href={'#'} action={()=>setOpenModal(true)}>{t("register.t&c")}</LinkButton>
                                </p>
                            </div>


                            <Button
                                disabled={!termsAndConditionsAccepted || !form.formState.isValid}
                                type="submit"
                                role="button"
                                className="w-full"
                                variant="primary"
                            >{t('register.createAccount')}</Button>

                        </fieldset>
                    </form>

                </CardBody>

                <CardFooter>
                    <LinkButton href='/login' options={{replace: true}}>{t('register.backToLogin')}</LinkButton>
                </CardFooter>
            </Card>

            {/* TERMS AND CONDITIONS MODAL */}
            <Modal isOpen={openModal} onClose={()=>setOpenModal(false)}>
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
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="neutral"
                    >{t("defaults.close")}</Button>
                </ModalFooter>
            </Modal>
        </PageWrapper>
    );
}


