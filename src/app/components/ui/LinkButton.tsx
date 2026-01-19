import React from "react";
import {useNavigate} from "react-router-dom";

export const LinkButton = ({ href, children }: { href: string; children: React.ReactNode }) => {

    const navigate = useNavigate();
    return (
        <a onClick={()=>navigate(href)}
           className="text-blue-700 hover:text-blue-800 hover:cursor-pointer">
            {children}
        </a>
    );
}