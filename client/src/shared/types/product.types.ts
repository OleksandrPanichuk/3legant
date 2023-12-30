export type ProductStatus = 'DRAFT' | 'VISIBLE' | 'HIDDEN'

export type TypeProduct = {
	id: string
	title: string
	description: string
	price: number
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
