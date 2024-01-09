import { ProductView } from '@/components/screens/dashboard-product'
import { Suspense } from 'react'

interface IPageProps {
	params: {
		productId: string
	}
}

export default async function Page({ params }: IPageProps) {
	return (
		<Suspense fallback={<ProductView.Skeleton />}>
			<ProductView productId={params.productId} />
		</Suspense>
	)
}
