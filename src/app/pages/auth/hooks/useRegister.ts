import React, {useMemo} from "react";
import {RegisterFormData} from "@/app/pages/auth/schema/register.schema.ts";
import {createRegister} from "@/app/pages/auth/services/register.service.ts";
import {useAppSelectorContext} from "@/app/pages/auth/context/AppSelectorContext.tsx";
import {createHttpClient} from "@/app/libs/https.ts";


export interface UserRegisterInterface {
    password: string;
    username: string;
    email: string;
    fullName: string;
}

export const useRegister = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const { currentApp } = useAppSelectorContext()

    const http = useMemo(() =>
        createHttpClient(currentApp?.apiUrl || ''), [currentApp?.apiUrl])

    const registerService = useMemo(() =>
        createRegister(http)
        , [http])



    const executeRegister = async (data: RegisterFormData) => {
        setIsLoading(true)
        setError(null)

        try {
            return await registerService.register(data) as UserRegisterInterface;
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setIsLoading(false)
        }
    }


    return {
        executeRegister,
        isLoading,
        error
    }
}