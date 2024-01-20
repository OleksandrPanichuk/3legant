import { StorageModule } from '@/common/storage'
import { Module } from '@nestjs/common'
import { ProductColorsModule } from './product-colors/product-colors.module'
import { ProductImagesModule } from './product-images/product-images.module'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
	imports: [StorageModule, ProductImagesModule, ProductColorsModule],
	controllers: [ProductsController],
	providers: [ProductsService],
})
export class ProductsModule {}
