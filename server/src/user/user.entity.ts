import { User, UserRole } from "@prisma/client";
import { IsDate, IsEmail, IsEnum, IsMongoId, IsOptional, IsString, IsUrl, ValidateNested } from "class-validator";


export class UserEntity implements Omit<User, 'hash' | 'hashedRt'> {
    @IsMongoId()
    readonly id: string

    @IsString()
    readonly name:string


    @IsString()
    readonly username:string 

    @IsEmail()
    readonly email: string


    @IsDate()
    readonly createdAt:Date


    @IsDate()
    readonly updatedAt:Date

    @IsEnum(UserRole)
   readonly role: UserRole
}


export class UserEntityWithHashes extends UserEntity {
    readonly hash: string
    readonly hashedRt:string
}



class UserAvatar {
    @IsString()
    @IsUrl()
    readonly url: string
    
    @IsString()
    readonly key: string 
}
export class UserEntityWithAvatar  extends UserEntity {
    @IsOptional()
    @ValidateNested()
    readonly avatar?:UserAvatar
}


