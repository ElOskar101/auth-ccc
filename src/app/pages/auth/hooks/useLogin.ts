import React, {useMemo} from "react";
import {LoginFormData} from "@/app/pages/auth/schema/login.schema.ts";
import {useAppSelectorContext} from "@/app/pages/auth/context/AppSelectorContext.tsx";
import {createHttpClient} from "@/app/libs/https.ts";
import {
    createBackupCodeVerification,
    createLogin,
    createRecoverPassword,
    createTOTP, createUserInfoRequest
} from "@/app/pages/auth/services/login.service.ts";

export interface LoginResponse {
    token: string;
    deviceId?: string;
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
    const { currentApp } = useAppSelectorContext();

    const http = useMemo(() =>
        createHttpClient(currentApp?.apiUrl || ''), [currentApp?.apiUrl])

    const authService = useMemo(() => {
        const loginService = createLogin(http)
        const userService = createUserInfoRequest(http)
        const totpCodeService = createTOTP(http)
        const backupCode = createBackupCodeVerification(http)
        const recoverService =  createRecoverPassword(http)
        return {
            ...loginService,
            ...userService,
            ...recoverService,
            ...totpCodeService,
            ...backupCode
        }}, [http])



    const executeLogin = async (data: LoginFormData) => {
        setIsLoading(true);
        const deviceId = localStorage.getItem("deviceId") || '';

        try {
            return await authService.login(data, deviceId);
        } catch (err: any) {
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const executeRecover = async (email: string) => {
        setIsLoading(true)

        try {
            return await authService.recover(email);
        } catch (err: any) {
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const executeGetUserInfo = async (token: string) => {
        setIsLoading(true)

        try {
            return await authService.userInfo(token);
        } catch (err: any) {
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const executeTotp = async (code: string, token:string) => {
        setIsLoading(true)
        try {
            return await authService.verifyTotp(code, token);
        } catch (err: any) {
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const executeBackupCodeVerification = async (code: string, email:string) => {
        setIsLoading(true)
        try {
            return await authService.verifyBackupCode(code, email);
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
        executeTotp,
        executeBackupCodeVerification,
        isLoading
    }
}