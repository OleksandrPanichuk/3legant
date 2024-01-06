"use client"
import { useState } from "react"
import { toast } from "sonner"

export const useCopy = (withToast:boolean = true): [boolean, (value:string) => void] => {
	const [copied, setCopied] = useState(false)

	const copy = (value:string) =>  {
		if(!navigator?.clipboard) {
			console.warn('Clipboard not supported')
			setCopied(false)
			return
		}
		navigator.clipboard.writeText(value)
		setCopied(true)
		withToast && toast.info('Copied')

		setTimeout(() => {
			setCopied(false)
		}, 2000)
	}

	return [copied, copy]
}