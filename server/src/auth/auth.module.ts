// Vendors
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Services
import { AuthService } from 'src/auth/auth.service';
// Schemas
import { AuthSchema } from 'src/auth/user-schema/auth.schema';
// Controllers
import { AuthController } from 'src/auth/auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Users', schema: AuthSchema},
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
