import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../app';
import * as db from "../utils/db"
import {Account} from "../models/account.model";
import * as jwtify from "../utils/jwt";
import {Article} from "../models/article.model";


chai.use(chaiHttp);
chai.should();

beforeEach((done) =>{
    db.UserModel.remove({}, function(err){
        if(err)
            console.log(err)
    })
    db.ArticleModel.remove({}, function(err){
        if(err)
            console.log(err)
        done();
    })
})

describe('Status', () => {
    describe("GET /status", () => {
        it("Should return UP", (done) => {
            chai.request(app)
                .get('/api/status')
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.haveOwnProperty('status', 'Up');
                    done();
                });
        })
    })
});


describe('createAccount', () => {
    describe("POST /createAccount", () => {

        var path = "/api/auth/createAccount";
        const valid_email = "valid@email.com";
        const valid_pass = "password";
        const valid_fullName = "fullName";

        it("Valid student creation, 201 status code", (done) => {

            chai.request(app)
                .post(path)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({email: valid_email, password: valid_pass, fullName: valid_fullName})
                .end((err,res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Missing email, 400 status code.", (done) => {

            chai.request(app)
                .post(path)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({password: valid_pass, fullName: valid_fullName})
                .end((err,res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Missing password, 400 status code.", (done) => {

            chai.request(app)
                .post(path)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({email: valid_email, fullName: valid_fullName})
                .end((err,res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Missing fullName, 400 status code.", (done) => {

            chai.request(app)
                .post(path)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({email: valid_email, password: valid_pass})
                .end((err,res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Email in use and missing other parameters, 400 status code.", (done) => {

            chai.request(app)
                .post(path)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({email: valid_email})
                .end((err,res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Email in use, 500 status code", (done) => {

            var user = new Account('0', valid_email, valid_pass, valid_pass, valid_fullName);
            var userModel = new db.UserModel(user);
            userModel.save(function(err){
                if(err) console.error(err);
            });

            chai.request(app)
                .post(path)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({email: valid_email, password: valid_pass, fullName: valid_fullName})
                .end((err,res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    done();
                });
        });


    })
});

describe('Authentication', () =>{
    describe('POST /authenticate', ()=>{

        var path = "/api/auth/authenticate";
        const valid_email = "valid@email.com";
        const invalid_email = "invalid@email.com";
        const valid_pass = "password";
        const invalid_pass = "wrong_password";
        const valid_fullName = "fullName";


        it("Successful authentication, 200 status code.", (done) => {

            var user = new Account('0', valid_email, valid_pass, valid_pass, valid_fullName);
            var userModel = new db.UserModel(user);
            userModel.save(function(err){
                if(err) console.error(err);
            });

            chai.request(app)
                .post(path)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({email: valid_email, password: valid_pass })
                .end((err,res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('object');
                    done();
                });
        });

        it("Unsuccessful authentication with wrong password, 403 status code.", (done) => {

            var user = new Account('0', valid_email, valid_pass, valid_pass, valid_fullName);
            var userModel = new db.UserModel(user);
            userModel.save(function(err){
                if(err) console.error(err);
            });

            chai.request(app)
                .post(path)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({email: valid_email, password: invalid_pass })
                .end((err,res) => {
                    res.should.have.status(403);
                    // res.body.should.be.a('object');
                    done();
                });
        });

        it("Unsuccessful authentication with wrong email, 403 status code.", (done) => {

            var user = new Account('0', valid_email, valid_pass, valid_pass, valid_fullName);
            var userModel = new db.UserModel(user);
            userModel.save(function(err){
                if(err) console.error(err);
            });

            chai.request(app)
                .post(path)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({email: invalid_email, password: valid_pass })
                .end((err,res) => {
                    res.should.have.status(403);
                    // res.body.should.be.a('object');
                    done();
                });
        });

        it("Missing password parameter, 400 status code.", (done) => {

            chai.request(app)
                .post(path)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({email: valid_email})
                .end((err,res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Missing email parameter, 400 status code.", (done) => {

            chai.request(app)
                .post(path)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({password: valid_pass})
                .end((err,res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });



    })
})

describe('Articles', () =>{
    describe('GET /articles', ()=>{

        var path = "/api/articles";
        var path2 = "/api/articles/100";

        it("Empty article retrieval, 200 status code", (done) => {
            chai.request(app)
                .get(path)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    done();
                });
        });

        it("Non-empty article retrieval, 200 status code", (done) => {

            const d1: Date = new Date(1434032402340234023);
            const d2: Date = new Date(25234023402340324023);
            const d3: Date = new Date(34342342342343243253);


            var articleA = new Article("0", undefined, undefined, undefined, undefined, undefined, undefined, undefined, d1,undefined,);
            var articleModelA = new db.ArticleModel(articleA);
            articleModelA.save()
                .then(()=>{
            var articleB = new Article("1", undefined, undefined, undefined, undefined, undefined, undefined, undefined, d2,undefined,);
            var articleModelB = new db.ArticleModel(articleB);
            articleModelB.save()
                .then(()=>{
                        var articleC = new Article("2", undefined, undefined, undefined, undefined, undefined, undefined, undefined, d3,undefined,);
                        var articleModelC = new db.ArticleModel(articleC);
                        articleModelC.save()
                            .then(()=>{
                                chai.request(app)
                                    .get(path)
                                    .end((err,res) => {
                                        res.should.have.status(200);
                                        res.body.should.be.a("array");
                                        for(var i=1; i<res.body.length; i++){
                                            if(res.body[i].date /= res.body[i-1].date)
                                                console.log(err);
                                        }
                                        console.log(res.body)
                                        done();
                                    });
                            });}
                )}
                );

        });

        it("Successful Article retreival by ID", (done) =>{

            var article = new Article("100");
            var articleModel = new db.ArticleModel(article);
            articleModel.save();

            chai.request(app)
                .get(path2)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    done();
                });
        });

    });
});
