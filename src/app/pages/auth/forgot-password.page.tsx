import {PageWrapper} from "@/app/components/page-wrapper.tsx";
import {Card, CardBody, CardFooter, CardHeader} from "@/app/components/card";
import {LogoImage} from "@/app/components/ui/logo-image.tsx";
import {useAppSelector} from "@/app/pages/auth/hooks/useAppSelector.ts";
import {Button, Input, Label, LinkButton} from "@/app/components/ui";
import {LangAndThemeSelector} from "@/app/pages/auth/components/lang-and-theme-selector.tsx";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import {useLanguage} from "@/app/hooks/useLanguage.ts";
import i18n from "i18next";

export const ForgotPasswordPage = ()=> {
    const {language} = useLanguage();
    const {currentApp} = useAppSelector();
    const { t } = useTranslation();
    useEffect(() => {
        void i18n.changeLanguage(language);
    }, [language]);
    return (
       <PageWrapper>
              <Card>
                  <CardHeader title="Forgot Password">
                      <div className="flex">
                          <LangAndThemeSelector/>
                      </div>
                      {currentApp && (
                          <>
                            <LogoImage src={currentApp.logo} alt={currentApp.id} width={100} />
                              <p className="text-center dark:text-gray-50 text-lg font-semibold text-gray-700 py-3 ">{`${t('login.loginTo')} ${currentApp.name}`}</p>
                          </>
                      )}
                  </CardHeader>
                  <CardBody>
                      <form noValidate className="space-y-5">
                          <Label htmlFor="email">Email Address:</Label>
                          <div className="flex gap-2">
                                <Input type="email" id="email" name="email" required
                                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                              <Button>Aceptar</Button>
                          </div>

                      </form>
                  </CardBody>

                  <CardFooter>
                      <LinkButton href="/login">Back to login</LinkButton>
                  </CardFooter>

              </Card>
       </PageWrapper>
    );
}