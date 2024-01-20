'use client'

import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui'
import { useFormContext } from 'react-hook-form'

import { DefaultDropzone } from '@/components/common'
import { useDataUrl } from '@/hooks'

import styles from './PreviewImageDropzone.module.scss'

export const PreviewImageDropzone = ({ disabled }: { disabled?: boolean }) => {
	const { control } = useFormContext()
	const [src, getDataUrl] = useDataUrl()

	return (
		<FormField
			control={control}
			name={'previewImage'}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Product preview image</FormLabel>
					<DefaultDropzone
						getDataUrl={getDataUrl}
						src={src}
						onDrop={field.onChange}
						disabled={disabled}
						className={styles.dropzone}
						formMode
					/>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
