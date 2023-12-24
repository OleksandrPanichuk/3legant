import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { Roles } from '@/common';
import { CategoriesService } from './categories.service';
import { FindAllInput } from './dto';

@Controller('categories')
export class CategoriesController {

    constructor(private categoriesService: CategoriesService) {}


    @Get('')
    @HttpCode(HttpStatus.OK)
    findAll(@Query('') dto: FindAllInput) {
        return this.categoriesService.findAll(dto)
    }


    @Roles(['MANAGER','ADMIN'])
    @Post('')
    @HttpCode(HttpStatus.CREATED)
    create(@Body("name") categoryName:string) {
        return this.categoriesService.create(categoryName)
    }
}
