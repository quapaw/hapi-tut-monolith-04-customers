'use strict';

const Code            = require('code');
const Lab             = require('lab');
const LabbableServer  = require('../localServer.js');

const expect     = Code.expect;
const lab        = exports.lab = Lab.script();
const test       = lab.test;
const before     = lab.before;
const after      = lab.after;
const experiment = lab.experiment;

let server;
let db;
let pid;

before((done) => {

    LabbableServer.ready( (err, srv) => {

        if (err) {
            return done(err);
        }

        server = srv;

        db = server.connections[0].server.mongo.db;

        db.command({ 'serverStatus': 1 }, (err, result) => {

            if (err) {
                console.log(err);
            }
            else {
                pid = result.pid;
                process.kill(pid, 'SIGSTOP');
            }
        });

        return done();
    });
});


after((done) => {

    process.kill(pid, 'SIGCONT');

    return (done);

});



experiment('Negative Tests', () => {

    test('read customer not there', (done) => {

        const options = {
            method: 'GET',
            url: '/api/v1/customers/999'
        };

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(404);
            done();
        });

    });

});
