'use strict';

const apiman = require('./lib/apiman');

const options = {
  baseUrl: 'http://localhost:8080',
  username: 'admin',
  password: 'admin123!'
};

apiman(options).status()
  .then((a) => console.log(a.name));

const defaultAdminUserOptions = { baseUrl: 'http://localhost:8080' };

apiman(defaultAdminUserOptions).listGateways()
  .then((a) => console.log(a));

let config = JSON.stringify({endpoint : 'http://localhost:8080/apiman-gateway-api', 
username: 'apimanager', password : 'apiman123!'});

const opts = {
  body: {
    name: 'The Gateway',
    description: 'This is the gateway.',
    type: 'REST',
    configuration : config
  }
};

apiman(opts).testGateway()
.then((a) => console.log(a))
.catch((e) => console.log(e));

apiman({})
.importData(__dirname + '/test/fixtures/api-manager-export.json')
.then((x) => console.log(x))
.catch((error) => console.log(error));
  