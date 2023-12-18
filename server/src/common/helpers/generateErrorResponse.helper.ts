import { HttpException } from '@nestjs/common'

export function generateErrorResponse(
	err: any,
	{
		message = 'Internal Error',
		description = 'server/internal-error',
		cause = 'Internal Error',
		status = 500
	}: {
				message?: string
				description?: string
				cause?: string
				status?: number } = {}

) {
	if (err instanceof HttpException) {
		let description

		if (typeof err.getResponse() === 'string') {
			description = err.getResponse()
		} else {
			const response = err.getResponse() as { error?: string }
			description = response?.error
		}
		throw new HttpException(err.message, err.getStatus(), {
			description,
			cause: err.cause
		})
	}
	throw new HttpException(message, status, {
		cause,
		description
	})
}