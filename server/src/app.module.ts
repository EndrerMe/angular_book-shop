// Models
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { AppController } from 'src/app.controller';
// Services
import { AppService } from 'src/app.service';
// Modules
import { BookModule } from 'src/book/book.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthorsModule } from 'src/authors/authors.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/bookShop'),
    BookModule,
    AuthModule,
    AuthorsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
