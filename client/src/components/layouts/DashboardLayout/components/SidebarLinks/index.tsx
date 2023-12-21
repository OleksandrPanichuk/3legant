'use client'
import { Typography } from '@/components/ui'
import Link from 'next/link'
import { sidebarLinks } from './SidebarLinks.data'
import styles from './SidebarLinks.module.scss'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib'

export const SidebarLinks = () => {
	const pathname = usePathname()

	return (
		<ul className={styles.list}>
			{sidebarLinks.map((link) => {
				const Icon = link.icon
				const isActive = pathname.startsWith(link.href)
				return (
					<li
						className={cn(styles.item, isActive && styles.active)}
						key={link.id}
					>
						<Link className={styles.link} href={link.href}>
							<Icon />
							<Typography weight={600} size={'sm'} as={'span'}>
								{link.text}
							</Typography>
						</Link>
					</li>
				)
			})}
		</ul>
	)
}
