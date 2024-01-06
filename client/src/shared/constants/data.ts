import { ProductStatus, TypeSortOrder } from '@/shared/types'

export const UserRoles = ['ADMIN', 'CUSTOMER', 'MANAGER'] as const
export const ProductStatuses = ['DRAFT', 'HIDDEN', 'VISIBLE'] as const

export const productStatusMap  = {
	DRAFT: {
		text: 'In Draft',
		colorScheme: 'gray',
	},
	HIDDEN: {
		text: 'Hidden',
		colorScheme: 'purple',
	},
	VISIBLE: {
		text: 'Visible',
		colorScheme: 'green',
	},
} satisfies Record<ProductStatus, { colorScheme: string; text: string }>

export const sortOrders: TypeSortOrder[] = ['asc', 'desc']