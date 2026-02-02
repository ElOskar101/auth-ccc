import React from "react";
import {cn} from "@/app/libs/utils.ts";

interface InputTOTPProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string
    onChange: (value: string) => void
}

export const InputTOTP = ({
                              className,
                              value,
                              onChange,
                              ...props
                          }: InputTOTPProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numeric = e.target.value.replace(/\D/g, '').slice(0, 6)
        onChange(numeric)
    }

    return (
        <input
            {...props}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={value}
            onChange={handleChange}
            maxLength={6}
            placeholder="123456"
            className={cn(
                'w-full text-center tracking-widest text-lg font-mono',
                'border rounded-lg px-4 py-2',
                'focus:ring-1 focus:ring-blue-600 focus:outline-none',
                className
            )}
        />
    )
}
