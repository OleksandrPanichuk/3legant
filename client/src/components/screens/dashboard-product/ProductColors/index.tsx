'use client'
import {
	NewProductColorModal,
	ProductColor,
	useProductContext,
} from '@/components/screens/dashboard-product'
import { Button, Heading } from '@/components/ui'
import { Card, CardBody, CardHeader } from '@chakra-ui/react'
import styles from './ProductColors.module.scss'

export const ProductColors = () => {
	const { product } = useProductContext()
	return (
		<Card backgroundColor={'white'}>
			<CardHeader className={styles.header}>
				<Heading className={styles.heading} as='h4' size={'sm'}>
					Product Colors
				</Heading>
				<NewProductColorModal>
					<Button>Add Color</Button>
				</NewProductColorModal>
			</CardHeader>
			<CardBody>
				{product.colors.length ? (
					<ul className={styles.grid}>
						{product.colors.map(color => (
							<li key={color.id}>
								<ProductColor color={color} />
							</li>
						))}
					</ul>
				) : (
					<p>No Product Colors Added</p>
				)}
			</CardBody>
		</Card>
	)
}
