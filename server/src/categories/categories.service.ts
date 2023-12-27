import { generateErrorResponse } from '@/common/helpers'
import { PrismaService } from '@/common/prisma'
import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { Category } from '@prisma/client'
import { FindAllInput, FindAllResponse } from './dto'

@Injectable()
export class CategoriesService {
	constructor(private prisma: PrismaService) {}

	public async findAll(dto: FindAllInput): Promise<FindAllResponse> {
		const categories = await this.prisma.category.findMany({
			where: {
				name: {
					contains: dto.searchValue,
					mode: 'insensitive',
				},
			},
			take: dto.take,
			skip: dto.skip,
		})

		const count = await this.prisma.category.count({
			where: {
				name: {
					contains: dto.searchValue,
					mode: 'insensitive',
				},
			},
		})

		return { categories, count }
	}

	public async create(categoryName: string): Promise<Category> {
		try {
			console.log(categoryName)
			const existingCategory = await this.prisma.category.findFirst({
				where: {
					name: {
						equals: categoryName,
						mode: 'insensitive',

					},
				},
			})

			console.log(existingCategory)
			if (existingCategory) {
				throw new ConflictException('Category with the same name already exist')
			}

			return await this.prisma.category.create({
				data: {
					name: categoryName,
				},
			})
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}
	public async update(id: string, newName: string): Promise<Category> {
		try {
			const category = await this.prisma.category.findUnique({
				where: {
					id,
				},
			})

			if (!category) throw new NotFoundException('Category not found')

			return await this.prisma.category.update({
				where: { id },
				data: {
					name: newName,
				},
			})
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}
}
