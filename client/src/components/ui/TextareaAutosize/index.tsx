"use client"
import {  mergeRefs } from '@/lib'
import { Textarea, TextareaProps } from '@chakra-ui/textarea'
import { forwardRef, useRef } from 'react'
import { useAutosizeTextArea } from './TextareaAutosize.hooks'


export const TextareaAutosize = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
		const textareaRef = useRef<HTMLTextAreaElement>(null)

		useAutosizeTextArea(textareaRef.current, props.value)

		return (
			<Textarea
				{...props}
				overflow='hidden'
				resize={'none'}
				className={className}
				ref={mergeRefs(ref, textareaRef)}
			/>
		)
	}
)

TextareaAutosize.displayName = 'TextareaAutosize'
