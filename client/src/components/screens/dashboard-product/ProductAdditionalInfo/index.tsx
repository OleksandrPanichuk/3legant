'use client'
import {
	Button,
	Form,
	FormInputChakra,
	FormNumberInput,
	FormTextarea,
	Heading,
} from '@/components/ui'
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	useOutsideClick,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useUpdateProductInfoForm } from './ProductAdditionalInfo.hooks'

import { Edit2, Loader2 } from 'lucide-react'
import styles from './ProductAdditionalInfo.module.scss'

export const ProductAdditionalInfo = () => {
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const ref = useRef<HTMLFormElement>(null)

	const { onSubmit, ...form } = useUpdateProductInfoForm(() =>
		setIsEditing(false)
	)

	useOutsideClick({
		ref,
		handler: () => {
			setIsEditing(false)
			form.reset()
		},
	})

	const {
		handleSubmit,
		control,
		formState: { isDirty, isSubmitting },
	} = form

	const disabled = isSubmitting || !isEditing

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} ref={ref}>
				<Card className={styles.card} as={'section'}>
					<CardHeader>
						<Heading as='h4' size={'sm'}>
							Additional information about the product
						</Heading>
					</CardHeader>
					<CardBody className={styles.main}>
						<FormInputChakra
							control={control}
							name='width'
							label='Width'
							isDisabled={disabled}
							className={styles.field}
						/>
						<FormInputChakra
							control={control}
							name='height'
							label='Height'
							isDisabled={disabled}
							className={styles.field}
						/>
						<FormInputChakra
							control={control}
							name='length'
							label='Length'
							isDisabled={disabled}
							className={styles.field}
						/>
						<FormInputChakra
							control={control}
							name='weight'
							label='Weight'
							isDisabled={disabled}
							className={styles.field}
						/>
						<FormTextarea
							control={control}
							label='Details'
							name={'details'}
							isDisabled={disabled}
							className={styles.field}
						/>
						<FormNumberInput
							control={control}
							min={0}
							isDisabled={disabled}
							name='packages'
							label={'Packages'}
							fieldProps={{
								placeholder: 'Enter the amount of packages',
								className: styles.field,
							}}
						/>
					</CardBody>
					<CardFooter className={styles.footer}>
						{isEditing ? (
							<>
								<Button
									disabled={isSubmitting}
									variant={'ghost'}
									type='reset'
									onClick={() => setIsEditing(false)}
								>
									Cancel
								</Button>
								<Button disabled={isSubmitting || !isDirty} type='submit'>
									{isSubmitting && <Loader2 className='animate-spin' />}
									Save
								</Button>
							</>
						) : (
							<Button onClick={() => setIsEditing(true)} type='button'>
								<Edit2 />
								Edit
							</Button>
						)}
					</CardFooter>
				</Card>
			</form>
		</Form>
	)
}
