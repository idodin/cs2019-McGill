import { Router } from 'express';
import {Status, UpDown} from "../models/status.model";
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import {Account} from "../models/account.model";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

var Schema = mongoose.Schema,
    ObjectID = mongoose.Schema.ObjectID;

var UserSchema = new Schema({
    userId: {type: String},
    email: {type: String},
    passwordHash: {type: String},
    passwordSalt: {type: String},
    fullName: {type: String}
});

var UserModel = mongoose.model('UserModel',UserSchema);

export class Api {
    public getRouter(): Router {
        const router = Router();

        /**
         * GET - Return current status
         * Up - Service is function
         * Down - Service is not functional
          */
	router.get('/status', function(req, res) {
		res.send(new Status(UpDown.Up));
        return;
	});

	router.post('/auth/createAccount', function(req, res) {
	    var errorString = "";
        var status = 0;
        var email_in = req.param('email');
        var password_in = req.param('password');
        var fullName_in = req.param('fullName');

        // Perform checks for missing parametres.
	    if(email_in == null){
	        errorString = errorString + "Email not specified!";
            status = 400;
        }
        if(password_in == null){
            errorString = errorString + " Password not specified!";
            status = 400;
        }
        if(fullName_in == null){
            errorString = errorString + " Full name not specified!";
            status = 400;
        }

        if(status === 400){
            res.status(status).send({error: errorString.trim()});
            return;
        }

        UserModel.find({email : req.param('email')}, function (err, docs) {
            if (docs.length){
                res.status(500).send({error: "Email already in use!"});
            }else{
                var user = new Account('0', email_in, password_in, password_in, fullName_in);
                var userModel = new UserModel(user);
                userModel.save(function(err){
                    res.status(201).send(user);
                });
            }
        });

    });

        return router;
    }

}
