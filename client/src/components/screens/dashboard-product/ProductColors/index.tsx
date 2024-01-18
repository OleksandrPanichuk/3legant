"use client"
import { useProductContext } from '@/components/screens/dashboard-product'

export const ProductColors = () => {
	const { product } = useProductContext()
	return <div>Colors</div>
}
