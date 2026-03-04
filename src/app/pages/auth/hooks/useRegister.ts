import React, {useMemo} from "react";
import {RegisterFormData, ForgotPasswordFormData} from "@/app/pages/auth/schema/register.schema.ts";
import {createChangePassword, createRegister} from "@/app/pages/auth/services/register.service.ts";
import {useAppSelectorContext} from "@/app/pages/auth/context/AppSelectorContext.tsx";
import {createHttpClient} from "@/app/libs/https.ts";
import {ApiError} from "@/app/types/error.type.ts";

export interface ChangePasswordInterface extends ForgotPasswordFormData {
    email?: string | undefined;
    recoveringCode?:string,
}

export const useRegister = () => {
    const [isLoading, setIsLoading] = React.useState(false);
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
            throw err as ApiError
        } finally {
            setIsLoading(false)
        }
    }
    const executeChangePassword = async (data: ChangePasswordInterface) => {
        setIsLoading(true)
        try {
            return await registerService.validateCode(data);
        } catch (err: any) {
            throw err as ApiError
        } finally {
            setIsLoading(false)
        }
    }


    return {
        executeRegister,
        executeChangePassword,
        isLoading
    }
}