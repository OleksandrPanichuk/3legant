import { generateErrorResponse } from '@/common/helpers'
import { PrismaService } from '@/common/prisma'
import { StorageService } from '@/common/storage'
import { TypeFile } from '@/shared/types'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { CreateColorInput, CreateColorResponse } from './dto'

@Injectable()
export class ProductColorsService {
	constructor(
		private prisma: PrismaService,
		private readonly storage: StorageService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache
	) {}

	public async create(
		productId: string,
		dto: CreateColorInput,
		file: TypeFile
	): Promise<CreateColorResponse> {
		try {
			const product = await this.prisma.product.findUnique({
				where: {
					id: productId,
				},
			})

			if (!product) throw new NotFoundException('Product not found')

			const existingColor = await this.prisma.productColor.findFirst({
				where: {
					productId,
					name: {
						equals: dto.name,
						mode:'insensitive'
					}
				}
			})

			if(existingColor) throw new ConflictException('Color with same name already exist')

			const image = await this.storage.upload(file)

			await this.cacheManager.del(`product:${productId}`)

			return await this.prisma.productColor.create({
				data: {
					...dto,
					productId,
					image: {
						create: image,
					},
				},
				include: {
					image: true,
				},
			})
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}
}
