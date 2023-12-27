import { NewCategoryModal } from '@/components/modals'
import { CategoriesTableWrapper } from '@/components/screens/categories'
import { Heading } from '@/components/ui'
import { Button, Flex } from '@chakra-ui/react'
import { Plus } from 'lucide-react'

const Page = () => {
	return (
		<>
			<Flex
				width={'100%'}
				justifyContent={'space-between'}
				alignItems={'center'}
				gap={'0.5rem'}
				marginBottom={'0.5rem'}
			>
				<Heading size={'base'}>Categories</Heading>
				<NewCategoryModal>
					<Button colorScheme={'gray'}>
						<Plus />
						New Category
					</Button>
				</NewCategoryModal>
			</Flex>
			<CategoriesTableWrapper />
		</>
	)
}

export default Page
