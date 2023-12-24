'use client'

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Typography
} from '@/components/ui'
import { useFormContext } from 'react-hook-form'
import Dropzone from 'react-dropzone'

import styles from './PreviewImageDropzone.module.scss'
import Image from 'next/image'
import { cn } from '@/lib'
import { useDataUrl } from '@/hooks'



export const PreviewImageDropzone = () => {
	const {control} =  useFormContext()
	const [src, getDataUrl] = useDataUrl()

	return (
		<FormField
			control={control}
			name={'previewImage'}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Product preview image</FormLabel>
					<Dropzone
						onDrop={(files) => {
							getDataUrl(files[0])
							field.onChange(files[0])
						}}
						multiple={false}
						maxFiles={1}
						accept={{
							'image/*': ['.jpeg', '.png', '.avif', '.svg', '.jpg', '.wepb']
						}}
					>
						{({ getRootProps, getInputProps }) => (
							<div
								{...getRootProps()}
								className={cn(
									styles.dropzone,
									!src && styles['dropzone--empty']
								)}
							>
								<FormControl>
									<input {...getInputProps()} />
								</FormControl>
								{src ? (
									<Image fill src={src} alt={'product-preview-image'} />
								) : (
									<Typography className={styles.text}>Include a high-quality image.</Typography>
								)}
							</div>
						)}
					</Dropzone>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
