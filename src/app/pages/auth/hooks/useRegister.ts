import React, {useMemo} from "react";
import {RegisterFormData, ForgotPasswordFormData} from "@/app/pages/auth/schema/register.schema.ts";
import {createChangePassword, createRegister} from "@/app/pages/auth/services/register.service.ts";
import {useAppSelectorContext} from "@/app/pages/auth/context/AppSelectorContext.tsx";
import {createHttpClient} from "@/app/libs/https.ts";

export interface ChangePasswordInterface extends ForgotPasswordFormData {
    email?: string;
    recoveringCode?:string,
}

export const useRegister = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const { currentApp } = useAppSelectorContext()

    const http = useMemo(() =>
        createHttpClient(currentApp?.apiUrl || ''), [currentApp?.apiUrl])

    const registerService = useMemo(() => {
            const createRegisterService = createRegister(http)
            const changePassword = createChangePassword(http)
            return {...createRegisterService, ...changePassword}
        }
        , [http])


    const executeRegister = async (data: RegisterFormData) => {
        setIsLoading(true)
        try {
            return await registerService.register(data);
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setIsLoading(false)
        }
    }
    const executeChangePassword = async (data: ChangePasswordInterface) => {
        setIsLoading(true)
        console.log(currentApp)

        try {
            return await registerService.validateCode(data);
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setIsLoading(false)
        }
    }


    return {
        executeRegister,
        executeChangePassword,
        isLoading,
        error
    }
}