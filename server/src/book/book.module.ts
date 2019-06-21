// Vendors
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Services
import { BookService } from 'src/book/book.service';
// Controllers
import { BookController } from 'src/book/book.controller';
// Schemas
import { BookSchema } from 'src/book/book-shema/book.schema';

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
