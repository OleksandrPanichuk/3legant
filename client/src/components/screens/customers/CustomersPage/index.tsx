'use client'
import { CustomersTable } from '@/components/screens/customers'
import { useDebounce } from '@/hooks'
import { useGetUsers } from '@/services'
import { Flex } from '@chakra-ui/layout'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import styles from './CustomersPage.module.scss'
import { Input } from '@chakra-ui/input'
import { Button } from '@/components/ui'


export const CustomersPage = () => {
	const [searchValue, setSearchValue] = useState<string>('')
	const debouncedSearchValue = useDebounce(searchValue)
	const { data, canFetchMore, page, fetchNextPage, maxPages, fetchPrevPage } =
		useGetUsers(debouncedSearchValue)

	if (!data) return null

	return (
		<>
			<Flex className={styles.content}>
				<Input
					className={styles.input}
					placeholder="Search customers"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
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
			<CustomersTable data={data.users} />
			<Flex className={styles.count__wrapper}>
				<div className={styles.count}>
					{page + 1}/{maxPages}
				</div>
			</Flex>
		</>
	)
}
