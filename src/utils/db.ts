import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI);

export var Schema = mongoose.Schema,
    ObjectID = mongoose.Schema.ObjectID;

export var UserSchema = new Schema({
    userId: {type: String},
    email: {type: String},
    passwordHash: {type: String},
    passwordSalt: {type: String},
    fullName: {type: String}
});

export var UserModel = mongoose.model('UserModel',UserSchema);

export var ArticleSchema = new Schema({
    id: {type: String},
    title: {type: String},
    subtitle: {type: String},
    leadParagraph: {type: String},
    imageUrl: {type: String},
    body: {type: String},
    author: {type: String},
    userId: {type: String},
    date: {type: String},
    category: {type: String},
});

export var ArticleModel = mongoose.model('ArticleModel', ArticleSchema);