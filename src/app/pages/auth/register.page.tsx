import {PageWrapper} from "@/app/components/page-wrapper.tsx";
import {Card, CardBody, CardFooter, CardHeader} from "@/app/components/ui/card";
import {LogoImage} from "@/app/components/ui/logo-image.tsx";
import {useAppSelector} from "@/app/hooks/useAppSelector.ts";
import {LangAndThemeSelector} from "@/app/pages/auth/components/lang-and-theme-selector.tsx";
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
                                                className={valid ? 'text-green-600' : 'text-gray-400'}
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
                                <p className="text-gray-500 dark:text-gray-50">I do accept
                                    <LinkButton href={'#'}> terms and conditions</LinkButton>
                                </p>
                            </div>


                            <Button
                                disabled={!termsAndConditionsAccepted || !form.formState.isValid}
                                type="submit"
                                role="button"
                            >{t('register.createAccount')}</Button>

                        </fieldset>
                    </form>

                </CardBody>

                <CardFooter>
                    <LinkButton href='/login' options={{replace: true}}>{t('register.backToLogin')}</LinkButton>
                </CardFooter>
            </Card>
        </PageWrapper>
    );
}


/*
Al crear una cuenta en Control Central podrás:
- Acceder al dashboard de Control Central
- Acceder al dashboard de Incidents
- Conectar tu cuenta al proceso de ejecuciones en producción (actualizaciones de bots, contraseñas, administración de clientes...)
- Tener acceso interno a los servicios y apps de CC (Formless, Lite Plans, Executions...)

Algunos accesos varían en dependencia del rol y del área
Una vez creada, la cuenta debe ser activada por el administrador: solicita a tu superior la activación de esta cuenta.
Soliita a tu superior la clavde de ingreso para tu área
Para obtener una cuenta de desarrollo, contacta con el administrador. Si ya tienes una cuenta de desarrollo, selecciona la app de desarrollo en la esquina superior derecha de este sitio web


Al crear tu cuenta en Control Central aceptas lo siguiente:
1- No compartirás tus credenciales de acceso (nadie, ni siquiera el administrador conocerá tu contraseña)
2- Usarás un correo brindado por la empresa
3- El sistema registrará las acciones que realices en Control Central
4- Usarás factor de doble autenticación (es necesario una app autenticarse)

*/