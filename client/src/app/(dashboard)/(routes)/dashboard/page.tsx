import { absolutePath } from '@/lib'
import { Routes } from '@/shared/constants'
import { constructMetadata } from '@/shared/metadata'
import { Metadata } from 'next'

export const metadata: Metadata = constructMetadata({
	title: 'Dashboard',
	description: 'Dashboard',
	url: absolutePath(Routes.DASHBOARD),
})

const Page = () => {
	return <></>
}

export default Page
