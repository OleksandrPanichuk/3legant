export interface IDefaultDropzoneProps {
	disabled?: boolean
	onDrop?: (files: File) => void

	src: string | undefined
	getDataUrl: (file: File) => void

	className?:string
	formMode?: boolean
}
