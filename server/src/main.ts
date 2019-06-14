// Vendors
import { NestFactory } from '@nestjs/core';

// Modules
import { AppModule } from './app.module';
// Intercertors
import { Underscore } from './shared/common/underscoreId.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors( new Underscore() )
  app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
    });

    next();
});

  await app.listen(3000);
  
}
bootstrap();
