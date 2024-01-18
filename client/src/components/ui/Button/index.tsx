import { cn } from '@/lib'
import { type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import styles from './Button.module.scss'
import { buttonVariants } from './Button.variants'
export interface IButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	animate?: boolean
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
	(
		{ className, variant, border, size, onClick, animate = true, ...props },
		ref
	) => {
		return (
			<button
				className={cn(buttonVariants({ variant, border, size, className }))}
				ref={ref}
				onClick={function (e) {
					onClick?.(e)

					if (!animate) {
						return
					}

					const button = e.currentTarget

					const circle = document.createElement('span')
					const diameter = Math.max(button.clientWidth, button.clientHeight)
					const radius = diameter / 2

					const position = button.getBoundingClientRect()

					circle.style.width = circle.style.height = `${diameter}px`
					circle.style.left = `${e.clientX - (position.x + radius)}px`
					circle.style.top = `${e.clientY - (position.y + radius)}px`
					circle.classList.add(styles.ripple)

					button.appendChild(circle)

					setTimeout(() => {
						circle.remove()
					}, 1000)
				}}
				{...props}
			/>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
