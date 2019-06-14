// Vendors
import { Controller, Body, Post, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Services
import { AuthService } from './auth.service';
// Interfaces
import { IAuth } from './Interfaces/IAuth';


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {

    }

    @Post("createUser")
    public async createUser(@Body() user: IAuth): Promise<IAuth> {
        const checkUserByName = await this.authService.findUserByName(user.userName)
        if (checkUserByName) {
            throw new HttpException({
                status: HttpStatus.METHOD_NOT_ALLOWED,
                error: "Password is worng"
            }, 405);
        } 
        console.log("user is add")
        return this.authService.create(user)

    }

    @Post("login")
    public async login(@Body() body: { userName: string; userPassword: string}): Promise<{token: string}> {
        const neededUser =  await this.authService.findUserByName(body.userName);
        const token = await this.authService.singIn(body.userName);
        const match = await bcrypt.compare (body.userPassword, neededUser.userPassword)
        if (!neededUser) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "User not found"
            }, 404);
        }

        if (!match) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: "Password is worng"
            }, 403);
        }
        
        if (neededUser && match) {
            return {token}
        }
    }
}
