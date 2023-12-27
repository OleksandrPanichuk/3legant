

export type TypeCategory = {
    id: string
    name: string
}

export type TypeTokens = {
    accessToken:string
    refreshToken:string 
}


export type FetchMoreState =
	| 'can-fetch-more'
	| 'can-fetch-one-more'
	| 'cannot-fetch-more'
