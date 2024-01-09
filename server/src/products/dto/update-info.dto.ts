import {
	IsInt,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	MinLength,
} from 'class-validator'

export class UpdateInfoInput {
	@IsOptional()
	@IsString()
	@MinLength(200, {
		message: 'Detailed info is too short (min length 200 characters)',
	})
	details?: string

	@IsOptional()
	@IsString()
	@MinLength(1, { message: 'Height is required' })
	height?: string

	@IsOptional()
	@IsString()
	@MinLength(1, { message: 'Length is required' })
	length?: string

	@IsOptional()
	@IsNumber()
	@IsInt()
	@IsPositive()
	packages?: number

	@IsOptional()
	@IsString()
	@MinLength(1, { message: 'Weight is required' })
	weight?: string

	@IsOptional()
	@IsString()
	@MinLength(1, { message: 'Width is required' })
	width?: string
}
