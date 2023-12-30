import { ProductActions } from '@/components/screens/products'
import { Heading, Typography } from '@/components/ui'
import { cn, formatDate, getCurrency, toDateString } from '@/lib'
import { TypeProductWithImages } from '@/shared/types'
import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/card'
import { Badge, Flex } from '@chakra-ui/layout'
import { Dot } from 'lucide-react'
import Image from 'next/image'
import { MemoExoticComponent, memo } from 'react'
import { productStatus } from './ProductCard.data'

import styles from './ProductCard.module.scss'

interface IProductCardProps {
	product: TypeProductWithImages
}

interface IProductCard
	extends MemoExoticComponent<(props: IProductCardProps) => React.JSX.Element> {
	Skeleton: () => React.JSX.Element
}

//@ts-ignore
export const ProductCard: IProductCard = memo(
	({ product }: IProductCardProps) => {
		return (
			<Card className={styles.card} as={'article'}>
				<div className={styles.image}>
					<div className={styles.image__wrapper}>
						<Image
							src={
								product.images.find(image => image.isPreview)?.url ??
								'https://res.cloudinary.com/dcrl1muoz/image/upload/v1703586518/3legant/Breadit.1703586519690_cfg45j.png'
							}
							alt={'product preview image'}
							fill
						/>
					</div>
				</div>
				<Flex className={styles.content}>
					<CardHeader className={styles.header}>
						<Heading size={'sm'} as='h5'>
							{product.title}
						</Heading>
						<ProductActions product={product} />
					</CardHeader>
					<CardBody className={styles.body}>
						<Typography className={styles.price} size={'base'}>
							{getCurrency(product.price)}
						</Typography>
						<Typography className={styles.description} size={'sm'}>
							{product.description}
						</Typography>
						<Typography>Measurements: {product.measurements}</Typography>
					</CardBody>
					<CardFooter className={styles.footer}>
						<time
							className={cn('text-sm', styles.time)}
							dateTime={toDateString(product.createdAt)}
						>
							{formatDate(product.createdAt)}
						</time>
						<Dot />
						<Badge colorScheme={productStatus[product.status].colorScheme}>
							{productStatus[product.status].text}
						</Badge>
					</CardFooter>
				</Flex>
			</Card>
		)
	}
)

ProductCard.Skeleton = function Skeleton() {
	return <></>
}

ProductCard.displayName = 'ProductCard'
