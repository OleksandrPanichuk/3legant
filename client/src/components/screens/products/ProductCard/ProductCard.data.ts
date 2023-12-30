import { ProductStatus } from "@/shared/types"

export const productStatus: Record<
ProductStatus,
{ colorScheme: string; text: string }
> = {
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
}