import { DashboardLayout } from '@/components/layouts'
import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
	return <DashboardLayout>{children}</DashboardLayout>
}

export default Layout
