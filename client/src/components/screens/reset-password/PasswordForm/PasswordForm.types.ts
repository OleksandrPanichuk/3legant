import { z } from "zod";


export const formSchema = z.object({
    password: z.string().min(8,'Password is too short'),
    confirmPassword: z.string().min(8, 'Confirm password it too short'),
})

export type TypeFormData = z.infer<typeof formSchema>

export interface IPasswordFormProps {
    code:string
}