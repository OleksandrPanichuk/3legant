'use client'
import { NumberInput } from '@/components/screens/create-product'

export const PriceInput = () => {
	const format = (val: string) => `$` + val
	const parse = (val: string) => val.replace(/^\$/, '')

	return <NumberInput name={'price'} format={format} parse={parse} label='Price' />
}
