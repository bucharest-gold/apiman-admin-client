'use strict';

const apiman = require('./lib/apiman');

// #1 Using custom username and password:
const options = {
  baseUrl: 'http://localhost:8080',
  username: 'admin',
  password: 'admin123!'
};

apiman(options).status().then(a => console.log(a.name));

// #2 Using default username and password:
const defaultOptions = { baseUrl: 'http://localhost:8080' };

apiman(defaultOptions).gateways().then(a => console.log(a));

// #3 Testing a gateway:
let config = JSON.stringify({
  endpoint: 'http://localhost:8080/apiman-gateway-api',
  username: 'apimanager',
  password: 'apiman123!'
});

const opts = {
  body: {
    name: 'The Gateway',
    description: 'This is the gateway.',
    type: 'REST',
    configuration: config
  }
};

// #4 Importing settings and using defaultOptions:
apiman({})
  .importData(__dirname + '/test/fixtures/api-manager-export.json')
  .then(x => console.log(x))
  .catch(err => console.log(err));
