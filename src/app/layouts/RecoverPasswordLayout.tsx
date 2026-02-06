import { Outlet } from "react-router-dom";
import {Container} from "@/app/components/container.tsx";

export const RecoverPasswordLayout = () => {
    return (
        <Container>
                <Outlet/>
        </Container>
    );
}