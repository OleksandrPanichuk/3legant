'use client'
import { CategoriesSelect } from '@/components/screens/dashboard-product'
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
import { Edit2, Loader2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { useUpdateProductForm } from './ProductMainInfo.hooks'
import styles from './ProductMainInfo.module.scss'

export const ProductMainInfo = () => {
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const ref = useRef<HTMLFormElement>(null)
	const { onSubmit, ...form } = useUpdateProductForm(() => setIsEditing(false))

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
		formState: { isSubmitting, isDirty },
	} = form

	const disabled = isSubmitting || !isEditing

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} ref={ref}>
				<Card className={styles.card} as={'section'}>
					<CardHeader>
						<Heading as='h4' size={'sm'}>
							Basic information about the product
						</Heading>
					</CardHeader>
					<CardBody className={styles.main}>
						<FormInputChakra
							control={control}
							name='title'
							label='Product Name'
							isDisabled={disabled}
							className={styles.field}
						/>
						<FormInputChakra
							control={control}
							name='measurements'
							label='Measurements'
							isDisabled={disabled}
							className={styles.field}
						/>
						<FormTextarea
							control={control}
							label='Description'
							name={'description'}
							isDisabled={disabled}
							className={styles.field}
						/>
						<FormNumberInput
							control={control}
							fieldProps={{
								placeholder: 'Enter the product price in $',
								className: styles.field,
							}}
							isDisabled={disabled}
							name={'price'}
							min={0}
							precision={2}
							label='Price'
						/>
						<CategoriesSelect disabled={disabled} />
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
