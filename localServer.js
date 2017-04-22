'use strict';

const Glue = require('glue');
const options = {
    relativeTo: __dirname
};

const dbOptions = {
    url: 'mongodb://localhost:27017/test',
    settings: {
        poolSize: 10
    },
    decorate: true
};

const manifest = {
    'connections': [
        {
            'port': 3000,
            'labels': ['api'],
            'host': 'localhost'
        }
    ],
    'registrations': [
        {
            'plugin': {
                'register': '.',
                'dependencies': ['hapi-mongodb']
            }

        }
    ]
};

Glue.compose( manifest, options, (err, server) => {

    server.register( { register: require('hapi-mongodb'),  options: dbOptions }, (err) => {

        if (err) {
            console.error(err);
            throw err;
        }

        server.start( (err) => {

            if (err) {
                throw err;
            }
            console.log('server running at: ' + server.info.uri);
        });
    });
});

