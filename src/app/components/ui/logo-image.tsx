import React from "react";
import { cn } from "@/app/libs/utils.ts";

export const LogoImage = ({src, alt, className, ...props}: React.ImgHTMLAttributes<HTMLImageElement>) =>{
    return (
        <img
            {...props}
            src={src}
            alt={alt}
            className= {cn('mx-auto dark:brightness-110 dark:contrast-110 dark:saturate-110', className)}
        />
    );
}