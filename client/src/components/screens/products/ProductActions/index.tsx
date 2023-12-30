import { TypeProduct } from '@/shared/types'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { Copy, MoreHorizontal, Navigation, Trash } from 'lucide-react'

interface IProductActionsProps {
	product: TypeProduct
}

export const ProductActions = ({product}:IProductActionsProps) => {
	return (
		<Menu>
			<MenuButton>
				<MoreHorizontal />
			</MenuButton>
			<MenuList>
				<MenuItem>
					<Navigation />
					See product page
				</MenuItem>
				<MenuItem>
					<Copy />
					Copy link
				</MenuItem>

				<MenuItem>
					<Trash />
					Delete
				</MenuItem>
			</MenuList>
		</Menu>
	)
}
