import { TypeProductWithImages } from '@/shared/types'
import { z } from 'zod'

export const createProductSchema = z.object({
	title: z
		.string({ required_error: 'Product name is required' })
		.min(1, 'Product name is too short'),
	description: z
		.string({ required_error: 'Description is required' })
		.min(200, 'Description is too short (min 200 characters)'),
	price: z
		.number({ required_error: 'Price is required' })
		.nonnegative('Price cannot be negative')
		.min(5, 'The minimum price is $5'),
	measurements: z
		.string({ required_error: 'Measurements are required' })
		.min(1, 'Measurements are required'),
	details: z
		.string({ required_error: 'Detailed info is required' })
		.min(200, 'Detailed info is too short'),
	width: z
		.string({ required_error: 'Width is required' })
		.min(1, 'Width is required'),
	height: z
		.string({ required_error: 'Height is required' })
		.min(1, 'Height is required'),
	length: z
		.string({ required_error: 'Length is required' })
		.min(1, 'Length is required'),
	weight: z
		.string({ required_error: 'Weight is required' })
		.min(1, 'Weight is required'),
	packages: z
		.number({ required_error: 'Packages count is required' })
		.nonnegative('Packages count cannot be negative'),
	categories: z
		.array(z.string())
		.min(1, 'Please, choose at least one category'),
	previewImage: z.custom<File>(v => v instanceof File, {
		message: 'File is required',
	}),
})

export type CreateProductInput = z.infer<typeof createProductSchema>

const pricesSchema = z.object({
	start: z.number().nonnegative(),
	end: z.number().nonnegative(),
})

export const findAllProductsSchema = z.object({
	take: z.number().nonnegative().optional(),
	skip: z.number().nonnegative().optional(),
	searchValue: z.string().optional(),
	category: z.string().optional(),
	prices: z.array(pricesSchema).optional(),
	sortBy: z.string().optional(),
	sortOrder: z.enum(['asc', 'desc']).optional(),
})

export type FindAllProductsInput = z.infer<typeof findAllProductsSchema>

export type FindAllProductsResponse = {
	count: number
	products: TypeProductWithImages[]
}
