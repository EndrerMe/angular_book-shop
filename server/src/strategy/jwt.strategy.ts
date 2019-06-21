// Vendors
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// Services
import { AuthService } from './../auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: 'secretKey',
      });
    }

    // async validate(payload: JwtPayload) {
    //   const user = await this.authService.validateUser(payload);
    //   if (!user) {
    //     throw new UnauthorizedException();
    //   }
    //   return user;
    // }
}
