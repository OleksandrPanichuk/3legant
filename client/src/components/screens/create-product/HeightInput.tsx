'use client'
import { NumberInput } from '@/components/screens/create-product'
export const HeightInput = () => {
	const format = (val: string) => val + 'cm'
	const parse = (val: string) => val.replace(/cm$/, '')

	return <NumberInput name={'height'} parse={parse} format={format} label='Height' />
}
