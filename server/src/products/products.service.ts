import { generateErrorResponse } from '@/common/helpers'
import { PrismaService } from '@/common/prisma'
import { StorageService } from '@/common/storage/storage.service'
import { TypeFile } from '@/shared/types'
import { Injectable } from '@nestjs/common'
import { Product } from '@prisma/client'
import { CreateInput } from './dto'

@Injectable()
export class ProductsService {
	constructor(
		private prisma: PrismaService,
		private storage: StorageService
	) {}

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
