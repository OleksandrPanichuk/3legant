'use client'
import { NumberInput } from '@/components/screens/create-product'

export const LengthInput = () => {
	const format = (val: string) => val + 'cm'
	const parse = (val: string) => val.replace(/cm$/, '')
	return <NumberInput format={format} parse={parse} name={'height'} label={'Length'} />
}
