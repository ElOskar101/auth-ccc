import React, {useMemo} from "react";
import {LoginFormData} from "@/app/pages/auth/schema/login.schema.ts";
import {createLogin, createRecoverPassword, createUserInfoRequest} from "@/app/pages/auth/services/login.service.ts";
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
    const { currentApp } = useAppSelectorContext()

    const http = useMemo(() =>
        createHttpClient(currentApp?.apiUrl || ''), [currentApp?.apiUrl])

    const authService = useMemo(() => {
        const loginService = createLogin(http)
        const userService = createUserInfoRequest(http)
        const recoverService = createRecoverPassword(http)
        return {
            ...loginService,
            ...userService,
            ...recoverService
        }}, [http])



    const executeLogin = async (data: LoginFormData) => {
        setIsLoading(true)

        try {
            return await authService.login(data) as LoginResponse;
        } catch (err: any) {
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const executeRecover = async (email: string) => {
        setIsLoading(true)

        try {
            return await authService.recover(email) as { message: string };
        } catch (err: any) {
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const executeGetUserInfo = async (token: string) => {
        setIsLoading(true)

        try {
            return await authService.userInfo(token) as UserInterface;
        } catch (err: any) {
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return {
        executeLogin,
        executeGetUserInfo,
        executeRecover,
        isLoading
    }
}