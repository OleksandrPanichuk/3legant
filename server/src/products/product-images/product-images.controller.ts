import { Roles } from '@/common/decorators'
import { TypeFile } from '@/shared/types'
import {
	Body,
	Controller,
	Delete,
	HttpCode,
	HttpStatus,
	Param,
	ParseFilePipeBuilder,
	Patch,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AddProductImageDto } from './dto'
import { ProductImagesService } from './product-images.service'

@Controller('products/:productId/images')
export class ProductImagesController {
	constructor(private readonly productImagesService: ProductImagesService) {}

	@Roles(['ADMIN', 'MANAGER'])
	@UseInterceptors(FileInterceptor('image'))
	@Post('')
	@HttpCode(HttpStatus.CREATED)
	addProductImage(
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
		@Body() dto: AddProductImageDto,
		@Param('productId') productId: string
	) {
		return this.productImagesService.addProductImage(productId, dto, file)
	}

	@Roles(['ADMIN', 'MANAGER'])
	@Patch('/:imageId/status')
	@HttpCode(HttpStatus.OK)
	updateImageStatus(
		@Param('imageId') imageId: string,
		@Param('productId') productId: string
	) {
		return this.productImagesService.updateStatus(productId, imageId)
	}

	@Roles(['ADMIN', 'MANAGER'])
	@Delete('/:imageId')
	@HttpCode(HttpStatus.NO_CONTENT)
	deleteImage(
		@Param('productId') productId: string,
		@Param('imageId') imageId: string
	) {
		return this.productImagesService.delete(productId, imageId)
	}
}
