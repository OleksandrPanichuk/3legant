'use client'
import {
	Button,
	Form,
	FormField,
	FormInputChakra,
	FormItem,
	FormMessage,
} from '@/components/ui'
import { useDataUrl, useModalChildren } from '@/hooks'
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

import { useCreateProductColor, useNewColorForm } from './NewProductColor.hooks'
import styles from './NewProductColorModal.module.scss'

import { DefaultDropzone } from '@/components/common'
import { type CreateProductColorInput } from '@/services'
import { Loader2 } from 'lucide-react'

export const NewProductColorModal = ({ children }: PropsWithChildren) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const [src, getDataUrl, resetUrl] = useDataUrl()

	const form = useNewColorForm()
	const { mutateAsync: createColor } = useCreateProductColor()

	const {
		control,
		handleSubmit,
		reset,
		formState: { isValid, isSubmitting },
	} = form

	const close = () => {
		onClose()
		reset()
		resetUrl()
	}

	const onSubmit = async (
		values: Omit<CreateProductColorInput, 'productId'>
	) => {
		try {
			await createColor(values)
		} finally {
			close()
		}
	}

	const childrenWithHandler = useModalChildren(children, onOpen)
	return (
		<>
			{childrenWithHandler}
			<Modal isOpen={isOpen} isCentered onClose={close}>
				<ModalOverlay />
				<Form {...form}>
					<ModalContent onSubmit={handleSubmit(onSubmit)} as={'form'}>
						<ModalCloseButton />
						<ModalHeader>Add new product color</ModalHeader>
						<ModalBody>
							<FormField
								name='file'
								control={control}
								render={({ field }) => (
									<FormItem>
										<DefaultDropzone
											disabled={isSubmitting}
											onDrop={field.onChange}
											src={src}
											getDataUrl={getDataUrl}
											formMode
										/>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormInputChakra
								label={'Color name'}
								control={control}
								name='name'
								isDisabled={isSubmitting}
							/>
						</ModalBody>
						<ModalFooter className={styles.footer}>
							<Button
								type='button'
								onClick={close}
								disabled={isSubmitting}
								variant={'ghost'}
							>
								Cancel
							</Button>
							<Button type='submit' disabled={!isValid || isSubmitting}>
								{isSubmitting && <Loader2 className={'animate-spin'} />}
								Save
							</Button>
						</ModalFooter>
					</ModalContent>
				</Form>
			</Modal>
		</>
	)
}
