import React from "react";
import {useNavigate} from "react-router-dom";
import {RouterNavigateOptions} from "react-router";

interface Props {
    href: string;
    options?: RouterNavigateOptions;
    children: React.ReactNode
}

export const LinkButton = ({href, options, children}: Props  ) => {

    const navigate = useNavigate();
    return (
        <a onClick={()=>navigate(href, options)}
           className="text-blue-700 hover:text-blue-800 hover:cursor-pointer">
            {children}
        </a>
    );
}