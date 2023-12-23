'use client'
import { InputHTMLAttributes, ReactNode, forwardRef, useState } from 'react'
import { Radio } from '@/components/ui'
import styles from './Input.module.scss'
import { cn } from '@/lib'
import { Eye as  EyeIcon, EyeOff as EyeOffIcon } from 'lucide-react'

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	icon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
	({ className, icon, type, ...props }, ref) => {
		if (type === 'radio') {
			return <Radio className={className} {...props} />
		}
		if (type === 'password') {
			return <PasswordInput icon={icon} className={className} {...props} />
		}
		const Icon = icon

		return (
			<div className={cn(styles.wrapper, styles['wrapper-empty'], className)}>
				{Icon}
				<input
					ref={ref}
					{...props}
					onChange={(e) => {
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
			<input
				ref={ref}
				{...props}
				onChange={(e) => {
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
					setIsVisible((prev) => !prev)
				}}
				className={styles['password-hide-button']}
			>
				{isVisible ? <EyeOffIcon /> : <EyeIcon />}
			</button>
		</div>
	)
})

PasswordInput.displayName = 'PasswordInput'
