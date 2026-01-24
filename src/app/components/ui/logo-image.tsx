import React from "react";

export const LogoImage = ({src, alt, ...props}: React.ImgHTMLAttributes<HTMLImageElement>) =>{
    return (
        <img
            {...props}
            src={src}
            alt={alt}
            className='w-24 mx-auto dark:brightness-110
                                    dark:contrast-110
                                    dark:saturate-110'
        />
    );
}