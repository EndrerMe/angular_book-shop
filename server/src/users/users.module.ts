// Vendors
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Vendors
import { UsersService } from 'src/users/users.service';
// Schemas
import { UsersSchema } from 'src/users/users-schema/users.schema';
// Controllers
import { UsersController } from 'src/users/users.controller';

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
