import { RootProviders } from '@/components/providers'
import { cn } from '@/lib'
import { currentUser } from '@/services'
import { constructRootMetadata } from '@/shared/metadata'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'

import '@/styles/globals.scss'

const inter = Inter({
	subsets: ['latin'],
	weight: ['700', '600', '400', '500'],
	variable: '--font-inter',
})
const poppins = Poppins({
	subsets: ['latin'],
	weight: ['700', '600', '400', '500'],
	variable: '--font-poppins',
})

export const viewport: Viewport = {
	themeColor: '#ffffff',
	initialScale: 1,
	maximumScale: 1,
	minimumScale: 1,
	width: 'device-width',
}

export const metadata: Metadata = constructRootMetadata()

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const user = await currentUser()
	return (
		<html lang='en'>
			<body className={cn(inter.variable, poppins.variable)}>
				<RootProviders initialUser={user}>{children}</RootProviders>
			</body>
		</html>
	)
}
