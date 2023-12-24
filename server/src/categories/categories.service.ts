import { PrismaService } from '@/common';
import { Injectable } from '@nestjs/common';
import { FindAllInput, FindAllResponse } from './dto';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) {}


    public async findAll(dto: FindAllInput): Promise<FindAllResponse> {
       const categories = await this.prisma.category.findMany({
            where: {
                name: {
                    contains:dto.searchValue,
                    mode:'insensitive'
                }
            },
            take: dto.take,
            skip: dto.skip
        })

        const count = await this.prisma.category.count({
            where: {
                name: {
                    contains:dto.searchValue,
                    mode:'insensitive'
                }  
            }
        })


        return {categories, count}
    }

    public async create(categoryName:string) {
        return await this.prisma.category.create({
            data :{
                name: categoryName
            }
        })
    }
}
