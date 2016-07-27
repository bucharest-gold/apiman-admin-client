'use strict';

const apiman = require('./lib/apiman');

const options = {
  'baseUrl': 'http://localhost:8080',
  'username': 'admin',
  'password': 'admin123!'
};

apiman.status(options)
.then(x => console.log(x))
.catch(e => console.log(e));

apiman.exportData(options)
.then(x => console.log(x))
.catch(e => console.log(e));

apiman.gateways(options)
.then(x => console.log(x))
.catch(e => console.log(e));
