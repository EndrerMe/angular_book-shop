// Vendors
import { Controller, Get, Post, Body } from '@nestjs/common';

// Services
import { UsersService } from 'src/users/users.service';
// Interfaces
import { IUsers } from 'src/users/model/users.model';
// Dto
import { PaginationDTO } from 'src/pagination/dto/paginat.dto';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
    ) {}

    @Post('paging')
    public paging(@Body() page: PaginationDTO): Promise<IUsers> {
        return this.usersService.paging(page.currentPage);
    }

    @Get('getTotal')
    public getTotal(): Promise<{}> {
        return this.usersService.getTotal();
    }

    @Post('deleteUser')
    public async deleteUser(@Body() user: IUsers): Promise<IUsers[]> {
        return this.usersService.deleteUser(user);
    }

    @Post('changeUser')
    public async changeUser(@Body() user: IUsers): Promise<IUsers> {
        return this.usersService.changeUser(user);
    }

    @Get('getSomeUsers')
    public async getSomeUsers(): Promise<IUsers[]> {
        return this.usersService.getSomeUsers();
    }
}
