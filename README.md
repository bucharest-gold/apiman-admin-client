# apiman-admin-client

[![Build Status](https://travis-ci.org/bucharest-gold/apiman-admin-client.svg?branch=master)](https://travis-ci.org/bucharest-gold/apiman-admin-client)

Node.js client for the Apiman admin API.

This package provides a Node.js client for the [Apiman REST services][1].
It is experimental and still a work in progress.

N.B. This module uses ES6 language features, and as such depends on Node.js version 5.x
or higher.

    npm install apiman-admin-client -S

## Usage
    const apiman = require('apiman-admin-client');

    const options = {
      baseUrl: 'http://localhost:8080',
      username: 'yourAdminUsername',
      password: 'yourAdminPassword'
    };

    apiman(options)
    .status()
    .then(s => console.log(s.name));
    
    // Apiman default user / password 
    apiman({ baseUrl: 'http://host:port' })
    .gateways()
    .then(g => console.log(g));
    
    // All defaults
    apiman({}).plugins().then((p) => console.log(p));

## Currently you can use to

* Verify the Apiman status.
* Import / export all the Apiman configuration data.
* List, add and delete gateways.
* List all the permissions and permissions by user.
* List and delete plugins.
* List and delete roles.
* List all policy definitions.
* Get informations (APIs, Clients, etc..) about the current authenticated user.
* Update email and full name of the current authenticated user.
* Delete an organization. 

## API Documentation

http://bucharest-gold.github.io/apiman-admin-client/

If you have the github rights to do it, you can publish the API documentation by running
`./build/publish-docs.sh`. This script will generate the documentation, then clone this
repository into a temporary directory, checkout the `gh-pages` branch and update it with
the newly generated documentation.

## Development & Testing

To run the tests, you'll need to have docker installed and a Apiman server running using the 
Apiman docker image. Just run`./build/start-server.sh`. This script will download and start the docker
image.

Then just run the tests.

    make test

To stop the server, run `./build/stop-server.sh`.

[1]: http://www.apiman.io/latest/api-manager-restdocs.html