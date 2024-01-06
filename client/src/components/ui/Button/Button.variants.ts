import { cva } from 'class-variance-authority'
import styles from './Button.module.scss'

export const buttonVariants = cva(styles.button, {
	variants: {
		variant: {
			default: styles['button-default'],
			outline: styles['button-outline'],
			ghost: styles['button-ghost'],
			secondary: styles['button-secondary']
		},
		size: {
			xs: styles['text-sx'],
			sm: styles['text-sm'],
			base: styles['text-base'],
			lg: styles['text-lg'],
			xl: styles['text-xl']
		},
		border: {
			base: styles['border-base'],
			lg: styles['border-lg']
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'base',
		border: 'base'
	}
})