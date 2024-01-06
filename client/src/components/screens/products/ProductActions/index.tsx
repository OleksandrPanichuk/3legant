'use client'
import { useCopy } from '@/hooks'
import { absolutePath } from '@/lib'
import { Routes } from '@/shared/constants'
import { TypeProduct } from '@/shared/types'
import { useConfirmModal } from '@/store'
import {
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
} from '@chakra-ui/menu'
import { Copy, MoreHorizontal, Navigation, Trash } from 'lucide-react'
import Link from 'next/link'
import styles from './ProductActions.module.scss'
interface IProductActionsProps {
	product: TypeProduct
}

export const ProductActions = ({ product }: IProductActionsProps) => {
	const [_, copy] = useCopy()
	const onOpen = useConfirmModal(state => state.onOpen)
	return (
		<Menu>
			<MenuButton onClick={e => e.stopPropagation()}>
				<MoreHorizontal />
			</MenuButton>
			<MenuList onClick={e => e.stopPropagation()} padding={'4px'}>
				<MenuItem
					icon={<Navigation />}
					as={Link}
					href={`${Routes.PRODUCTS}/${product.id}`}
				>
					See product page
				</MenuItem>
				<MenuItem
					icon={<Copy />}
					onClick={() => copy(absolutePath(`${Routes.PRODUCTS}/${product.id}`))}
				>
					Copy link
				</MenuItem>
				<MenuDivider />
				{/* TODO: Delete product */}
				<MenuItem
					onClick={() => onOpen()}
					icon={<Trash />}
					className={styles.delete}
				>
					Delete
				</MenuItem>
			</MenuList>
		</Menu>
	)
}
