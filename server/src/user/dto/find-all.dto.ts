import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";



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