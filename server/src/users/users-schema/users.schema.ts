import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    id: String,
    userName: String,
    userEmail: String,
    userPassword: String,
    userGenre: String,
    userRole: String,
});
