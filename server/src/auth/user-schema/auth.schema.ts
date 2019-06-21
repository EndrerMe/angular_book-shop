import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
    userName: String,
    userPassword: String,
    userEmail: String,
    userGender: String,
    userRole: String,
    token: String,
});
