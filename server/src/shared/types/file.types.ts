export type TypeUploadedFile = {
	key: string
	url: string
}

export type TypeFile = {
	fieldname: string
	originalname: string
	encoding: string
	mimetype: string
	buffer: Buffer
	size: number
}
