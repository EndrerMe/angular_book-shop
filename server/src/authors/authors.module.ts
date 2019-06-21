// Vendors
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { AuthorsController } from './authors.controller';
// Services
import { AuthorsService } from './authors.service';
// Schemas
import { AuthorSchema } from './author-schema/authors.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Authors', schema: AuthorSchema},
    ]),
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
