import { TypeProductPrice } from '@/services'

type TypePrice = {
	label: string
	value: TypeProductPrice | undefined
	id: number
}
export const prices = [
	{
		label: 'All Price',
		value: undefined,
		id: 1,
	},
	{
		label: '$0.00 - 99.99',
		value: {
			start: 0,
			end: 99.99,
		},
		id: 2,
	},
	{
		label: '$100.00 - 199.99',
		value: {
			start: 100,
			end: 199.99,
		},
		id: 3,
	},
	{
		label: '$200.00 - 299.99',
		value: {
			start: 200,
			end: 299.99,
		},
		id: 4,
	},
	{
		label: '$300.00 - 399.99',
		value: {
			start: 300,
			end: 399.99,
		},
		id: 5,
	},

	{
		label: '$400.00+',
		value: {
			start: 400,
		},
		id: 6,
	},
] satisfies TypePrice[]
