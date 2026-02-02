import {HttpClient} from "@/app/libs/https.ts";

interface LoginPayload {
    username: string;
    password: string;
}

export const createLogin = (http: HttpClient) => {

    return {
        login: (data: LoginPayload) =>
            http('/api/signin', {
                method: 'POST',
                body: JSON.stringify(data),
            }),
    }
}

export const createUserInfoRequest = (http: HttpClient) => {

    return {
        userInfo: (token: string) =>
            http('/api/users/me', {
                method: 'GET',
                headers: {
                    'x-access-token': token
                }
            }),
    }
}