// Vendors
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Interfaces
import { IUsers } from './model/users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel("Users") private readonly usersModel: Model<IUsers>
    ) {}

    public async getTotal(): Promise<{}> {
        const total = this.usersModel.find().count()
        return total
    }

    public async paging(page: number): Promise<any> {
        console.log(page)
        const perPage = 5;
        const start = (page - 1) * perPage;
        const usersOnPage = this.usersModel.find().skip(start).limit(perPage)
        return usersOnPage
    }

    public async deleteUser(user: IUsers): Promise<IUsers[]> {
        console.log("user is delete")
        return this.usersModel.remove({_id: user.id})
    }

    public async changeUser(user: IUsers): Promise<IUsers> {
        const saltRounds = 10
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(user.userPassword, salt);
        user.userPassword = hash
        return this.usersModel.updateOne({_id: user.id}, user)
    }

    public async getSomeUsers(): Promise<IUsers[]> {
        return await this.usersModel.find()
    }
}
