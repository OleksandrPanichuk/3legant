import { Category } from "@prisma/client"
import { Transform } from "class-transformer"
import { IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator"

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
    categories: Category[]

    @IsNumber()
    count: number
}