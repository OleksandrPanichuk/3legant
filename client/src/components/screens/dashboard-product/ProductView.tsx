import {
	ProductAdditionalInfo,
	ProductColors,
	ProductImages,
	ProductMainInfo,
	ProductProvider,
} from '@/components/screens/dashboard-product'
import { Heading } from '@/components/ui'
import { getProductById } from '@/data'
import { Flex } from '@chakra-ui/react'
import { notFound } from 'next/navigation'

interface IProductViewProps {
	productId: string
}

export const ProductView = async ({ productId }: IProductViewProps) => {
	const product = await getProductById(productId)

	if (!product) return notFound()

	return (
		<ProductProvider product={product}>
			<Flex as={'section'} flexDirection={'column'} gap={'1rem'}>
				<Heading size={'base'} as='h3'>
					{product.title}
				</Heading>
				<ProductMainInfo />
				<ProductAdditionalInfo />
				<ProductImages />
				<ProductColors />
			</Flex>
		</ProductProvider>
	)
}

ProductView.Skeleton = function ProductViewSkeleton() {
	return <>Loading....</>
}
