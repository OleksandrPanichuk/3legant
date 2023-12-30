import { APP_URL } from '@/shared/constants'
import { clsx, type ClassValue } from 'clsx'
import {format} from 'date-fns'

export function cn(...inputs: ClassValue[]) {
	return clsx(inputs)
}

export function absolutePath(path: string) {
	return APP_URL + path
}

export function getCurrency(value: number) {
	const dollar = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	})

	return dollar.format(value)
}

export function toDateString(date: Date): string {
	const dateObject = new Date(date)
	return dateObject.toDateString()
}


export function formatDate(date:Date): string {
	return format(date,'MMM d, y')
}