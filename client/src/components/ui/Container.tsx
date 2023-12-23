'use client'
import { cn } from '@/lib'
import React, { ForwardedRef, ReactNode } from 'react'

export interface IContainerProps {
	className?: string
	children: ReactNode
	fullScreen?: boolean
	as?: keyof HTMLElementTagNameMap
}

export const Container = React.forwardRef(function Container(
	props: IContainerProps,
	ref: ForwardedRef<HTMLElement>
) {
	const { as: Element = 'div',fullScreen,className, ...rest } = props;
	return React.createElement(
		Element,
		{
			ref,
			className: cn(
				'page__container',
				(typeof fullScreen !== 'undefined' || fullScreen) &&
					'h-full',
				className
			),
			...rest 
		},
		props.children
	)
})