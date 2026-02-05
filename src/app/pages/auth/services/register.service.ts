import {HttpClient} from "@/app/libs/https.ts";
import {RegisterFormData, ForgotPasswordFormData} from "@/app/pages/auth/schema/register.schema.ts";
interface ChangePasswordInterface extends ForgotPasswordFormData {
    email: string;
}
export const createRegister = (http: HttpClient) => {

    return {
        register: (data: RegisterFormData) =>
            http('/api/signup', {
                method: 'POST',
                body: JSON.stringify(data),
            }),
    }
}

export const createChangePassword = (http: HttpClient) => {

    return {
        changePassword: (data: ChangePasswordInterface) =>
            http('/api/reset', {
                method: 'PUT',
                body: JSON.stringify(data),
            }),
    }
}