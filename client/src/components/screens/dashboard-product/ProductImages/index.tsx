"use client"
import { useProductContext } from '@/components/screens/dashboard-product'

export const ProductImages = () => {
	const {product} = useProductContext()
	return <div>Images</div>
}
