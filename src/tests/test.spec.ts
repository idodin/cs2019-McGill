import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../app';
import * as db from "../utils/db"
import {Account} from "../models/account.model";

chai.use(chaiHttp);
chai.should();

beforeEach((done) =>{
    db.UserModel.remove({}, function(err){
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
                .send({email: 'test', password: 'test', fullName: 'test'})
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
                .send({password: 'test', fullName: 'test'})
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
                .send({email: 'test', fullName: 'test'})
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
                .send({email: 'test', password: 'test'})
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
                .send({email: 'test'})
                .end((err,res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Email in use, 500 status code", (done) => {

            var user = new Account('0', "test", "test", "test", "test");
            var userModel = new db.UserModel(user);
            userModel.save(function(err){
                if(err) console.error(err);
            });

            console.log("sent")

            chai.request(app)
                .post(path)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({email: 'test', password: 'test', fullName: 'test'})
                .end((err,res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    done();
                });
        });


    })
});