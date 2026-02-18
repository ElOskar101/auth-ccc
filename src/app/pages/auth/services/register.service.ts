import {HttpClient} from "@/app/libs/https.ts";
import {RegisterFormData, ForgotPasswordFormData} from "@/app/pages/auth/schema/register.schema.ts";
interface ChangePasswordInterface extends ForgotPasswordFormData {
    email: string;
}
export const createRegister = (http: HttpClient) => {

    return {
        register: (data: RegisterFormData) =>
            http('/v2/auth/signup', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
    }
}

export const createChangePassword = (http: HttpClient) => {

    return {
        validateCode: (data: ChangePasswordInterface) =>
            http('/v2/auth/change-password/', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
    }
}
