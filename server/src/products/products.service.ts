import { generateErrorResponse } from '@/common/helpers'
import { PrismaService } from '@/common/prisma'
import { StorageService } from '@/common/storage/storage.service'
import { TypeFile } from '@/shared/types'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, Product } from '@prisma/client'
import { Cache } from 'cache-manager'
import {
	CreateInput,
	FindAllInput,
	FindAllResponse,
	FindByIdResponse,
	UpdateInput,
} from './dto'

@Injectable()
export class ProductsService {
	constructor(
		private prisma: PrismaService,
		private storage: StorageService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache
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
				status: onlyVisible ? 'VISIBLE' : dto.status,
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

	public async findById(id: string): Promise<FindByIdResponse> {
		try {
			const cachedProduct: FindByIdResponse | undefined =
				await this.cacheManager.get(`product:${id}`)

			if (cachedProduct) {
				return cachedProduct
			}

			const product = await this.prisma.product.findUnique({
				where: {
					id,
				},
				include: {
					categories: {
						select: {
							id: true,
							name: true,
						},
					},
					colors: {
						select: {
							id: true,
							name: true,
							image: {
								select: {
									key: true,
									url: true,
								},
							},
						},
					},
					images: {
						select: {
							id: true,
							isPreview: true,
							key: true,
							url: true,
						},
					},
					info: true,
				},
			})

			if (!product) throw new NotFoundException('Product not found')

			await this.cacheManager.set(`product:${id}`, product)

			return product
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async create(dto: CreateInput, file: TypeFile): Promise<Product> {
		const image = await this.storage.upload(file)
		try {
			return await this.prisma.product.create({
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
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async update({ categories, ...dto }: UpdateInput, productId: string) {
		try {
			const product = await this.prisma.product.findUnique({
				where: {
					id: productId,
				},
				include: {
					categories: true,
				},
			})

			if (!product) throw new NotFoundException('Product not found')

			await this.cacheManager.del(`product:${productId}`)
			return await this.prisma.product.update({
				where: {
					id: productId,
				},
				data: {
					...dto,
					...(categories?.length && {
						categories: {
							disconnect: product.categories,
							connect: categories.map(id => ({ id })),
						},
					}),
				},
			})
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}
}
