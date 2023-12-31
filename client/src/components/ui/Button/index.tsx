import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { buttonVariants } from './Button.variants'

export interface IButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
	({ className, variant, border, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, border, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
