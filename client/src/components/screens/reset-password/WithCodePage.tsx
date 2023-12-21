import { PasswordService } from '@/services'
import { PasswordForm } from '.'
import { notFound } from 'next/navigation'

export const WithCodePage = async ({ code }: { code: string }) => {
	let verified
	try {
		verified = await PasswordService.verifyCode(code)
	} catch {
		return notFound()
	}
	if (!verified?.data) {
		return notFound()
	}

	return <PasswordForm code={code} />
}
