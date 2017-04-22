'use strict';

const Code = require('code');
const Lab  = require('lab');
const LabbableServer = require('../localServer.js');

const expect     = Code.expect;
const lab        = exports.lab = Lab.script();
const test       = lab.test;
const before     = lab.before;
const experiment = lab.experiment;

let server;

before((done) => {

    LabbableServer.ready( (err, srv) => {

        if (err) {
            return done(err);
        }

        server = srv;
        return done();
    });
});

experiment('Test if Initialized', () => {

    test('Test if server is Initialized', (done) => {

        expect(server).to.exist();
        expect(LabbableServer.isInitialized()).to.equal(true);
        done();
    });
});


experiment('Positive Tests', () => {

    test('load customers', (done) => {

        const options = {
            method: 'GET',
            url: '/api/v1/customers/load'
        };

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    test('get all customers', (done) => {

        const options = {
            method: 'GET',
            url: '/api/v1/customers'
        };

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(200);
            done();
        });
    });
});
