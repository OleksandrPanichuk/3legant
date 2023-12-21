import { Loading } from '@/components/common'
import {
	EmailForm,
	WithCodePage
} from '@/components/screens/reset-password'

import { Suspense } from 'react'

interface IPageProps {
	searchParams: {
		code?: string
	}
}

const Page = async ({ searchParams }: IPageProps) => {
	if (searchParams.code) {
		return (
				<WithCodePage code={searchParams.code} />
		)
	}
	
	return <EmailForm />
}


export default Page