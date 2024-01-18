import { Transform } from "class-transformer"
import { IsBoolean} from "class-validator"



export class AddProductImageDto {
	@Transform(params => JSON.parse(params.value))
	@IsBoolean()
	isPreview:boolean
}