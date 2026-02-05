import { Routes, Route } from "react-router-dom";
import {AuthLayout} from "./app/layouts/AuthLayout";
import {LoginPage} from "./app/pages/auth/login.page.tsx";
import {RegisterPage} from "./app/pages/auth/register.page.tsx";
import {ForgotPasswordPage} from "./app/pages/auth/forgot-password.page.tsx";
import {RecoverPasswordLayout} from "@/app/layouts/RecoverPasswordLayout.tsx";


export const AppRoutes = () => {
    return (
        <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout/>}>
                <Route index element={<LoginPage/>}/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>

            </Route>
            <Route element={<RecoverPasswordLayout/>}>
                <Route index element={<ForgotPasswordPage/>}/>
                <Route path="forgot-password" element={<ForgotPasswordPage/>}/>
            </Route>
        </Routes>
    )
}