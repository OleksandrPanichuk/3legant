import { Transform } from 'class-transformer'
import {
	IsArray,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	Min,
	ValidateNested,
} from 'class-validator'
import { ProductWithImages } from '../products.types'
import { ProductStatus } from '@prisma/client'

class ProductPrice {
	@IsOptional()
	@IsNumber()
	@Min(0)
	start?: number

	@IsOptional()
	@IsNumber()
	@Min(0)
	end?: number
}

export class FindAllInput {
	@IsOptional()
	@Transform(params => Number(params.value))
	@IsNumber()
	@Min(0)
	take?: number

	@IsOptional()
	@Transform(params => Number(params.value))
	@IsNumber()
	@Min(0)
	skip?: number

	@IsOptional()
	@IsString()
	searchValue?: string

	@IsOptional()
	@IsString()
	category?: string

	@IsOptional()
	@Transform(params => JSON.parse(params.value))
	@ValidateNested()
	@IsArray()
	prices?: ProductPrice[]

	@IsOptional()
	@IsEnum(ProductStatus)
	status?: ProductStatus

	@IsOptional()
	@IsEnum(['title', 'price', 'createdAt'])
	sortBy: 'title' | 'price' | 'createdAt'

	@IsOptional()
	@IsEnum(['asc', 'desc'])
	sortOrder: 'asc' | 'desc'
}

export class FindAllResponse {
	@ValidateNested()
	products: ProductWithImages[]

	@IsNumber()
	count: number
}
