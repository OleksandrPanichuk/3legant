import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import '@/styles/globals.scss'
import { cn } from '@/lib'
import { AuthProvider, QueryProvider } from '@/components/providers'
import { Toaster } from 'sonner'


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
				<QueryProvider>
					<AuthProvider>
						<Toaster position="bottom-right" />
						{children}
					</AuthProvider>
				</QueryProvider>
			</body>
		</html>
	)
}
