import { useMutation } from "@tanstack/react-query"
import { PasswordService, resetPasswordSchema } from "@/services"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Routes } from "@/shared/constants"
import { toast } from "sonner"
import { AxiosError } from "axios"


export const useResetPassword = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: (input:z.infer<typeof resetPasswordSchema>) => PasswordService.resetPassword(input),
        onSuccess:() => {
            toast.success('Password updated successfully')

            router.push(Routes.SIGN_IN)
        },
        onError(error) {
            if(error instanceof AxiosError) {
                return toast.error(error.response?.data.message ?? 'Something went wrong');
            }
            return toast.error(error.message)
        },
    })
}