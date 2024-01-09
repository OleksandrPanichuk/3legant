'use client'
import { TypeFullProduct } from '@/shared/types'
import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from 'react'

interface IProductContext {
	product: TypeFullProduct
	setProduct: Dispatch<SetStateAction<TypeFullProduct>>
}

interface IProductProvider {
	product: TypeFullProduct
}

export const ProductContext = createContext<IProductContext>(
	{} as IProductContext
)

export const ProductProvider = ({
	product: initialProduct,
	children,
}: PropsWithChildren<IProductProvider>) => {
	const [product, setProduct] = useState<TypeFullProduct>(initialProduct)
	return (
		<ProductContext.Provider value={{ product, setProduct }}>
			{children}
		</ProductContext.Provider>
	)
}

export const useProductContext = () => useContext(ProductContext)
