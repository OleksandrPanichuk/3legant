'use client'

import { Button, Form, FormInputChakra } from '@/components/ui'
import { useModalChildren } from '@/hooks'
import { updateCategorySchema, useUpdateCategory } from '@/services'
import { TypeCategory } from '@/shared/types'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { PropsWithChildren, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface IEditCategoryModalProps {
	data: TypeCategory
}

type TypeFormData = z.infer<typeof updateCategorySchema>

export const EditCategoryModal = ({
	data,
	children,
}: PropsWithChildren<IEditCategoryModalProps>) => {
	const { isOpen, onClose, onOpen } = useDisclosure()

	const form = useForm<TypeFormData>({
		resolver: zodResolver(updateCategorySchema),
		defaultValues: {
			name: data.name,
		},
	})
	const {
		handleSubmit,
		setValue,
		getValues,
	} = form

	const { mutate: updateCategory, isPending } = useUpdateCategory({
		onSuccess: () => {
			form.reset()
			onClose()
		},
	})

	const onSubmit = (values: TypeFormData) =>
		updateCategory({ id: data.id, ...values })

	const childrenWithHandler = useModalChildren(children, onOpen)

	useEffect(() => {
		if (data.name !== getValues().name) {
			setValue('name', data.name)
		}
	}, [data, getValues, setValue])

	return (
		<>
			{childrenWithHandler}
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Category Info</ModalHeader>
					<ModalCloseButton />
					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<ModalBody>
								<FormInputChakra<TypeFormData>
									name='name'
									label={'Category name'}
									focusBorderColor='black'
									isDisabled={isPending}
								/>
							</ModalBody>
							<ModalFooter display='flex' gap='0.5rem'>
								<Button
									disabled={isPending}
									type={'button'}
									onClick={onClose}
									variant={'ghost'}
								>
									Close
								</Button>
								<Button disabled={isPending || (getValues().name === data.name)} type={'submit'}>
									{isPending && <Loader2 className='animate-spin' />}
									Save
								</Button>
							</ModalFooter>
						</form>
					</Form>
				</ModalContent>
			</Modal>
		</>
	)
}
