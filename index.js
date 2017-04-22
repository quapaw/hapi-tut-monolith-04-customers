'use strict';

exports.register = function (server, options, next) {

    const Joi = require('joi');
    const Routes = require('./lib/CustomerRoutes');
    const routes = new Routes();

    //TODO: cusip number is 9 position.  We could validate it
    server.route({
        method: 'GET',
        config: {
            tags: ['api']
        },
        path: '/api/v1/customers/{id}',
        handler: routes.getByID
    });

    server.route({
        method: 'GET',
        config: {
            tags: ['api']
        },
        path: '/api/v1/customers/load',
        handler: routes.load
    });
    next();
};

exports.register.attributes = {

    pkg: require('./package.json')
};
