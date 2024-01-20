import { TypeCategory } from '@/shared/types'

export type ProductStatus = 'DRAFT' | 'VISIBLE' | 'HIDDEN'

export type TypeProduct = {
	id: string
	title: string
	description: string
	price: string
	measurements: string
	status: ProductStatus
	createdAt: Date
}

export type TypeProductImage = {
	id: string
	url: string
	key: string
	isPreview: boolean
	productId: string
}

export type TypeProductInfo = {
	id: string
	productId: string
	details: string
	width: string
	height: string
	length: string
	weight: string
	packages: number
}

export type TypeProductWithImages = TypeProduct & {
	images: TypeProductImage[]
}

export type TypeProductWithInfo = TypeProduct & {
	info: Omit<TypeProductInfo, 'id' | 'productId'>
}

export type TypeProductColor = {
	id: string
	name: string
	productId: string
}

export type TypeProductColorImage = {
	id: string
	url: string
	key: string
	colorId: string
}

export type TypeFullProductColor = TypeProductColor & {
	image: TypeProductColorImage
}

export type TypeFullProduct = TypeProduct & {
	info: TypeProductInfo
	categories: TypeCategory[]
	images: Omit<TypeProductImage, 'productId'>[]
	colors: (Omit<TypeProductColor, 'productId'> & {
		image: Pick<TypeProductColorImage, 'url' | 'key'>
	})[]
}
