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
        weight:400
    }
})