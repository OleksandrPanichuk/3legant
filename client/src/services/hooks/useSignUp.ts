import { useMutation } from "@tanstack/react-query"
import { AuthApi, SignUpResponse, SignUpInput} from "@/services"
import { IMutationOptions } from "@/shared/types"
import { AxiosError, AxiosResponse } from "axios"
import { toast } from "sonner"
import { useAuth } from "@/components/providers"


type ResponseType = AxiosResponse<SignUpResponse>

export const useSignUp = (options:IMutationOptions<ResponseType,SignUpInput,Error> = {}) => {
    const {setUser} = useAuth()
    return useMutation({
        mutationFn:(dto:SignUpInput): Promise<ResponseType> => AuthApi.signUp(dto),
        onSuccess:(response,variables) => {
            setUser(response.data.user)

            toast.success("Welcome to 3legant!")

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