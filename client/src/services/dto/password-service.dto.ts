import { z } from "zod";


export const resetPasswordSchema = z.object({
    code: z.string().uuid('Invalid code'),
    password: z.string().min(8, "Password is too short")
})

export const verifyResetPasswordCodeSchema = z.string().uuid('Invalid code')

export const sendPasswordResetLinkSchema = z.string().email('Invalid email address')