import { z } from 'zod'

export const totpSchema = z.object({
    code: z.string().length(6, "login.totpRule1").trim(),
});

export type TotpForm = z.infer<typeof totpSchema>;