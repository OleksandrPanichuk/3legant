import { StorageModule } from '@/common/storage'
import { Module } from '@nestjs/common'
import { ProductImagesController } from './product-images.controller'
import { ProductImagesService } from './product-images.service'

@Module({
	imports: [StorageModule],
	controllers: [ProductImagesController],
	providers: [ProductImagesService],
})
export class ProductImagesModule {}
