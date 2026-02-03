import React, {useMemo} from "react";
import {LoginFormData} from "@/app/pages/auth/schema/login.schema.ts";
import {createLogin, createUserInfoRequest} from "@/app/pages/auth/services/login.service.ts";
import {useAppSelectorContext} from "@/app/pages/auth/context/AppSelectorContext.tsx";
import {createHttpClient} from "@/app/libs/https.ts";

interface LoginResponse {
    token: string;
}

export interface UserInterface {
    _id: string;
    username: string;
    email: string;
    fullName: string;
    urlImage: string;
}

export const useLogin = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const { currentApp } = useAppSelectorContext()

    const http = useMemo(() =>
        createHttpClient(currentApp?.apiUrl || ''), [currentApp?.apiUrl])

    const authService = useMemo(() => {
        const loginService = createLogin(http)
        const userService = createUserInfoRequest(http)
        return {
            ...loginService,
            ...userService,
        }}, [http])



    const executeLogin = async (data: LoginFormData) => {
        setIsLoading(true)
        setError(null)

        try {
            return await authService.login(data) as LoginResponse;
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const executeGetUserInfo = async (token: string) => {
        setIsLoading(true)
        setError(null)

        try {
            return await authService.userInfo(token) as UserInterface;
        } catch (err: any) {
            setError(err.message)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return {
        executeLogin,
        executeGetUserInfo,
        isLoading,
        error
    }
}