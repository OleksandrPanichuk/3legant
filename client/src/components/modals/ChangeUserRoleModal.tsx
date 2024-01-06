'use client'

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui'
import Select from 'react-select'
import { useModalChildren } from '@/hooks'
import { updateUserRoleSchema, useUpdateUserRole } from '@/services'
import { UserRole } from '@/shared/types'
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
import { SingleValue } from 'react-select'
import { z } from 'zod'

interface IChangeUserRoleModal {
	userId: string
	role: UserRole
}

type TypeFormData = z.infer<typeof updateUserRoleSchema>
type TypeOption = {
	value: UserRole
	label: string
}

const options: TypeOption[] = [
	{ value: 'MANAGER', label: 'Manager' },
	{ value: 'CUSTOMER', label: 'Customer' },
]

export const ChangeUserRoleModal = ({
	children,
	userId,
	role,
}: PropsWithChildren<IChangeUserRoleModal>) => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const form = useForm<TypeFormData>({
		resolver: zodResolver(updateUserRoleSchema),
		defaultValues: {
			role,
		},
	})

	const { setValue, getValues, control, handleSubmit } = form

	const { isPending, mutate } = useUpdateUserRole({
		onSuccess: () => {
			form.reset()
			onClose()
		},
	})

	const onSubmit = (values: TypeFormData) => mutate({ ...values, userId })

	useEffect(() => {
		if (getValues().role !== role) {
			setValue('role', role)
		}
	}, [role, setValue, getValues])

	const childrenWithHandler = useModalChildren(children, onOpen)
	return (
		<>
			{childrenWithHandler}
			<Modal isOpen={isOpen} isCentered onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalHeader>Edit user role</ModalHeader>
					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<ModalBody>
								<FormField
									control={control}
									name={'role'}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Select Role</FormLabel>
											<FormControl>
												<Select
													options={options}
													value={options.find(
														option => option.value === field.value
													)}
													onChange={option =>
														field.onChange(
															(option as SingleValue<TypeOption>)?.value
														)
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</ModalBody>
							<ModalFooter gap='0.5rem'>
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
