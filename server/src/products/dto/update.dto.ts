import {
	IsArray,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	Min,
	MinLength,
} from 'class-validator'

export class UpdateInput {
	@IsOptional()
	@IsString()
	@MinLength(1, { message: 'Product name is too short' })
	title?: string

	@IsOptional()
	@IsString()
	@MinLength(200, {
		message: 'Description is too short (min length 200 characters)',
	})
	description?: string

	@IsOptional()
	@IsPositive({ message: 'Price cannot be negative' })
	@IsNumber()
	@Min(5, { message: 'The minimum price is $5' })
	price?: number

	@IsOptional()
	@MinLength(1)
	@IsString()
	measurements?: string

	@IsOptional()
	@IsArray()
	categories?: string[]
}
