import { UpdateUserRoleInput, UsersService } from '@/services'
import { QueryBaseKeys } from '@/shared/constants'
import { useDashboardStore } from '@/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { ZodError } from 'zod'

export const useUpdateUserRole = ({onSuccess}:{onSuccess?:() => void} = {}) => {
	const refetchUsers = useDashboardStore(state => state.refetchUsers)
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (values: UpdateUserRoleInput) =>
			UsersService.updateRole(values),
		onSuccess: () => {
			toast.success('User role updated')
			queryClient.removeQueries({
				predicate: query => query.queryKey.includes(QueryBaseKeys.USERS),
			})
			refetchUsers?.()
			onSuccess?.()
		},
		onError: error => {
			if (error instanceof AxiosError && error.response?.data.message) {
				return toast.error(error.response?.data.message)
			}
			if (error instanceof ZodError) {
				return toast.error(error.message)
			}
			return toast.error('Failed to update user role')
		},
	})
}
