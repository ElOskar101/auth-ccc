import {PageWrapper} from "@/app/components/page-wrapper.tsx";
import {Card, CardBody, CardFooter, CardHeader} from "@/app/components/ui/card";
import {LogoImage} from "@/app/components/ui/logo-image.tsx";
import {useAppSelector} from "@/app/hooks/useAppSelector.ts";
import {LangAndThemeSelector} from "@/app/pages/auth/components/lang-and-theme-selector.tsx";
import {Button, Input, Label, LinkButton} from "@/app/components/ui";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import i18n from "i18next";
import {useLanguageContext} from "@/app/context/LanguageContext.tsx";
import {InputPassword} from "@/app/components/ui/input-password.tsx";

export const RegisterPage = ()=> {
    const { currentApp } = useAppSelector();
    const {language} = useLanguageContext();
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
                    <form noValidate onSubmit={onHandleRegister} >
                        <fieldset className="space-y-5">
                            <p className="text-center font-semibold dark:text-amber-500 text-md text-orange-600">{'Invalid credentials'}</p>
                            <Label
                                htmlFor="username"
                            >{t('register.username')}</Label>
                            <Input
                                name="username"
                                id="username"
                                placeholder={t('register.usernamePlaceholder')}
                            />
                            <Label
                                htmlFor="email"
                            >{t('register.email')}</Label>
                            <Input
                                name="email"
                                id="email"
                                placeholder={t('register.emailPlaceholder')}
                            />
                            <Label
                                htmlFor="password"
                            >{t('register.password')}</Label>
                            <InputPassword placeholder={t('register.passwordPlaceholder')}/>
                            <Label
                                htmlFor="repeated-password"
                            >{t('register.repeatPassword')}</Label>
                            <Input
                                type="repeated-password"
                                name="repeated-password"
                                id="repeated-password"
                                placeholder={t('register.repeatedPasswordPlaceholder')}
                            />
                            <div className="flex gap-1">
                                <input type="checkbox"/>
                                <p className="text-gray-500 dark:text-gray-50">I do accept
                                    <LinkButton href={'#'}> terms and conditions</LinkButton>
                                </p>
                            </div>


                            <Button
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