"use client"
import { InputHTMLAttributes, forwardRef, useRef } from 'react'
import styles from './Checkbox.module.scss'
import { cn, mergeRefs } from '@/lib'

export interface ICheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(({className, ...props}, ref) => {
	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<div className={cn(styles.wrapper, className)}>
			<input ref={mergeRefs(ref, inputRef)} {...props} className={styles.input} type="checkbox" />
			<span onClick={() => inputRef.current?.click()} className={styles.checkmark} />
		</div>
	)
})

Checkbox.displayName = 'Checkbox'
