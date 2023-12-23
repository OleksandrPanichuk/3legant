import { cn } from '@/lib'
import { forwardRef } from 'react'
import styles from './Radio.module.scss'

export interface IRadioProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const Radio = forwardRef<HTMLInputElement, IRadioProps>(
	({ className, ...props }, ref) => {
		return <input {...props} ref={ref} type="radio" className={cn(styles.radio,className)} />
	}
)

Radio.displayName = 'Radio'
