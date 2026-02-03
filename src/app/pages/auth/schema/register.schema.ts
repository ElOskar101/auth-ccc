import { z } from 'zod'

export const registerSchema = z.object({
    fullName: z.string()
        .min(1, "register.formRules.defaultRequired")
        .max(24, "register.formRules.fullNameRule1")
        .refine(
            (value) => !/\d/.test(value),
            {
                message: "register.formRules.fullNameRule2",
            }
        )
        .trim(),
    username: z.string()
        .min(1, "register.formRules.defaultRequired")
        .max(24, "register.formRules.usernameRule1")
        .refine(
            (value) => !/\s/.test(value),
            {
                message: "register.formRules.passwordRule6",
            }
        )
        .trim(),
    password: z.string()
        .min(8)
        .max(24)
        .trim()
        .regex(/[0-9]/, 'register.formRules.passwordRule3')
        .regex(/[a-zA-Z]/, 'register.formRules.passwordRule4').refine(
            (value) => !/\s/.test(value),
            {
                message: "register.formRules.usernameRule6",
            }
        ),
    repeatedPassword: z.string()
        .min(8)
        .max(24)
        .trim(),
    email: z.email('register.formRules.emailRule1')
        .trim()
        .max(68)
        .trim(),
});

export const passwordRules = [
    {
        label: "register.formRules.passwordRule1",
        test: (v: string) => v.length < 25,
    },{
        label: 'register.formRules.passwordRule2',
        test: (v: string) => v.length >= 8,
    },
    {
        label: 'register.formRules.passwordRule3',
        test: (v: string) => /[0-9]/.test(v),
    },
    {
        label: 'register.formRules.passwordRule4',
        test: (v: string) => /[a-zA-Z]/.test(v),
    },
    {
        label: 'register.formRules.passwordRule6',
        test: (v: string) => !/\s/.test(v),
    }
];

export type RegisterFormData = z.infer<typeof registerSchema>;
