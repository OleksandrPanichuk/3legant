import { TypeCategory } from "@/shared/types"
import { z } from "zod"



export const findAllCategoriesSchema = z.object({
    searchValue : z.string().optional(),
    take: z.number().nonnegative().optional(),
    skip: z.number().nonnegative().optional()
})

export type FindAllCategoriesInput = z.infer<typeof findAllCategoriesSchema>

export type FindAllCategoriesResponse = {
    categories: TypeCategory[]
    count: number
}

