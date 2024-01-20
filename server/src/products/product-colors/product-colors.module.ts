import { Module } from '@nestjs/common'
import { ProductColorsService } from './product-colors.service'
import { ProductColorsController } from './product-colros.controller'
import { StorageModule } from '@/common/storage'

@Module({
	providers: [ProductColorsService],
	controllers: [ProductColorsController],
	imports: [StorageModule],
})
export class ProductColorsModule {}
