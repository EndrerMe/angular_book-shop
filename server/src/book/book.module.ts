// Vendors
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Services
import { BookService } from './book.service';
// Controllers
import { BookController } from './book.controller';
// Schemas
import { BookSchema } from './book-shema/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Books', schema: BookSchema},
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
