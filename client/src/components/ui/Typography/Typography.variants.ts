import { cva } from 'class-variance-authority'

export const typographyVariants = cva('',{
	variants: {
		size: {
            xs: 'text-xs',
            sm: 'text-sm',
            base: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
            '2xl': 'text-2xl',
            '3xl': 'text-3xl'
        },
        fontColor: {
            primary: 'text-primary',
            'neutral-100':'text-neutral-100',
            'neutral-200':'text-neutral-200',
            'neutral-300':'text-neutral-300',
            'neutral-400':'text-neutral-400',
            'neutral-500':'text-neutral-500',
            'neutral-600':'text-neutral-600',
            'neutral-700':'text-neutral-700',
        },
		weight: {
            100: 'font-thin',
            200:'font-extra-light',
            300: 'font-light',
            400:'font-regular',
            500: 'font-medium',
            600: 'font-semibold',
            700: 'font-bold',
            800: 'font-extra-bold',
            900: 'font-black'
        },
		fontFamily: {
			inter: 'font-inter',
			poppins: 'font-poppins'
		}
	},
    defaultVariants: {
        fontFamily:'inter',
        size:'base',
        weight:400,
        fontColor:'neutral-500'
    }
})