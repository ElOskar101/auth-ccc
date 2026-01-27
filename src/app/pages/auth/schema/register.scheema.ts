import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string().min(1).max(24).trim(),
    password: z.string().min(8).max(24).trim(),
    repeatPassword: z.string().min(8).max(24).trim(),
    email: z.email().trim().max(68).trim(),
});

export type RegisterForm = z.infer<typeof registerSchema>;