const SampleCustomers = require('../samples/customers');
module.exports = function (request, reply) {

    reply(SampleCustomers);

};

'use strict';
const Boom            = require('boom');

class SecurityRoutes {
    getByID(request, reply){

        const db = request.mongo.db;

        db.collection('customers').findOne( { id: request.params.id }, (err, doc) => {

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

    	db.collection('customers').insertMany(SampleCustomers), (err) => {

    		if (err) { 
    			return reply(Boom.wrap(err, 'Internal error'));
    		}

            return;

    	}
    }
}

module.exports = SecurityRoutes;
