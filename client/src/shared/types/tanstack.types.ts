export interface IMutationOptions<TData, TVariables, TError> {
	onSuccess?: (data: TData, variables: TVariables) => void | Promise<void>
	onError?: (error: TError) => void | Promise<void>
	onMutate?: (variables: TVariables) => void | Promise<void>
	onSettled?: (
		data: TData | undefined,
		variables: TVariables,
		error: TError | null
	) => void | Promise<void>
}
