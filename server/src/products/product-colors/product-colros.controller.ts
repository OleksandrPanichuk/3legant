import { Roles } from '@/common/decorators'
import { TypeFile } from '@/shared/types'
import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Param,
	ParseFilePipeBuilder,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateColorInput } from './dto'
import { ProductColorsService } from './product-colors.service'

@Controller('products/:productId/colors')
export class ProductColorsController {
	constructor(private readonly productColorsService: ProductColorsService) {}

	@Roles(['ADMIN', 'MANAGER'])
	@UseInterceptors(FileInterceptor('image'))
	@Post('')
	@HttpCode(HttpStatus.CREATED)
	createProductColor(
		@UploadedFile(
			new ParseFilePipeBuilder()
				.addFileTypeValidator({
					fileType: /\/(jpg|jpeg|png|webp)$/,
				})
				.build({
					errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
				})
		)
		file: TypeFile,
		@Body() dto: CreateColorInput,
		@Param('productId') productId: string
	) {
		return this.productColorsService.create(productId, dto, file)
	}
}
