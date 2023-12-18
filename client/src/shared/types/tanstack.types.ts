

export interface IMutationOptions<TData, TVariables,TError> {
    onSuccess?:(data:TData,variables:TVariables) => void;
    onError?:(error:TError)  => void
    onMutate?:(variables:TVariables) => void
    onSettled?:(data:TData | undefined,variables:TVariables,error:TError | null) => void
}