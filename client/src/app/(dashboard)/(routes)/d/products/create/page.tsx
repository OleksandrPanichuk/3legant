//TODO: metadata

import { CreateProductForm } from '@/components/screens/create-product'
import { Heading } from '@/components/ui'
import { Flex } from '@chakra-ui/react'
import styles from './page.module.scss'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Routes } from '@/shared/constants'

const Page = () => {
	return (
		<>
			<Flex className={styles.top}>
				<Heading size={'base'}>
					Add new product
				</Heading>
				<Link className={styles.back} href={Routes.DASHBOARD_PRODUCTS}>
					<ChevronLeft />
					Back to Products
				</Link>
			</Flex>
			<CreateProductForm />
		</>
	)
}

export default Page
