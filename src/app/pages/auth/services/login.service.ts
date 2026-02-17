import {HttpClient} from "@/app/libs/https.ts";

interface LoginPayload {
    username: string;
    password: string;
}

export const createLogin = (http: HttpClient) => {
    return {
        login: (data: LoginPayload) =>
            http("/signin", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    }
}

export const createRecoverPassword = (http: HttpClient) => {

    return {
        recover: (email: string) =>
            http("/recover", {
                method: 'POST',
                body: JSON.stringify({email}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
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