import { User } from "@prisma/client";
import { Exclude,  } from "class-transformer";
import { IsDate, IsEmail, IsMongoId, IsString } from "class-validator";


export class UserEntity implements User {
    @IsMongoId()
    readonly id: string

    @IsString()
    readonly name:string


    @IsString()
    readonly username:string 

    @IsEmail()
    readonly email: string

    @Exclude()
    readonly hash:string 

    @Exclude()
    readonly hashedRt:string

    @IsDate()
    readonly createdAt:Date


    @IsDate()
    readonly updatedAt:Date
}