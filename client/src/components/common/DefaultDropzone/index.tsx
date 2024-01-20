'use client'
import Image from 'next/image'
import Dropzone from 'react-dropzone'
import { IDefaultDropzoneProps } from './DefaultDropzone.types'

import { FormControl, Typography } from '@/components/ui'
import { cn } from '@/lib'
import styles from './DefaultDropzone.module.scss'

export const DefaultDropzone = ({
	disabled,
	onDrop,
	getDataUrl,
	src,
	formMode,
	className
}: IDefaultDropzoneProps) => {
	return (
		<Dropzone
			onDrop={files => {
				getDataUrl(files[0])
				onDrop?.(files[0])
			}}
			disabled={disabled}
			multiple={false}
			maxFiles={1}
			accept={{
				'image/*': ['.jpeg', '.png', '.jpg', '.wepb'],
			}}
		>
			{({ getInputProps, getRootProps }) => (
				<div
					{...getRootProps()}
					className={cn(styles.dropzone, !src && styles['dropzone--empty'], className)}
				>
					{formMode ? (
						<FormControl>
							<input {...getInputProps()} disabled={disabled} />
						</FormControl>
					) : (
						<input {...getInputProps()}  disabled={disabled} />
					)}

					{src ? (
						<Image fill className={styles.image} src={src} alt={'selected image'} />
					) : (
						<Typography className={styles.text}>
							Include a high-quality image.
						</Typography>
					)}
				</div>
			)}
		</Dropzone>
	)
}
