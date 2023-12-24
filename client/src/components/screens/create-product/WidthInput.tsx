'use client'
import { NumberInput } from '@/components/screens/create-product'
export const WidthInput = () => {
	const format = (val: string) => 'cm' + val 
	const parse = (val: string) => val.replace(/^cm/, '')

	return (
		<NumberInput name={'width'} parse={parse} format={format} label={'Width'} />
	)
}
