import { Roles } from '@/common/decorators'
import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	ParseFilePipeBuilder,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateInput } from './dto'
import { ProductsService } from './products.service'
import { TypeFile } from '@/shared/types'

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Roles(['ADMIN', 'MANAGER'])
	@UseInterceptors(FileInterceptor('previewImage'))
	@Post('')
	@HttpCode(HttpStatus.CREATED)
	create(
		@Body() dto: CreateInput,
		@UploadedFile(
			new ParseFilePipeBuilder()
				.addFileTypeValidator({
					fileType: /\/(jpg|jpeg|png|webp)$/,
				})
				.build({
					errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
				})
		)
		file: TypeFile
	) {
		return this.productsService.create(dto, file)
	}
}
