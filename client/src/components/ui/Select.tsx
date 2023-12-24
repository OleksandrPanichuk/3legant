'use client'
import ReactSelect, { Props } from 'react-select'

export type TypeDefaultSelectOption = {
	label: string
	value: string
}

export function Select<T = TypeDefaultSelectOption>(props: Props<T>) {
	return <ReactSelect {...props}  />
}
