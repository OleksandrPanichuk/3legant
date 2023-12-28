import { EditCategoryModal } from '@/components/modals'
import { cn } from '@/lib'
import { useDeleteCategory } from '@/services'
import { TypeCategory } from '@/shared/types'
import { useConfirmModal, useDashboardStore } from '@/store'
import {
	Center,
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
} from '@chakra-ui/react'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import styles from './CategoryActions.module.scss'

interface ICategoryActions {
	category: TypeCategory
}

export const CategoryActions = ({ category }: ICategoryActions) => {
	const onOpen = useConfirmModal(state => state.onOpen)


	const { mutate: deleteCategory, isPending } = useDeleteCategory()

	return (
		<Menu placement='bottom-end'>
			<MenuButton
				as={IconButton}
				aria-label='actions'
				className={styles['menu-open-button']}
			>
				<Center>
					<MoreHorizontal />
				</Center>
			</MenuButton>
			<MenuList padding={'4px'}>
				<EditCategoryModal data={category}>
					<MenuItem className={styles.item}>
						<Edit />
						Edit Category
					</MenuItem>
				</EditCategoryModal>
				<MenuDivider />
				<MenuItem
					onClick={() =>
						onOpen({
							onConfirm: () => deleteCategory(category.id),
							isLoading: isPending,
							buttonText: 'Delete',
							buttonColorScheme: 'red',
						})
					}
					className={cn(styles.item, styles['item--delete'])}
				>
					<Trash />
					Delete Category
				</MenuItem>
			</MenuList>
		</Menu>
	)
}
