import {AppRoutes} from "./AppRoutes.tsx";
import {useTheme} from "@/app/hooks/useTheme.ts";
import {Toaster} from "sonner";

export const App = ()=>{
    const { theme } = useTheme()
    return(
        <><Toaster theme={theme} position="top-right"/><AppRoutes/></>
    );
}


