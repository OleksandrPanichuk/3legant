import { ProductsService } from "@/services"
import { TypeFullProduct } from "@/shared/types"


export async function getProductById(productId:string): Promise<TypeFullProduct | null> {
	try {
		const response =  await ProductsService.findById(productId)
		return response.data
	} catch(err) {
		return null
	}
}