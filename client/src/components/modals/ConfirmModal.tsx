'use client'
import { useConfirmModal } from '@/store'
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
} from '@chakra-ui/modal'
import { Button } from '@chakra-ui/react'
import { Loader2 } from 'lucide-react'
import { useRef } from 'react'

export const ConfirmModal = () => {
	const {
		description,
		isOpen,
		onClose,
		title,
		onConfirm,
		buttonText,
		buttonColorScheme,
		isLoading
	} = useConfirmModal()

	const cancelRef = useRef<HTMLButtonElement>(null)
	
	return (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
			onClose={onClose}
			motionPreset='slideInBottom'
			isCentered
		>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize='lg' fontWeight='bold'>
						{title}
					</AlertDialogHeader>

					<AlertDialogBody>{description}</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							Cancel
						</Button>
						<Button
							colorScheme={buttonColorScheme}
							onClick={async () => {
								try {
									await onConfirm?.()
								} finally {
									onClose()
								}
							}}
							ml={3}
							
							gap={'0.5rem'}
						>
							{isLoading && <Loader2 className='animate-spin'/>}
							{buttonText}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}
