'use client'
import { useModalChildren } from '@/hooks'
import { TypeProductColor, TypeProductColorImage } from '@/shared/types'
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

interface IProductColorModalProps {
	color: Omit<TypeProductColor, 'productId'> & {
		image: Pick<TypeProductColorImage, 'url' | 'key'>
	}
}

export const ProductColorModal = ({
	children,
	color,
}: PropsWithChildren<IProductColorModalProps>) => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const childrenWithHandler = useModalChildren(children, onOpen)
	return (
		<>
			{childrenWithHandler}
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Color: {color.name}</ModalHeader>
				</ModalContent>
			</Modal>
		</>
	)
}
