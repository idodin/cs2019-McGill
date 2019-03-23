import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../app'

chai.use(chaiHttp);
chai.should();

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