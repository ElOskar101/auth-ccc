import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string().min(1, "This file is required").max(24, "username too long").trim(),
    password: z.string().min(8).max(24).trim().regex(/[0-9]/, 'Al menos un número').regex(/[a-zA-Z]/, 'Al menos un número'),
    repeatedPassword: z.string().min(8).max(24).trim(),
    email: z.email('Invalid entered email').trim().max(68).trim(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;