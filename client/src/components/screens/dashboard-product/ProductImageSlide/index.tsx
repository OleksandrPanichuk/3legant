"use client"
import { useProductContext } from '@/components/screens/dashboard-product'
import { TypeProductImage } from '@/shared/types'
import { useConfirmModal } from '@/store'
import { Badge, Flex, Tooltip } from '@chakra-ui/react'
import { Edit2, Trash } from 'lucide-react'
import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'
import {
	useDeleteProductImage,
	useUpdateProductImageStatus,
} from './ProductImageSlide.hooks'
import styles from './ProductImageSlide.module.scss'


interface IProductImageSlideProps {
	image: Omit<TypeProductImage, 'productId'>
}

export const ProductImageSlide = ({ image }: IProductImageSlideProps) => {
	const onConfirmOpen = useConfirmModal(state => state.onOpen)
	const {
		product: { id: productId },
	} = useProductContext()

	const { mutate: deleteImage, isPending: isDeleting } = useDeleteProductImage()
	const { mutate: updateStatus, isPending: isUpdating } =
		useUpdateProductImageStatus()

	return (
		
			<div className={styles.inner}>
				<Image
					src={image.url}
					alt='Product Image'
					fill
					className={styles.image}
				/>
				<Flex className={styles.toolbar}>
					{image.isPreview && <Badge colorScheme='blue'>Preview</Badge>}

					{!image.isPreview && (
						<Tooltip label='Make preview'>
							<button
								onClick={() => updateStatus({ imageId: image.id, productId })}
								disabled={isDeleting || isUpdating}
								aria-label={'change status'}
							>
								<Edit2 />
							</button>
						</Tooltip>
					)}

					{image.isPreview ? (
						<Tooltip
							label={"This is a preview image. You can't delete it."}
							placement='top'
						>
							<button
								aria-label={'delete product image'}
								className={styles.delete}
								disabled
							>
								<Trash />
							</button>
						</Tooltip>
					) : (
						<button
							onClick={() =>
								onConfirmOpen({
									onConfirm: () =>
										deleteImage({ imageId: image.id, productId }),
									isLoading: isDeleting,
								})
							}
							aria-label={'delete product image'}
							className={styles.delete}
							disabled={isDeleting || isUpdating}
						>
							<Trash />
						</button>
					)}
				</Flex>
			</div>
		
	)
}
