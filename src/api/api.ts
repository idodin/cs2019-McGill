import { Router } from 'express';
import {Status, UpDown} from "../models/status.model";
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import {Account} from "../models/account.model";
import * as jwtify from "../utils/jwt";
import * as jwt from 'jsonwebtoken'
import * as db from "../utils/db"
import {Article} from "../models/article.model";

dotenv.config();

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

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
	    if(email_in == null || email_in.trim().length == 0){
	        errorString = errorString + "Email not specified!";
            status = 400;
        }
        if(password_in == null || password_in.trim().length == 0){
            errorString = errorString + " Password not specified!";
            status = 400;
        }
        if(fullName_in == null || fullName_in.trim().length == 0){
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
                let userId = randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                var user = new Account(userId, email_in, password_in, password_in, fullName_in);
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

        if(email_in == null || email_in.trim().length == 0){
            errorString = errorString + "Email not specified!";
            status=400;
        }
        if(password_in == null || password_in.trim().length == 0){
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
            db.ArticleModel.find({id: articleID}).lean().exec(function (err, docs) {
                if(!docs.length) res.status(404).send({error: "No Article with that ID!"});
                else{
                    res.status(200).send(JSON.stringify(docs));
                }
            });

        });

        router.get('/articles/user/:user_id', function(req,res){
            let userID = req.param('user_id');
            db.ArticleModel.find({userId: userID}).lean().exec( function(err, docs){
                res.status(200).send(JSON.stringify(docs));
            });
        });

        router.post('/articles', function(req, res){
            let token = req.headers['authorization'];
            if(!token || !token.startsWith('Bearer')){
                res.status(403).send({error: "No authorization token specified!"});
                return;
            }

            token = token.slice(7, token.length);

            jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
                if(err){
                    console.log(err);
                    res.status(403).send({error: "Error in token!"});
                } else {
                    let body = req.param('body');
                    let title = req.param('title');
                    let subtitle = req.param('subtitle');
                    let leadParagraph = req.param('leadParagraph');

                    let status = 0;
                    let errorMessage = "";

                    if(body == null || body.trim().length == 0) {
                        errorMessage = "Body cannot be null!";
                        status = 400;
                    }
                    if(title == null || body.trim().length == 0) {
                        errorMessage = errorMessage + " Title cannot be null!";
                        status = 400;
                    }
                    if(subtitle == null || body.trim().length == 0) {
                        errorMessage = errorMessage + " Subtitle cannot be null!";
                        status = 400;
                    }

                    if(leadParagraph == null || body.trim().length == 0){
                        errorMessage = errorMessage + " Lead Paragraph cannot be null!";
                        status = 400;
                    }

                    if(status == 400){
                        res.status(status).send({error: errorMessage.trim()});
                        return;
                    }

                    db.UserModel.findOne({email: decoded['email']}, function(err, doc){
                        let id = randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
                        let article = new Article(id, title, subtitle, leadParagraph, undefined, body, doc.fullName, doc.userId, new Date(Date.now()), undefined)
                        let articleModel = new db.ArticleModel(article)
                        articleModel.save((err)=>{
                            res.status(200).send({message: "Success",
                            id: id})
                        })
                    })

                }
            });



        });

        return router;
    }


}
