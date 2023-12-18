import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvKeys } from '@/shared/constants';
import helmet from 'helmet';
import * as CookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() { 
  const app = await NestFactory.create(AppModule);
  const config  = app.get(ConfigService)
  app.use(helmet())

  app.enableCors({
    origin: [config.get<string>(EnvKeys.CLIENT_URL)],
    credentials:true
  })

  app.setGlobalPrefix('api')

  app.use(CookieParser())

  app.useGlobalPipes(
		new ValidationPipe({
			transform: true
		})
	)

  await app.listen(config.get<number>(EnvKeys.PORT), () => {
    console.log('Server is running on port',config.get<number>(EnvKeys.PORT))
  });
}
bootstrap();
