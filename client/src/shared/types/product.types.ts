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
