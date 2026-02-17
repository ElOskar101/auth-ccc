import { z } from 'zod'

export const totpSchema = z.object({
    code: z.string().length(6, "login.totpRule1").trim(),
    backupCodeInstead: z.boolean(),
});

export type TotpForm = z.infer<typeof totpSchema>;