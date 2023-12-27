'use client'

import { TypeCategory } from '@/shared/types'
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react'
import { PropsWithChildren, ReactElement, cloneElement } from 'react'

interface IEditCategoryModalProps {
	data: TypeCategory
}

export const EditCategoryModal = ({
	data,
	children,
}: PropsWithChildren<IEditCategoryModalProps>) => {
	const { isOpen, onClose, onOpen } = useDisclosure()

	const childrenWithHandler = cloneElement(children as ReactElement, {
		onClick: onOpen,
	})
	return (
		<>
			{childrenWithHandler}
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Category Info</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<></>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}
