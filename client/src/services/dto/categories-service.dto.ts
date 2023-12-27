import { TypeCategory } from '@/shared/types'
import { z } from 'zod'

export const findAllCategoriesSchema = z.object({
	searchValue: z.string().optional(),
	take: z.number().nonnegative().optional(),
	skip: z.number().nonnegative().optional(),
})

export const newCategorySchema = z.object({
	name: z.string().min(3, { message: 'Category name is too short' }),
})

export const updateCategorySchema = newCategorySchema

export type FindAllCategoriesInput = z.infer<typeof findAllCategoriesSchema>

export type FindAllCategoriesResponse = {
	categories: TypeCategory[]
	count: number
}

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema> & {
	id: string
}

export type CreateCategoryInput = z.infer<typeof newCategorySchema>
