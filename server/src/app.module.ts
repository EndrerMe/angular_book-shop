// Models
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { AppController } from './app.controller';
// Services
import { AppService } from './app.service';
// Modules
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { AuthorsModule } from './authors/authors.module';
import { UsersModule } from './users/users.module';
// Enviromets
import { environment } from './enviroments/environment';

@Module({
  imports: [
    MongooseModule.forRoot(`${environment.mongodb.databaseURL}`),
    BookModule,
    AuthModule,
    AuthorsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
