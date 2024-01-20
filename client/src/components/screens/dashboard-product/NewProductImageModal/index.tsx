'use client'

import { Button } from '@/components/ui'
import { useDataUrl, useModalChildren } from '@/hooks'
import {
	Checkbox,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react'
import { PropsWithChildren, useState } from 'react'

import { DefaultDropzone } from '@/components/common'
import { useSignal } from '@preact/signals-react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useAddProductImage } from './NewProductImageModal.hooks'
import styles from './NewProductImageModal.module.scss'

export const NewProductImageModal = ({ children }: PropsWithChildren) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const isPreview = useSignal<boolean>(false)
	const [file, setFile] = useState<File>()

	const [src, getDataUrl, resetSrc] = useDataUrl()

	const close = () => {
		onClose()
		setFile(undefined)
		resetSrc()
		isPreview.value = false
	}

	const { mutateAsync: addProductImage, isPending } = useAddProductImage()

	const onSubmit = async () => {
		try {
			if (!file) return toast.error('No file added')
			await addProductImage({ file, isPreview: isPreview.value })
		} finally {
			close()
		}
	}

	const childrenWithHandler = useModalChildren(children, onOpen)

	return (
		<>
			{childrenWithHandler}
			<Modal isOpen={isOpen} onClose={close} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalHeader>Add a new product image</ModalHeader>
					<ModalBody>
						<DefaultDropzone
							src={src}
							getDataUrl={getDataUrl}
							disabled={isPending}
							onDrop={setFile}
						/>

						<Flex as='label' className={styles['is-preview']}>
							<Checkbox
								checked={isPreview.value}
								disabled={isPending}
								onChange={e => {
									isPreview.value = e.target.checked
								}}
							/>
							Is preview image?
						</Flex>
					</ModalBody>
					<ModalFooter className={styles.footer}>
						<Button disabled={isPending} onClick={close} variant={'ghost'}>
							Cancel
						</Button>
						<Button onClick={onSubmit} disabled={!file || isPending}>
							{isPending && <Loader2 className={'animate-spin'} />}
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
