import { absolutePath } from '@/lib'
import { Routes } from '@/shared/constants'
import { constructMetadata } from '@/shared/metadata'
import { Metadata } from 'next'

import {
	ProductsFeed,
	ProductsFilters,
	ProductsPagination,
	ProductsProvider,
} from '@/components/screens/products'
import { Heading } from '@/components/ui'
import { Flex } from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import styles from './page.module.scss'

export const metadata: Metadata = constructMetadata({
	title: 'Products',
	url: absolutePath(Routes.DASHBOARD_PRODUCTS),
	description: 'Manage all products on 3legant',
})

const Page = () => {
	return (
		<>
			<div className={styles.top}>
				<Heading size='base'>Products</Heading>
				<Link className={styles['create-product']} href={Routes.CREATE_PRODUCT}>
					<Plus />
					Add
				</Link>
			</div>
			<ProductsProvider>
				<Flex flexDirection={'column'}>
					<ProductsFilters />
					<ProductsFeed />
					<ProductsPagination />
				</Flex>
			</ProductsProvider>
		</>
	)
}

export default Page
