import { Outlet } from "react-router-dom";
import {Footer} from "@/app/components/ui";


export const AuthLayout = () => {
    return (

        <div className="flex flex-col min-h-screen justify-center items-center bg-zinc-100 dark:bg-zinc-900">
                <Outlet/>
                <Footer/>
        </div>

    );
}