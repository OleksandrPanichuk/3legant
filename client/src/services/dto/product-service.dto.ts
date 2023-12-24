import { z } from "zod";

export const createProductSchema = z.object({
    title: z.string({required_error:"Product name is required"}).min(1,'Product name is too short'),
    description: z.string({required_error:'Description is required'}).min(200,'Description is too short (min 200 characters)'),
    price: z.number({required_error:'Price is required'}).nonnegative("Price cannot be negative").min(5, "The minimum price is $5"),
    measurements: z.string({required_error:"Measurements are required"}).min(1,'Measurements are required'),
    details: z.string({required_error:"Detailed info is required"}).min(200, "Detailed info is too short"),
    width: z.number({required_error:'Width is required'}).nonnegative('Width cannot be negative'),
    height: z.number({required_error:"Height is required"}).nonnegative('Height cannot be negative'),
    length: z.number({required_error:"Length is required"}).nonnegative("Length cannot be negative"),
    weight: z.string({required_error:"Weight is required"}).min(1, "Weight is required"),
    packages: z.number({required_error:"Packages count is required"}).nonnegative('Packages count cannot be negative'),
    categories: z.array(z.string()).min(1, "Please, choose at least one category"),
    previewImage : z.custom<File>((v) => v instanceof File, {message:"File is required"})
})

export type CreateProductInput =  z.infer<typeof createProductSchema>