import { UserButton } from '@/components/common'
import { Heading } from '@/components/ui'
import { Hide, IconButton, Input, Show, Spacer } from '@chakra-ui/react'
import { SearchIcon } from '@/components/icons'
import styles from './Navbar.module.scss'
import { MobileSidebar } from '../MobileSidebar'

export const Navbar = () => {
	return (
		<header className={styles.header}>
			<Show breakpoint="(min-width: 48rem)">
				<Heading variant="h4">Dashboard</Heading>
			</Show>
			<Hide breakpoint="(min-width: 48rem)">
				<MobileSidebar />
			</Hide>
			<Spacer />
			<Show breakpoint="(min-width: 48rem)">
				<Input className={styles.input} placeholder="Search" />
			</Show>
			<Hide breakpoint="(min-width: 48rem)">
				<IconButton backgroundColor={'transparent'} aria-label={'search'}>
					<SearchIcon />
				</IconButton>
			</Hide>
			<UserButton />
		</header>
	)
}
