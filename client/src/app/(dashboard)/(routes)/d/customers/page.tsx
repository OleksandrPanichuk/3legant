'use client'
import { DataTable } from '@/components/screens/customers'
import { useDebounce } from '@/hooks'
import { useGetUsers } from '@/services'
import { Flex, Input } from '@chakra-ui/react'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'


const Page = () => {
	const [searchValue, setSearchValue] = useState<string>('')
	const debouncedSearchValue = useDebounce(searchValue)
	const { data, isFetching } = useGetUsers(debouncedSearchValue)

	if (!data) return null

	return (
		<div>
			<Flex width={'100%'} justifyContent={'flex-end'}>
				<Input value={searchValue ?? ''} onChange={(e) => setSearchValue(e.target.value)} />
			</Flex>
			<DataTable data={data} />
		</div>
	)
}
export default Page
