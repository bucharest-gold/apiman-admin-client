# apiman-admin-client

Node.js client for the Apiman admin API.

[![Build Status](https://travis-ci.org/bucharest-gold/apiman-admin-client.svg?branch=master)](https://travis-ci.org/bucharest-gold/apiman-admin-client)
[![Coverage Status](https://coveralls.io/repos/github/bucharest-gold/apiman-admin-client/badge.svg?branch=master)](https://coveralls.io/github/bucharest-gold/apiman-admin-client?branch=master)

This package provides a Node.js client for the [Apiman REST services][1].

> _Node.js 4, 5, 6_

## Contributing

Please read the [contributing guide](./CONTRIBUTING.md)

## Installation

    npm install apiman-admin-client -S

## Usage
    const apiman = require('apiman-admin-client');

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


## You can use to

* Verify the Apiman status.
* Import / export the Apiman configuration data.
* List, add, delete gateways.
* List all the permissions and permissions by user.
* List, add, delete plugins.
* List and delete roles.
* List and delete policy definitions.
* Get informations (APIs, Clients, etc..) about the current authenticated user.
* Update email and full name of the current authenticated user.
* Get, add, delete an organization. 
* Get informations (APIs, Clients, etc..) about specific user.
* Update email and full name for a specific user.

## API Documentation

http://bucharest-gold.github.io/apiman-admin-client/

If you have the github rights to do it, you can publish the API documentation by running
`./scripts/publish-docs.sh`. This script will generate the documentation, then clone this
repository into a temporary directory, checkout the `gh-pages` branch and update it with
the newly generated documentation.

[1]: http://www.apiman.io/latest/api-manager-restdocs.html