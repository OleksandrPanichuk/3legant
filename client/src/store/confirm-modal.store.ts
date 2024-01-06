import { create } from 'zustand'

interface IConfirmModalData {
	title: string
	description: string
	buttonText: string
	buttonColorScheme: string
	isLoading?: boolean
	onConfirm?: () => void | Promise<void>
}

interface IConfirmModalStore extends IConfirmModalData {
	isOpen: boolean
	onOpen: (data?: Partial<IConfirmModalData>) => void
	onClose: () => void
}

const defaultData: Omit<IConfirmModalData, 'onConfirm'> = {
	title: 'Are you absolutely sure?',
	description: 'This action cannot be undone. This will permanently delete it.',
	buttonText: 'Delete',
	buttonColorScheme: 'red',
}

export const useConfirmModal = create<IConfirmModalStore>(set => ({
	isOpen: false,
	onClose: () => set({ isOpen: false, ...defaultData }),
	onOpen: (data = {}) => set({ isOpen: true, ...data }),
	...defaultData,
}))
