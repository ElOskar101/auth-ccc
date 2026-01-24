import {ReactNode} from "react";
interface IProps {children: ReactNode}

export const Container = ({children}: IProps)=>{
    return (
        <div className="flex flex-col min-h-screen bg-zinc-100 dark:bg-zinc-900">
            {children}
        </div>
    );
}