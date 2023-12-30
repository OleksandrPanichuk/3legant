'use client'

import { ProductCard, useProductsContext } from '@/components/screens/products'
import { Grid } from '@chakra-ui/layout'

export const ProductsFeed = () => {
	const { data, isFetching } = useProductsContext()
	return (
		<Grid gridTemplateColumns={'repeat(2, 1fr)'} columnGap={'1rem'}>
			{!!data?.products.length &&
				!isFetching &&
				data?.products.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			{isFetching &&
				Array(10).map((_, index) => <ProductCard.Skeleton key={index} />)}
		</Grid>
	)
}
