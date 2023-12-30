import { ReactElement, ReactNode, cloneElement, MouseEvent } from 'react'

export const useModalChildren = (
	children: ReactNode,
	handler: (event: MouseEvent) => any
) => {
	return cloneElement(children as ReactElement, {
		onClick: handler,
	})
}
