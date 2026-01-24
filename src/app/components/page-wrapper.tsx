import {ReactNode} from "react";
interface IProps {children: ReactNode}

export const PageWrapper = ({children}: IProps)=>{
    return (
        <main className="flex-1 w-full flex justify-center items-center px-4">
            {children}
        </main>
    );
}