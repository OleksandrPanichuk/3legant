import { ProductColor, ProductColorImage } from '@prisma/client'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateColorInput {
	@IsString()
	@IsNotEmpty()
	@MinLength(3, { message: 'Color name is too short' })
	name: string
}

export type CreateColorResponse = ProductColor & {
	image: ProductColorImage
}
