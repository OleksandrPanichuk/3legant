'use client'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import {
	Control,
	Controller,
	ControllerProps,
	FieldPath,
	FieldValues,
	FormProvider,
	Path,
	useFormContext,
} from 'react-hook-form'
import styles from './Form.module.scss'

import { Input as MyInput, IInputProps as MyInputProps, TextareaAutosize } from '@/components/ui'
import { cn } from '@/lib'
import { Input, InputProps } from '@chakra-ui/input'
import {
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputFieldProps,
	NumberInputProps,
	NumberInputStepper,
} from '@chakra-ui/react'
import { Textarea, TextareaProps } from '@chakra-ui/textarea'

const Form = FormProvider

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue
)

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	)
}

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext)
	const itemContext = React.useContext(FormItemContext)
	const { getFieldState, formState } = useFormContext()

	const fieldState = getFieldState(fieldContext.name, formState)

	if (!fieldContext) {
		throw new Error('useFormField should be used within <FormField>')
	}

	const { id } = itemContext

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	}
}

type FormItemContextValue = {
	id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue
)

const FormItem = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const id = React.useId()

	return (
		<FormItemContext.Provider value={{ id }}>
			<div ref={ref} className={className} {...props} />
		</FormItemContext.Provider>
	)
})
FormItem.displayName = 'FormItem'

const FormControl = React.forwardRef<
	React.ElementRef<typeof Slot>,
	React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

	return (
		<Slot
			ref={ref}
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	)
})
FormControl.displayName = 'FormControl'

const FormDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
	const { formDescriptionId } = useFormField()

	return (
		<p
			ref={ref}
			id={formDescriptionId}
			className={cn(styles.description, className)}
			{...props}
		/>
	)
})
FormDescription.displayName = 'FormDescription'

const FormMessage = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
	const { error, formMessageId } = useFormField()
	const body = error ? String(error?.message) : children

	if (!body) {
		return null
	}

	return (
		<p
			ref={ref}
			id={formMessageId}
			className={cn(styles.message, className)}
			{...props}
		>
			{body}
		</p>
	)
})
FormMessage.displayName = 'FormMessage'

const FormLabel = React.forwardRef<
	React.ElementRef<'label'>,
	React.ComponentPropsWithoutRef<'label'>
>(({ className, ...props }, ref) => {
	const { error, formItemId } = useFormField()

	return (
		<label
			ref={ref}
			className={cn(
				'text-base font-medium',
				error && styles['label--destructive'],
				className
			)}
			htmlFor={formItemId}
			{...props}
		/>
	)
})
FormLabel.displayName = 'FormLabel'

interface IFormInputProps<T> extends MyInputProps {
	name: Path<T>
	label: string
}

const FormInput = <T extends FieldValues>({
	name,
	label,
	...props
}: IFormInputProps<T>) => {
	const { control } = useFormContext<T>()
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<MyInput {...field} {...props} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

interface IFormInputChakraProps<T extends FieldValues> extends InputProps {
	name: Path<T>
	control: Control<T>
	label: string
}

const FormInputChakra = <T extends FieldValues>({
	name,
	label,
	control,
	...props
}: IFormInputChakraProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input {...field} {...props} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

interface IFormTextareaProps<T extends FieldValues> extends TextareaProps {
	name: Path<T>
	control: Control<T>
	label: string
}

const FormTextarea = <T extends FieldValues>({
	name,
	label,
	control,
	...props
}: IFormTextareaProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<TextareaAutosize {...field} {...props} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

interface IFormNumberInputProps<T extends FieldValues>
	extends NumberInputProps {
	control: Control<T>
	name: Path<T>
	label: string
	fieldProps?: NumberInputFieldProps
}

const FormNumberInput = <T extends FieldValues>({
	control,
	name,
	label,
	fieldProps,
	...props
}: IFormNumberInputProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<NumberInput
							{...props}
							{...field}
							onChange={(valString, valNumber) => {
								field.onChange(valNumber || 0)
								props?.onChange?.(valString, valNumber)
							}}
						>
							<NumberInputField value={field.value} {...fieldProps} />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormInput,
	FormInputChakra,
	FormItem,
	FormLabel,
	FormMessage,
	FormNumberInput,
	FormTextarea,
	useFormField,
}
