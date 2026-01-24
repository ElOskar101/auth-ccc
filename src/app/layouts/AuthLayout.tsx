import { Outlet } from "react-router-dom";
import {Footer} from "@/app/components/ui";
import {Container} from "@/app/components/container.tsx";



export const AuthLayout = () => {
    return (

        <Container>
                <Outlet/>
                <Footer/>
        </Container>
    );
}