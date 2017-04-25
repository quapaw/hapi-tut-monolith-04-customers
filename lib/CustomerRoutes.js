'use strict';


const Boom = require('boom');

class CustomerRoutes {
    getByID(request, reply) {

        const db = request.mongo.db;

        db.collection('customers').findOne({ id: request.params.id }, (err, doc) => {

            if (err) {
                return reply(Boom.wrap(err, 'Internal error'));
            }

            if (!doc) {
                return reply(Boom.notFound());
            }

            reply(doc);
        });
    };

    load(request, reply) {

        const db = request.mongo.db;

        db.collection('customers').insertMany(request.payload, (err, doc) => {

            console.log('inside load step');
            if (err) {
                return reply(Boom.wrap(err, 'Internal error'));
            }

            return reply(doc);
        });
    }
}

module.exports = CustomerRoutes;
