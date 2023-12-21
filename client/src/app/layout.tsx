import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import '@/styles/globals.scss'
import { cn } from '@/lib'
import {
	RootProviders
} from '@/components/providers'

const inter = Inter({
	subsets: ['latin'],
	weight: ['700', '600', '400', '500'],
	variable: '--font-inter'
})
const poppins = Poppins({
	subsets: ['latin'],
	weight: ['700', '600', '400', '500'],
	variable: '--font-poppins'
})

export const metadata: Metadata = {
	title: '3legant',
	description: 'Furniture shop'
}

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={cn(inter.variable, poppins.variable)}>
				<RootProviders>
					{children}
				</RootProviders>
			</body>
		</html>
	)
}
