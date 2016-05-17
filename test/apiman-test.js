/**
 * Copyright 2016 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. 
 */

'use strict';

const test = require('tape');
const apiman = require('../lib/apiman');

test('setup', (t) => {
  
  apiman({})
    .importData(__dirname + '/fixtures/api-manager-export.json')
    .then(x => {
      t.equals(x.indexOf('Data import completed successfully!') > 0, true);
      t.end();
    })
    .catch(e => console.log(e));
  
});

test('Apiman should verify the status.', (t) => {

  apiman({}).status().then(x => {
    t.equal(x.name, 'API Manager REST API');
    t.end();
  });

});

test('Apiman should list configured gateways.', (t) => {

  apiman({}).listGateways().then(x => {
    let gatewayFound = x.find(x => x.id === 'TheGateway');
    t.equal(gatewayFound.id, 'TheGateway');
    t.end();
  });

});

test('Apiman should create a gateway.', (t) => {

  let config = JSON.stringify({
    endpoint: 'http://localhost:8080/apiman-gateway-api-new',
    username: 'foo', password: 'bar'
  });

  let options = {
    body: {
      name: 'The New Gateway3',
      description: 'This is the new gateway.',
      type: 'REST',
      configuration: config
    }
  };

  apiman(options).createGateway()
    .then(x => {
      t.equals(x.name, options.body.name);
      t.end();
    }).catch(e => console.log(e));

});

test('Apiman should export the data.', (t) => {
  
  apiman({}).exportData().then(x => {
    t.equal(x.Metadata.apimanVersion.indexOf('Final') > 0, true);
    t.end();
  });
});

test('Apiman should list permissions.', (t) => {

  apiman({}).listPermissions().then(x => {
    t.equal(x.userId, 'admin');
    t.end();
  });

});

test('Apiman should list plugins.', (t) => {

  apiman({}).listPlugins().then(x => {
    let pluginFound = x.find(x => x.name === 'Transformation Policy Plugin');
    t.equal(pluginFound.name, 'Transformation Policy Plugin');
    t.end();
  });

});

test('Apiman should list roles.', (t) => {

  apiman({}).listRoles().then(x => {
    let roleFound = x.find(x => x.id === 'APIDeveloper');
    t.equal(roleFound.id, 'APIDeveloper');
    t.end();
  });

});

test('Apiman should list policy definitions.', (t) => {

  apiman({}).listPolicyDefs().then(x => {
    let policyFound = x.find((x) => x.id === 'AuthorizationPolicy');
    t.equal(policyFound.id, 'AuthorizationPolicy');
    t.end();
  });

});

test('Apiman should list current user API organizations.', (t) => {

  // https://github.com/bucharest-gold/apiman-admin-client/issues/5
  apiman({}).listCurrentUserAPIOrganizations().then(x => {
    console.log(x);
    t.end();
  });

});

test('Apiman should list current user APIs.', (t) => {
  apiman({}).listCurrentUserAPIs().then(x => {
    console.log(x);
    t.end();
  });

});

test('Apiman should list current user client organizations.', (t) => {

  apiman({}).listCurrentUserClientOrganizations().then(x => {
    console.log(x);
    t.end();
  });

});

test('Apiman should list current user clients.', (t) => {

  apiman({}).listCurrentUserClients().then(x => {
    console.log(x);
    t.end();
  });

});

test('Apiman should get informations about current user.', (t) => {

  apiman({}).currentUserInfo().then(x => {
    t.equal(x.username, 'admin');
    t.end();
  });

});

test('Apiman should list current user organizations able to edit plans.', (t) => {

  apiman({}).listCurrentUserPlanOrganizations().then(x => {
    console.log(x);
    t.end();
  });

});

test('teardown', t => {
  console.log('done.');
  t.end();
});