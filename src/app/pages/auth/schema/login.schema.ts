// src/validation/login.schema.ts
import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string().min(1, 'Usuario requerido'),
    password: z.string().min(1, 'Contraseña requerida'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
