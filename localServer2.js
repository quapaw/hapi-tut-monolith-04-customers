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
            },
            'plugin': {
                'register': 'hapi-mongodb',
                'options': dbOptions
            }

        }
    ]
};

Glue.compose( manifest, options, (err, server) => {
    server.start( (err) => {

        if (err) {
            throw err;
        }
        console.log('server running at: ' + server.info.uri);
    });
});

