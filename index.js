'use strict';

exports.register = function (server, options, next) {

    const Joi = require('joi');
    const Routes = require('./lib/CustomerRoutes');
    const routes = new Routes();

    const PayloadSchema =
        Joi.array().items(
            Joi.object({
                id:           Joi.number().required(),
                first:        Joi.string().required(),
                middle:       Joi.string().allow(null).optional(),
                last:         Joi.string().required(),
                addressLine:  Joi.string().required(),
                city:         Joi.string().required(),
                state:        Joi.string().required(),
                postalCode:   Joi.string().required()
            })
        );

    server.route({
        method: 'GET',
        path: '/api/v1/customers/{id}',
        handler: routes.getByID,
        config: {
            tags: ['api'],
            validate: {
                params: { id: Joi.number().integer() },
                query:  false,
                payload: false,
                options: { allowUnknown: false }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/api/v1/customers',
        handler: routes.load,
        config: {
            tags: ['api'],
            validate: {
                params: false,
                query:  false,
                payload: PayloadSchema,
                options: { allowUnknown: false }
            }
        }
    });
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
