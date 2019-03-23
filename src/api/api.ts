import { Router } from 'express';
import {Status, UpDown} from "../models/status.model";
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import {Account} from "../models/account.model";
import * as jwtify from "../utils/jwt";
import * as db from "../utils/db"

dotenv.config();

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
	    let errorString = "";
        let status = 0;
        let email_in = req.param('email');
        let password_in = req.param('password');
        let fullName_in = req.param('fullName');

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

        db.UserModel.find({email: email_in}, function (err, docs) {
            if (docs.length){
                res.status(500).send({error: "Email already in use!"});
            }else{
                var user = new Account('0', email_in, password_in, password_in, fullName_in);
                var userModel = new db.UserModel(user);
                userModel.save(function(err){
                    res.status(201).send(user);
                });
            }
        });
    });

	router.post('/auth/authenticate', function(req, res){
        let errorString = "";
	    let email_in = req.param('email');
        let password_in = req.param('password');
        let status=0;

        if(email_in == null){
            errorString = errorString + "Email not specified!";
            status=400;
        }
        if(password_in == null){
            errorString = errorString + " Password not specified!";
            status=400;
        }

        if(status===400){
            res.status(status).send({error: errorString.trim()});
            return;
        }

        db.UserModel.findOne({email : email_in}, function (err, doc) {
            if(!doc) res.status(403).send({error: "Email is incorrect!"});
            else if(doc.passwordHash === password_in){
                let accessToken = jwtify.jwtSign(email_in, password_in);
                res.status(200).send({accessToken: accessToken});
            } else {
                res.status(403).send({error: "Password is incorrect!"})
            }

        });
    });

	router.get('/articles', function(req,res){
        db.ArticleModel.find({}, function (err, docs) {
            res.status(200).send(docs);
        })

    });

        router.get('/articles/:articleid', function(req,res){
            let articleID = req.param('articleid')
            db.ArticleModel.find({id: articleID}, function (err, docs) {
                if(!docs.length) res.status(404).send({error: "No Article with that ID!"});
                else{
                    res.status(200).send(docs);
                }
            })

        });

        router.get('articles/user/:user_id', function(req,res){
            let userID = req.param('user_id');
            db.ArticleModel.find({userId: userID}, function(err, docs){
                res.status(200).send(docs);
            })
        });

        return router;
    }


}
