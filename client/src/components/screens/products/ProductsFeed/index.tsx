'use client'

import { ProductCard, useProductsContext } from '@/components/screens/products'
import { Grid } from '@chakra-ui/layout'
import styles from './ProductsFeed.module.scss'

export const ProductsFeed = () => {
	const { data, isFetching, take } = useProductsContext()
	return (
		<Grid   className={styles.wrapper}>
			{!!data?.products.length &&
				!isFetching &&
				data?.products.map(product => (
				
					<ProductCard key={product.id} product={product} />
				
				))}

			{isFetching &&
				Array(take)
					.fill(0)
					.map((_, index) => (
					
						<ProductCard.Skeleton key={index} />
						
					))}
		</Grid>
	)
}
