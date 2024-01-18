import { generateErrorResponse } from '@/common/helpers'
import { PrismaService } from '@/common/prisma'
import { StorageService } from '@/common/storage'
import { TypeFile } from '@/shared/types'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import {
	BadRequestException,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { ProductImage } from '@prisma/client'
import { Cache } from 'cache-manager'
import { AddProductImageDto } from './dto'

@Injectable()
export class ProductImagesService {
	constructor(
		private prisma: PrismaService,
		private storage: StorageService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache
	) {}

	public async addProductImage(
		productId: string,
		dto: AddProductImageDto,
		file: TypeFile
	): Promise<ProductImage> {
		try {
			const product = await this.prisma.product.findUnique({
				where: {
					id: productId,
				},
			})

			if (!product) throw new NotFoundException('Product not found')

			const image = await this.storage.upload(file)

			if (dto.isPreview) {
				await this.prisma.productImage.updateMany({
					where: dto,
					data: {
						isPreview: false,
					},
				})
			}

			const productImage = await this.prisma.productImage.create({
				data: {
					...image,
					...dto,
					productId,
				},
			})

			await this.cacheManager.del(`product:${productId}`)

			return productImage
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async updateStatus(
		productId: string,
		imageId: string
	): Promise<ProductImage> {
		try {
			const image = await this.prisma.productImage.findUnique({
				where: {
					productId,
					id: imageId,
				},
			})

			if (!image) throw new NotFoundException('Image to update not found')

			if (image.isPreview)
				throw new BadRequestException(
					"You can't change the status of preview image"
				)

			await this.prisma.productImage.updateMany({
				where: {
					productId,
					isPreview: true,
				},
				data: {
					isPreview: false,
				},
			})

			await this.cacheManager.del(`product:${productId}`)

			return await this.prisma.productImage.update({
				where: {
					id: imageId,
					productId,
				},
				data: {
					isPreview: true,
				},
			})
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async delete(productId: string, imageId: string) {
		try {
			const image = await this.prisma.productImage.findUnique({
				where: {
					productId,
					id: imageId,
				},
			})

			if (!image) throw new NotFoundException('Image to update not found')

			if (image.isPreview)
				throw new BadRequestException("You can't delete preview image")

			await this.prisma.productImage.delete({
				where: {
					productId,
					id: imageId,
				},
			})

			await this.storage.delete(image.key)

			await this.cacheManager.del(`product:${productId}`)

			return 'Deleted'
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}
}
