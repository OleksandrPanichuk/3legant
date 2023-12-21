import { z } from "zod";


export const findAllUsersSchema = z.object({
    searchValue: z.string().optional(),
    take: z.number().nonnegative().optional(),
    skip: z.number().nonnegative().optional()
})

export type FindAllUsersInput = z.infer<typeof findAllUsersSchema>