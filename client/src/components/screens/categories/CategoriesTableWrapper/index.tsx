'use client'
import { CategoriesTable } from '@/components/screens/categories'
import { Button } from '@/components/ui'
import { useDebounce } from '@/hooks'
import { useCategories } from '@/services'
import { useDashboardStore } from '@/store'
import { Flex, Input } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import styles from './CategoriesTableWrapper.module.scss'

export const CategoriesTableWrapper = () => {
	const [searchValue, setSearchValue] = useState<string>('')
	const debouncedSearchValue = useDebounce(searchValue)

	const setRefetchCategories = useDashboardStore(
		state => state.setRefetchCategories
	)
	const {
		data,
		canFetchMore,
		page,
		fetchNextPage,
		maxPages,
		fetchPrevPage,
		take,
		refetch,
	} = useCategories(debouncedSearchValue)

	useEffect(() => {
		setRefetchCategories(refetch)
	}, [refetch, setRefetchCategories])

	//TODO: Add something, when there is no data
	if (!data) return null

	return (
		<>
			<Flex className={styles.content}>
				<Input
					className={styles.input}
					placeholder='Search categories'
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
				/>
				<Flex gap={'0.5rem'}>
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
			<CategoriesTable take={take} page={page} data={data.categories} />
			<Flex className={styles.count__wrapper}>
				<div className={styles.count}>
					{page + 1}/{maxPages}
				</div>
			</Flex>
		</>
	)
}
