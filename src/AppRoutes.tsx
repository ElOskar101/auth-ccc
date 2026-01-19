import { Routes, Route } from "react-router-dom";
import {AuthLayout} from "./app/layouts/AuthLayout";
import {Login} from "./app/pages/auth/Login";
import {Register} from "./app/pages/auth/Register";
import {ForgotPassword} from "./app/pages/auth/ForgotPassword";


export const AppRoutes = () => {
    return (
        <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout/>}>
                <Route index element={<Login/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="forgot-password" element={<ForgotPassword/>}/>
            </Route>
        </Routes>
    )
}