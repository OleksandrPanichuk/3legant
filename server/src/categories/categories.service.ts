import { generateErrorResponse } from '@/common/helpers'
import { PrismaService } from '@/common/prisma'
import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { Category, ProductStatus } from '@prisma/client'
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
			const existingCategory = await this.prisma.category.findFirst({
				where: {
					name: {
						equals: categoryName,
						mode: 'insensitive',
					},
				},
			})

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

	public async delete(categoryId: string) {
		try {
			const categoryToDelete = await this.prisma.category.findUnique({
				where: {
					id: categoryId,
				},
			})

			if (!categoryToDelete) {
				throw new NotFoundException('Category not found')
			}

			const productsToUpdate = await this.prisma.product.findMany({
				where: {
					categories: {
						some: {
							id: categoryId,
						},
					},
				},
				select: {
					id: true,
					_count: {
						select: {
							categories: true,
						},
					},
				},
			})

			const filteredProducts = productsToUpdate
				.filter(product => product._count.categories === 1)
				.map(item => item?.id)

			await this.prisma.product.updateMany({
				where: {
					id: {
						in: filteredProducts,
					},
				},
				data: {
					status: ProductStatus.DRAFT,
				},
			})

			await this.prisma.category.delete({
				where: {
					id: categoryId,
				},
			})

			return `Category ${categoryToDelete.name} Deleted`
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}
}
