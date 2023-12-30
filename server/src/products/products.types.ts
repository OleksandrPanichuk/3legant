import { Product, ProductImage, ProductInfo } from '@prisma/client'

export type ProductWithInfo = Product & {
	info: Omit<ProductInfo, 'productId' | 'id'>
}


export type ProductWithImages = Product & {
	images: ProductImage[]
}

