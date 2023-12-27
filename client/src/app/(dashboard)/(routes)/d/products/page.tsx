import { ProductsPage } from '@/components/screens/products'
import { absolutePath } from '@/lib'
import { Routes } from '@/shared/constants'
import { constructMetadata } from '@/shared/metadata'
import { Metadata } from 'next'

//TODO: metadata
export const metadata: Metadata = constructMetadata({
	title: 'Products',
	url: absolutePath(Routes.DASHBOARD_PRODUCTS),
	description: 'Manage all products on 3legant',
})

const Page = () => {
	return <ProductsPage />
}

export default Page
