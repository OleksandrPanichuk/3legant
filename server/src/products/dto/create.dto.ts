import { Transform } from 'class-transformer'
import {
	IsArray,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	Min,
	MinLength,
} from 'class-validator'

export class CreateInput {
	@IsString()
	@IsNotEmpty()
	@MinLength(1, { message: 'Product name is too short' })
	title: string

	@IsString()
	@MinLength(200, {
		message: 'Description is too short (min length 200 characters)',
	})
	description: string

	@IsString()
	@MinLength(200, {
		message: 'Detailed info is too short (min length 200 characters)',
	})
	details: string

	@Transform(params => Number(params.value))
	@IsPositive({ message: 'Price cannot be negative' })
	@IsNumber()
	@Min(5, { message: 'The minimum price is $5' })
	price: number

	@IsNotEmpty()
	@MinLength(1)
	@IsString()
	measurements: string

	@IsString()
	@MinLength(1, { message: 'Width is required' })
	@IsNotEmpty()
	width: string

	@IsString()
	@MinLength(1, { message: 'Height is required' })
	@IsNotEmpty()
	height: string

	@IsString()
	@MinLength(1, { message: 'Length is required' })
	@IsNotEmpty()
	length: string

	@IsString()
	@MinLength(1, { message: 'Weight is required' })
	@IsNotEmpty()
	weight: string

	@Transform(params => Number(params.value))
	@IsNumber()
	@IsInt()
	@IsPositive()
	packages: number

	@Transform(params => JSON.parse(params.value))
	@IsArray()
	categories: string[]
}
