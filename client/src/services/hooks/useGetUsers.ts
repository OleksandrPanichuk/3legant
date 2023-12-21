"use client"
import { UseQueryResult, keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query"
import { UserApi } from "@/services"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { TypeUser } from "@/shared/types"

const TAKE_USERS = 10


type UseGetUsersResult = UseQueryResult<TypeUser[], Error> & {
    page:number 
    setPage: Dispatch<SetStateAction<number>>
}

export const useGetUsers = (searchValue?:string, take: number = TAKE_USERS): UseGetUsersResult => {
    const queryClient = useQueryClient()
    const [page, setPage] = useState<number>(0)

    const {isPlaceholderData, ...queryState} = useQuery({
        placeholderData: keepPreviousData,
        queryKey: ['users', page, searchValue],
        staleTime: 1000 * 60 * 30,
        queryFn:() => UserApi.findAll({searchValue, take, skip: page * take}),
        select: (response) => response.data,
        retry:false,
    })

    useEffect(() => {
        setPage(0)
    }, [searchValue])



    useEffect(() => {
        if(!isPlaceholderData && !searchValue ) {
            queryClient.prefetchQuery({
                queryKey: ['users', page + 1, searchValue],
                queryFn: () =>  UserApi.findAll({searchValue, take, skip: (page + 1) * take}),
                staleTime: 1000 * 60 * 30
              })
        }
    }, [isPlaceholderData, page, queryClient, searchValue, take])


    return {...queryState, isPlaceholderData, page, setPage}
}