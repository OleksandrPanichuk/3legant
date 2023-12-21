export type UserRole = 'CUSTOMER' | 'MANAGER' | "ADMIN"

export type TypeUser = {
    id:string 
    username:string 
    name:string
    email:string 
    createdAt:Date
    updatedAt:Date
    role:UserRole
    avatar?: {
        url:string
        key:string
    }
}