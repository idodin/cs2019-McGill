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