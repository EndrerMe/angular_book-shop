// Vendors
import { Controller, Body, Post, Get } from '@nestjs/common';

// Services
import { AuthorsService } from 'src/authors/authors.service';
// Interfaces
import { IAuthor } from 'src/authors/Interfaces/IBook';
// Dto
import { PaginationDTO } from 'src/pagination/dto/paginat.dto';

@Controller('authors')
export class AuthorsController {
    constructor(
        private authorsService: AuthorsService,
    ) {}

    @Post('addNewAuthor')
    public async addNewAuthor(@Body() author: IAuthor): Promise<IAuthor> {
        return this.authorsService.addNewAuthor(author);
    }

    @Post('paging')
    public async paging(@Body() paging: PaginationDTO): Promise<IAuthor[]> {
        return this.authorsService.paging(paging.currentPage);
    }

    @Get('getTotal')
    public async getTotal(): Promise<{}> {
        return this.authorsService.getTotal();
    }

    @Get('getAllAuthors')
    public async getAllAuthors(): Promise<IAuthor[]> {
        return this.authorsService.getAllAuthors();
    }

    @Post('changeAuthorName')
    public async changeAuthorName(@Body() author: IAuthor): Promise<IAuthor> {
        return this.authorsService.changeAuthorName(author);
    }

    @Post('deleteAuthor')
    public async deleteAuthor(@Body() author: IAuthor): Promise<IAuthor> {
        return this.authorsService.deleteAuthor(author);
    }
}
