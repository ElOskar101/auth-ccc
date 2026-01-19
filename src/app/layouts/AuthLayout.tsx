import { Outlet } from "react-router-dom";
import {Footer} from "../components/ui/Footer.tsx";


export const AuthLayout = () => {
    return (

        <div className="flex flex-col min-h-screen justify-center items-center bg-zinc-100">
                <Outlet/>
                <Footer/>
        </div>

    );
}