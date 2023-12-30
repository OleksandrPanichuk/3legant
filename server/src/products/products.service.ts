import { generateErrorResponse } from '@/common/helpers'
import { PrismaService } from '@/common/prisma'
import { StorageService } from '@/common/storage/storage.service'
import { TypeFile } from '@/shared/types'
import { Injectable } from '@nestjs/common'
import { Prisma, Product } from '@prisma/client'
import { CreateInput, FindAllInput, FindAllResponse } from './dto'

@Injectable()
export class ProductsService {
	constructor(
		private prisma: PrismaService,
		private storage: StorageService
	) {}

	public async findAll(
		dto: FindAllInput,
		onlyVisible: boolean
	): Promise<FindAllResponse> {
		try {
			const whereCondition: Prisma.ProductWhereInput = {
				...(!!dto.searchValue && {
					title: {
						contains: dto.searchValue,
						mode: 'insensitive',
					},
				}),
				status: onlyVisible ? 'VISIBLE' : undefined,
				...(!!dto.category && {
					categories: {
						some: {
							name: dto.category,
						},
					},
				}),
				...(!!dto.prices?.length && {
					OR: dto.prices.map(price => ({
						price: {
							lte: price.end,
							gte: price.start,
						},
					})),
				}),
			}

			const products = await this.prisma.product.findMany({
				where: whereCondition,
				take: dto.take,
				skip: dto.skip,
				include: {
					images: {
						where: {
							isPreview: true,
						},
					},
				},
				...(!!dto.sortBy && {
					orderBy: {
						[dto.sortBy]: dto.sortOrder ?? 'asc',
					},
				}),
			})

			const count = await this.prisma.product.count({
				where: whereCondition,
			})

			return { count, products }
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async create(dto: CreateInput, file: TypeFile): Promise<Product> {
		const image = await this.storage.upload(file)
		try {
			const product = await this.prisma.product.create({
				data: {
					title: dto.title,
					description: dto.description,
					measurements: dto.measurements,
					price: dto.price,
					categories: {
						connect: dto.categories.map(categoryId => ({ id: categoryId })),
					},
					images: {
						create: {
							...image,
							isPreview: true,
						},
					},
					info: {
						create: {
							details: dto.details,
							height: dto.height,
							length: dto.length,
							packages: dto.packages,
							weight: dto.weight,
							width: dto.weight,
						},
					},
				},
			})

			return product
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}
}
