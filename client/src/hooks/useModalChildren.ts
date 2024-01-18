import { MouseEvent, ReactElement, ReactNode, cloneElement } from 'react'

export const useModalChildren = (
	children: ReactNode,
	handler: (event: MouseEvent) => any
) => {
	return cloneElement(children as ReactElement, {
		onClick: handler,
	})
}
