import { useMutation } from "@tanstack/react-query"
import { AuthApi} from "@/services"
import { IMutationOptions, TypeSignInInput, TypeSignInResponse } from "@/shared/types"
import { AxiosError, AxiosResponse } from "axios"
import { toast } from "sonner"
import { useAuth } from "@/components/providers"
import { useRouter } from "next/navigation"
import { Routes } from "@/shared/constants"


type ResponseType = AxiosResponse<TypeSignInResponse>

export const useSignIn = (options:IMutationOptions<ResponseType,TypeSignInInput,Error> = {}) => {
    const {setUser} = useAuth()
    const router = useRouter()
    return useMutation({
        mutationFn:(dto:TypeSignInInput): Promise<ResponseType> => AuthApi.signIn(dto),
        onSuccess:(response,variables) => {
            setUser(response.data.user)

            toast.success("You successfully signed in.")
            router.push(Routes.ROOT)

            options.onSuccess?.(response, variables);
        },
        onError:(error) => {
            options.onError?.(error)
           
            if(error instanceof AxiosError) {
                return toast.error(error.response?.data.message ?? "Something went wrong")
            }
            return toast.error(error.message)
        },
        onMutate(variables) {
            options.onMutate?.(variables)
        },
        onSettled:(response, error, variables) => {
            options.onSettled?.(response, variables, error)
        }
    })
}