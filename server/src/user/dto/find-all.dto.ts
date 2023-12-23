import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { UserEntityWithAvatar } from "../user.entity";



export class FindAllInput {
    @IsOptional()
    @Transform((params) => Number(params.value))
    @IsNumber()
    @Min(0)
    take?: number

    @IsOptional()
    @Transform((params) => Number(params.value))
    @IsNumber()
    @Min(0)
    skip?: number


    @IsOptional()
    @IsString()
    searchValue?: string
}


export class FindAllResponse {
    @ValidateNested()
    users: UserEntityWithAvatar[]

    @IsNumber()
    count: number
}