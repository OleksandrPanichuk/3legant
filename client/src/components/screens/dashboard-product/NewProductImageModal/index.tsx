'use client'

import { Button, Typography } from '@/components/ui'
import { useDataUrl, useModalChildren } from '@/hooks'
import { cn } from '@/lib'
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
import Image from 'next/image'
import { PropsWithChildren, useState } from 'react'
import Dropzone from 'react-dropzone'

import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useAddProductImage } from './NewProductImageModal.hooks'
import styles from './NewProductImageModal.module.scss'
import { useSignal } from '@preact/signals-react'

export const NewProductImageModal = ({ children }: PropsWithChildren) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const isPreview = useSignal<boolean>(false)
	const [file, setFile] = useState<File>()

	const [src, getDataUrl] = useDataUrl()

	const close = () => {
		onClose()
		setFile(undefined)
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
						<Dropzone
							onDrop={files => {
								setFile(files[0])
								getDataUrl(files[0])
							}}
							disabled={isPending}
							multiple={false}
							maxFiles={1}
							accept={{
								'image/*': ['.jpeg', '.png', '.jpg', '.wepb'],
							}}
						>
							{({ getInputProps, getRootProps }) => (
								<div
									{...getRootProps()}
									className={cn(
										styles.dropzone,
										!src && styles['dropzone--empty']
									)}
								>
									<input {...getInputProps()} disabled={isPending} />

									{src ? (
										<Image fill src={src} alt={'product-image'} />
									) : (
										<Typography className={styles.text}>
											Include a high-quality image.
										</Typography>
									)}
								</div>
							)}
						</Dropzone>
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
