//TODO: metadata

import { CreateProductForm } from '@/components/screens/create-product'
import { Heading } from '@/components/ui'

const Page = () => {
	return (
		<>
			<div>
				<Heading variant="h6">Add new product</Heading>
			</div>
			<CreateProductForm />
		</>
	)
}

export default Page
