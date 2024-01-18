'use client'
import {
	NewProductImageModal,
	ProductImageSlide,
	useProductContext,
} from '@/components/screens/dashboard-product'
import { Button, Heading } from '@/components/ui'
import { Badge, Card, CardBody, CardHeader } from '@chakra-ui/react'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './ProductImages.module.scss'

import { cn } from '@/lib'
import 'swiper/scss'
import 'swiper/scss/navigation'

export const ProductImages = () => {
	const { product } = useProductContext()

	return (
		<Card backgroundColor={'white'}>
			<CardHeader className={styles.header}>
				<Heading className={styles.heading} as='h4' size={'sm'}>
					Product Images
				</Heading>
				<Badge>Total: {product.images.length}</Badge>

				<NewProductImageModal>
					<Button>Add image</Button>
				</NewProductImageModal>
			</CardHeader>
			<CardBody className={styles.body}>
				<Swiper
					navigation={{
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					}}
					spaceBetween={32}
					className={styles.wrapper}
					modules={[Navigation]}
				>
					{product.images.map(image => (
						<SwiperSlide key={image.id}>
							<ProductImageSlide image={image} />
						</SwiperSlide>
					))}

					<button className={cn('swiper-button-next', styles.next)} />
					<button className={cn('swiper-button-prev', styles.prev)} />
				</Swiper>
			</CardBody>
		</Card>
	)
}
