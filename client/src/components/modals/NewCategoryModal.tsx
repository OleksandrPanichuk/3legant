"use client"
import { Button, Form, FormInputChakra, Typography } from '@/components/ui'
import {
	CreateCategoryInput,
	newCategorySchema,
	useCreateCategory,
} from '@/services'
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
import { PropsWithChildren, ReactElement, cloneElement } from 'react'
import { useForm } from 'react-hook-form'

export const NewCategoryModal = ({ children }: PropsWithChildren) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const form = useForm<CreateCategoryInput>({
		resolver: zodResolver(newCategorySchema),
		defaultValues: {
			name: '',
		},
	})

	const { mutate: createCategory, isPending } = useCreateCategory()

	const onSubmit = (values: CreateCategoryInput) => createCategory(values)

	const childrenWithHandler = cloneElement(children as ReactElement, {
		onClick: onOpen,
	})

	return (
		<>
			{childrenWithHandler}
			<Modal isOpen={isOpen} isCentered onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalHeader>Add category</ModalHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<ModalBody>
								<FormInputChakra<CreateCategoryInput>
									name={'name'}
									label='Category name'
									isDisabled={isPending}
									focusBorderColor='black'
								/>
								<Typography>*Reload the page for the new category to appear in the table </Typography>
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
								<Button disabled={isPending} type={'submit'}>
									{isPending && <Loader2 className='animate-spin' />}
									Submit
								</Button>
							</ModalFooter>
						</form>
					</Form>
				</ModalContent>
			</Modal>
		</>
	)
}
