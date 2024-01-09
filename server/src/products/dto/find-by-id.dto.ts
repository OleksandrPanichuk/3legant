import { Category, Product, ProductColor, ProductColorImage, ProductImage, ProductInfo } from '@prisma/client'

export type FindByIdResponse = Product & {
	info: ProductInfo
	categories: Category[]
	images: (Omit<ProductImage, 'productId'>)[]
	colors: (Omit<ProductColor, 'productId'> & {
		image:Pick<ProductColorImage, 'url' | 'key'>
	})[]
}
