'use client'
import { Logo } from '@/components/common'
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	IconButton,
	useDisclosure
} from '@chakra-ui/react'
import { Menu as MenuIcon } from 'lucide-react'
import styles from './MobileSidebar.module.scss'
import { SidebarLinks } from '../SidebarLinks'

export const MobileSidebar = () => {
	const { onClose, onOpen, isOpen } = useDisclosure()
	return (
		<>
			<IconButton
				backgroundColor={'transparent'}
				aria-label="sidebar menu"
				onClick={onOpen}
			>
				<MenuIcon />
			</IconButton>
			<Drawer placement={'left'} isOpen={isOpen} onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent className={styles.content}>
					<DrawerCloseButton className={styles['close-button']} />
					<DrawerBody className={styles.body}>
						<Logo className={styles.logo} />
						<SidebarLinks />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	)
}
