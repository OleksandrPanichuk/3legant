import { CustomersTableWrapper } from '@/components/screens/customers'
import { Heading } from '@/components/ui'
import { Box } from '@chakra-ui/layout'

//TODO: metadata

const Page = () => {
	return (
		<>
			<Box marginBottom={'0.5rem'}>
				<Heading size={'base'}>Customers</Heading>
			</Box>
			<CustomersTableWrapper />
		</>
	)
}
export default Page
