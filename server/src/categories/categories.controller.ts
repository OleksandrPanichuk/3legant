import { Roles } from '@/common/decorators'
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common'
import { Category } from '@prisma/client'
import { CategoriesService } from './categories.service'
import { FindAllInput, FindAllResponse } from './dto'

@Controller('categories')
export class CategoriesController {
	constructor(private categoriesService: CategoriesService) {}

	@Get('')
	@HttpCode(HttpStatus.OK)
	findAll(@Query('') dto: FindAllInput): Promise<FindAllResponse> {
		return this.categoriesService.findAll(dto)
	}

	@Roles(['MANAGER', 'ADMIN'])
	@Post('')
	@HttpCode(HttpStatus.CREATED)
	create(@Body('name') categoryName: string): Promise<Category> {
		return this.categoriesService.create(categoryName)
	}

	@Roles(['MANAGER', 'ADMIN'])
	@Put(':id')
	@HttpCode(HttpStatus.OK)
	update(@Param('id') categoryId:string, @Body('name') newName:string) {
		return this.categoriesService.update(categoryId, newName)
	}


	@Roles(['MANAGER','ADMIN'])
	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	delete(@Param('id') categoryId:string) {
		return this.categoriesService.delete(categoryId)
	}
}
