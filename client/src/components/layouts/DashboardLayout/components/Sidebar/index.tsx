import { Logo } from '@/components/common'
import styles from './Sidebar.module.scss'
import { SidebarLinks } from '../SidebarLinks'

export const Sidebar = () => {
	return (
		<aside className={styles.sidebar}>
			<Logo className={styles.logo} />
			<SidebarLinks />
		</aside>
	)
}
