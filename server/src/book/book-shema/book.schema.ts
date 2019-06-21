import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
    name: String,
    description: String,
    authors: [],
    type: String,
    price: Number,
});
