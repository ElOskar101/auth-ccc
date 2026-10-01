import {ReactNode} from "react";
interface IProps {children: ReactNode}

export const Container = ({children}: IProps)=>{
    return (
        <div className="flex flex-col min-h-dvh">
            {children}
        </div>
    );
}