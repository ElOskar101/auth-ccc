import React, {useState} from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { RiEyeCloseLine } from "react-icons/ri";

export const InputPassword = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    return (
        <div className="relative">
            <input
                type={isVisiblePassword ? 'text' : 'password'} id="password" name="password" autoComplete="current-password"
                {...props}
                className={`mt-1 text-lg p-1 text-gray-700 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-50 focus:ring-0 ${props.className}`}
            />
            <button
                type="button"
                onClick={() => {setIsVisiblePassword(!isVisiblePassword)}}
                className='absolute inset-y-0 end-0 w-8 cursor-pointer dark:text-gray-700  text-back'>
                {isVisiblePassword ? (
                    <BsFillEyeFill size={24}/>
                ) : (
                    <RiEyeCloseLine size={24}/>
                )
                }

            </button>

        </div>

    );
}