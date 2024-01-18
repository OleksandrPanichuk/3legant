import { StorageModule } from '@/common/storage'
import { Module } from '@nestjs/common'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { ProductImagesModule } from './product-images/product-images.module'

@Module({
  imports: [StorageModule, ProductImagesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
