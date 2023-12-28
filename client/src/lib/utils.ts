import { APP_URL } from '@/shared/constants'
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
	return clsx(inputs)
}

export function absolutePath(path: string) {
	return APP_URL + path
}
