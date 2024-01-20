'use client'
import { cn } from '@/lib'
import { Signal } from '@preact/signals-react'
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from 'lucide-react'
import { InputHTMLAttributes, ReactNode, forwardRef, useState } from 'react'
import styles from './Input.module.scss'

export interface IInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
	icon?: ReactNode
	value?:
		| InputHTMLAttributes<HTMLInputElement>['value']
		| Signal<string | number>
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
	({ className, icon, type, ...props }, ref) => {
		if (type === 'password') {
			return <PasswordInput icon={icon} className={className} {...props} />
		}
		const Icon = icon

		return (
			<div className={cn(styles.wrapper, styles['wrapper-empty'], className)}>
				{Icon}
				{/* @ts-ignore */}
				<input
					ref={ref}
					{...props}
					onChange={e => {
						props.onChange?.(e)
						if (!e.target.value) {
							e.target.parentElement?.classList.add(styles['wrapper-empty'])
						} else {
							e.target.parentElement?.classList.remove(styles['wrapper-empty'])
						}
					}}
					type={type}
					className={styles.input}
				/>
			</div>
		)
	}
)

Input.displayName = 'Input'

export const PasswordInput = forwardRef<
	HTMLInputElement,
	Omit<IInputProps, 'type'>
>(({ className, icon, ...props }, ref) => {
	const [isVisible, setIsVisible] = useState(false)
	const Icon = icon
	return (
		<div className={cn(styles.wrapper, styles['wrapper-empty'], className)}>
			{Icon}
			{/* @ts-ignore */}
			<input
				ref={ref}
				{...props}
				onChange={e => {
					props.onChange?.(e)
					if (!e.target.value) {
						e.target.parentElement?.classList.add(styles['wrapper-empty'])
					} else {
						e.target.parentElement?.classList.remove(styles['wrapper-empty'])
					}
				}}
				type={isVisible ? 'text' : 'password'}
				className={styles.input}
			/>
			<button
				type={'button'}
				onClick={() => {
					setIsVisible(prev => !prev)
				}}
				className={styles['password-hide-button']}
			>
				{isVisible ? <EyeOffIcon /> : <EyeIcon />}
			</button>
		</div>
	)
})

PasswordInput.displayName = 'PasswordInput'
