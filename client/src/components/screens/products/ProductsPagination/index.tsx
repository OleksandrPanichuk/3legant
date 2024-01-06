'use client'

import { useProductsContext } from '@/components/screens/products'
import { Button } from '@/components/ui'
import { Flex } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './ProductsPagination.module.scss'

export const ProductsPagination = () => {
	const { fetchNextPage, fetchPrevPage, maxPages, page, canFetchMore, data } =
		useProductsContext()
	if (!data?.count) return null
	return (
		<Flex className={styles.wrapper}>
			<div className={styles.count}>
				{page + 1}/{maxPages}
			</div>

			<Flex className={styles.buttons}>
				<Button
					variant={'ghost'}
					onClick={fetchPrevPage}
					className={styles.button}
					disabled={page === 0}
					aria-disabled={page === 0}
				>
					<ChevronLeft />
					Prev
				</Button>
				<Button
					variant={'ghost'}
					onClick={fetchNextPage}
					className={styles.button}
					disabled={canFetchMore === 'cannot-fetch-more'}
					aria-disabled={canFetchMore === 'cannot-fetch-more'}
				>
					Next
					<ChevronRight />
				</Button>
			</Flex>
		</Flex>
	)
}
