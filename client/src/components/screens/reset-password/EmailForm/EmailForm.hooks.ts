import { useMutation } from "@tanstack/react-query"
import { PasswordService } from "@/services"
import { toast } from "sonner"
import { AxiosError } from "axios"



export const useSendResetPasswordLink = () => {
    return useMutation({
		mutationFn: (email: string) => PasswordService.sendResetPasswordLink(email),
		onSuccess() {
			toast.success('Please, check your email')
		},
		onError(error) {
			if (error instanceof AxiosError) {
				return toast.error(
					error.response?.data.message ?? 'Something went wrong'
				)
			}
			return toast.error(error.message)
		}
	})
}