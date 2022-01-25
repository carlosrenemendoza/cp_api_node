'use strict';
const production = require('./production');
const develop = require('./develop');


if (process.env.NODE_ENV == 'develop')
    module.exports = develop;
else 
    module.exports = production
    