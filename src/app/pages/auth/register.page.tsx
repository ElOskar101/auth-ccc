import {PageWrapper} from "@/app/components/page-wrapper.tsx";
import {Card, CardBody, CardFooter, CardHeader} from "@/app/components/ui/card";
import {LogoImage} from "@/app/components/ui/logo-image.tsx";
import {useAppSelector} from "@/app/hooks/useAppSelector.ts";
import {LangAndThemeSelector} from "@/app/pages/auth/components/lang-and-theme-selector.tsx";

export const RegisterPage = ()=> {
    const { currentApp } = useAppSelector();

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
                                src={currentApp.logo}
                                alt={currentApp.id}
                            />
                        </>
                    )
                    }

                </CardHeader>

            </Card>
        </PageWrapper>
    );
}