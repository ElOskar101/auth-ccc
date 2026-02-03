import {HttpClient} from "@/app/libs/https.ts";

interface RegisterPayload {
    fullName: string;
    email: string;
    username: string;
    password: string;
}

export const createRegister = (http: HttpClient) => {

    return {
        register: (data: RegisterPayload) =>
            http('/api/signup', {
                method: 'POST',
                body: JSON.stringify(data),
            }),
    }
}