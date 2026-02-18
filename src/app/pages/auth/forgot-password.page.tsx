import {ForgotPasswordFormData, forgotPasswordSchema} from "@/app/pages/auth/schema/register.schema.ts";
import {LangAndThemeSelector} from "@/app/pages/auth/components/lang-and-theme-selector.tsx";
import {Card, CardBody, CardFooter, CardHeader} from "@/app/components/card";
import {useAppSelector} from "@/app/pages/auth/hooks/useAppSelector.ts";
import {Button, Input, Label, LinkButton} from "@/app/components/ui";
import {InputPassword} from "@/app/components/ui/input-password.tsx";
import {useLanguageContext} from "@/app/context/LanguageContext.tsx";
import {PasswordRule} from "@/app/components/ui/password-rules.tsx";
import {useRegister} from "@/app/pages/auth/hooks/useRegister.ts";
import {PageWrapper} from "@/app/components/page-wrapper.tsx";
import {LogoImage} from "@/app/components/ui/logo-image.tsx";
import {Spinner} from "@/app/components/ui/spinner.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {useSearchParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {toast} from "sonner";
import i18n from "i18next";


export const ForgotPasswordPage = ()=> {
    const { executeChangePassword, isLoading, error } = useRegister();

    const {currentApp, setCurrentApp, APPS} = useAppSelector();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const {language} = useLanguageContext();


    const form = useForm<ForgotPasswordFormData>(
        {mode: 'onChange', resolver: zodResolver(forgotPasswordSchema)}
    );

    const repeatedPassword = form.watch('repeatedPassword') || '';
    const email = atob (searchParams.get('user') || '');
    const env = searchParams.get('env') || '';
    const password = form.watch('password')|| '';
    const { t } = useTranslation();


    useEffect(() => {
        void i18n.changeLanguage(language);
    }, [language]);

    useEffect(() => {
        if (APPS[0])
            setCurrentApp(APPS.find(app=>app.type === env) || APPS[0]);
    }, [env]);

    const onHandleChangePassword = (data: ForgotPasswordFormData) => {
        const newData = {...data, email: email};
        executeChangePassword(newData).then(
            ()=> {
                form.reset();
                toast.success(t('forgotPassword.redirectToLogin'), {
                        duration: 3000,
                        onAutoClose: () => navigate('/login', {replace: true})
                    });
            }
        ).catch(()=>{
            toast.error(error);
        });
    }

    return (
       <PageWrapper>
              <Card>
                  <CardHeader title="Forgot Password">
                      <div className="flex">
                          <LangAndThemeSelector/>
                      </div>
                      {currentApp && (
                          <>
                            <LogoImage
                                className={currentApp.type === 'dev' ? 'grayscale':''}
                                src={currentApp.logo} alt={currentApp.id} width={100} />
                              <p className="text-center dark:text-gray-50 text-lg font-semibold text-gray-700 py-3">
                                  {`${currentApp.name}`}
                              </p>
                          </>
                      )}
                  </CardHeader>
                  <CardBody>
                      <form noValidate className="space-y-5" onSubmit={form.handleSubmit(onHandleChangePassword)}>
                          <div>
                              <Label htmlFor="email">{t('register.email')}</Label>
                              <Input id="email"
                                     value={email}
                                     disabled
                                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                          </div>
                          <div>
                              <Label htmlFor="email">{t('register.passwordPlaceholder')}</Label>
                              <InputPassword
                                    required
                                    placeholder={t('register.password')}
                                    {...form.register('password')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                              <PasswordRule password={password}/>
                          </div>

                          <div>
                              <Label htmlFor="repeated-password">{t('register.repeatPassword')}</Label>
                              <InputPassword
                                    id="repeated-password"
                                    required
                                    placeholder={t('register.repeatedPasswordPlaceholder')}
                                    {...form.register('repeatedPassword')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                              {(password && repeatedPassword) && (
                                  <p className={`mt-2 text-sm ${password !== repeatedPassword ? "text-gray-400":"text-green-600"}`}>
                                      {password === repeatedPassword ? '✔' : '•'}{t('register.formRules.passwordRule5')}
                                  </p>
                              )}
                          </div>

                          <Button disabled={!form.formState.isValid || isLoading || (password !== repeatedPassword)}
                              className="w-full"
                                  variant={currentApp?.type === "dev" ? "neutral" : "primary"}>
                              <Spinner hidden={!isLoading} />
                              {t('defaults.accept')}</Button>
                      </form>
                  </CardBody>

                  <CardFooter>
                      <LinkButton href="/login">{t('register.backToLogin')}</LinkButton>
                  </CardFooter>

              </Card>
       </PageWrapper>
    );
}