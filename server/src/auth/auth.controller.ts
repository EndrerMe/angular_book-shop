// Vendors
import { Controller, Body, Post, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Services
import { AuthService } from 'src/auth/auth.service';
// Interfaces
import { IAuth } from 'src/auth/Interfaces/IAuth';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {

    }

    @Post('createUser')
    public async createUser(@Body() user: IAuth): Promise<IAuth> {
        const checkUserByName = await this.authService.findUserByNameForRegist(user.userName);
        if (checkUserByName) {
            return this.authService.create(user);
        } else {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Password is worng',
            }, 403);
        }
    }

    @Post('login')
    public async login(@Body() body: { userName: string; userPassword: string}): Promise<{token: string}> {
        const neededUser =  await this.authService.findUserByName(body.userName);
        const token = await this.authService.singIn(body.userName);
        const match = await bcrypt.compare (body.userPassword, neededUser.userPassword);
        if (!neededUser) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'User not found',
            }, 404);
        }

        if (!match) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Password is worng',
            }, 403);
        }
        if (neededUser && match) {
            return {token};
        }
    }
}
