// Vendors
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Vendors
import { UsersService } from './users.service';
// Schemas
import { UsersSchema } from './users-schema/users.schema';
// Controllers
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Users', schema: UsersSchema},
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
