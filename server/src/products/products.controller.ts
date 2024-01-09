import { Roles } from '@/common/decorators'
import { TypeFile } from '@/shared/types'
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseFilePipeBuilder,
	Patch,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
	CreateInput,
	FindAllInput,
	FindAllResponse,
	FindByIdResponse,
	UpdateInfoInput,
	UpdateInput,
} from './dto'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Get('')
	@HttpCode(HttpStatus.OK)
	findAll(@Query('') dto: FindAllInput): Promise<FindAllResponse> {
		return this.productsService.findAll(dto, false)
	}

	@Roles(['ADMIN', 'MANAGER'])
	@Get('/admin')
	findAllForDashboard(@Query('') dto: FindAllInput): Promise<FindAllResponse> {
		return this.productsService.findAll(dto, false)
	}

	@Get('/:productId')
	findById(@Param('productId') productId: string): Promise<FindByIdResponse> {
		return this.productsService.findById(productId)
	}

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



	@Roles(['ADMIN','MANAGER'])
	@Patch(':productId')
	@HttpCode(HttpStatus.OK)
	update(@Param('productId') productId:string, @Body() dto: UpdateInput) {
		return this.productsService.update(dto, productId)
	}


	@Roles(['ADMIN','MANAGER'])
	@Patch(':productId/info')
	@HttpCode(HttpStatus.OK)
	updateInfo(@Param('productId') productId:string, @Body() dto:UpdateInfoInput) {
		return this.productsService.updateInfo(dto,productId)
	}
}
