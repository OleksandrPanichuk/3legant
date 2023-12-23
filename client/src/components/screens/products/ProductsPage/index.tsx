import { Heading } from '@/components/ui'
import styles from './ProductsPage.module.scss'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Routes } from '@/shared/constants'

export const ProductsPage = () => {
	return (
		<>
			<div className={styles.top}>
				<Heading variant="h6">Products</Heading>
				<Link className={styles['create-product']} href={Routes.CREATE_PRODUCT} >
					<Plus />
					Add
				</Link>
			</div>
		</>
	)
}
