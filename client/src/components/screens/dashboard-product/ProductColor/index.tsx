import { Typography } from '@/components/ui'
import { TypeProductColor, TypeProductColorImage } from '@/shared/types'
import { Card, CardBody, CardFooter } from '@chakra-ui/react'
import Image from 'next/image'
import { ProductColorModal } from '@/components/screens/dashboard-product'
import styles from './ProductColor.module.scss'

interface IProductColorProps {
	color: Omit<TypeProductColor, 'productId'> & {
		image: Pick<TypeProductColorImage, 'url' | 'key'>
	}
}

export const ProductColor = ({ color }: IProductColorProps) => {
	return (
		<ProductColorModal color={color}>
			<Card backgroundColor={'white'} className={styles.wrapper}>
				<CardBody className={styles.body}>
					<Image
						className={styles.image}
						fill
						src={color.image.url}
						alt={`Product image of ${color.name} color`}
					/>
				</CardBody>
				<CardFooter className={styles.footer}>
					<Typography>
						Color: <span className={styles['color-name']}>{color.name}</span>
					</Typography>
				</CardFooter>
			</Card>
		</ProductColorModal>
	)
}
