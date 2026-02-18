import {HttpClient} from "@/app/libs/https.ts";

interface LoginPayload {
    username: string;
    password: string;
}

export const createLogin = (http: HttpClient) => {

    return {
        login: (data: LoginPayload, deviceId:string) =>
            http('/auth/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'x-device-id': deviceId
                }
            })
    }
}

export const createRecoverPassword = (http: HttpClient) => {

    return {
        recover: (email: string) =>
            http('/auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify({email}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
    }
}

export const createTOTP = (http: HttpClient) => {
    return {
        verifyTotp: (code: string, token: string) =>
            http("/users/verify-2fa", {
                method: 'POST',
                body: JSON.stringify({code}),
                headers: {
                    'x-access-token': token,
                    'Content-Type': 'application/json'
                }
            })
    }
}

export const createBackupCodeVerification = (http: HttpClient) => {
    return {
        verifyBackupCode: (code: string, email: string) =>
            http("/auth/backup-code/check", {
                method: 'POST',
                body: JSON.stringify({backupCode:code, email}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    }
}

export const createUserInfoRequest = (http: HttpClient) => {

    return {
        userInfo: (token: string) =>
            http("/users/me", {
                method: 'GET',
                headers: {
                    'x-access-token': token,
                    'Content-Type': 'application/json'
                }
            }),
    }
}