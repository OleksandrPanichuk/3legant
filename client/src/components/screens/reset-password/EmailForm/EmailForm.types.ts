import { z } from "zod";


export const formSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email address')
})

export type TypeFormData = z.infer<typeof formSchema>