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
    }).catch(e => console.log(e));

});

test('The client should verify the status.', (t) => {

  apiman({}).status()
    .then(x => {
      t.equal(x.name, 'API Manager REST API');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should return configured gateways.', (t) => {

  apiman({}).gateways()
    .then(x => {
      let gatewayFound = x.find(x => x.id === 'TheGateway');
      t.equal(gatewayFound.id, 'TheGateway');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should return one gateway.', (t) => {

  apiman({}).gateway('TheGateway')
    .then(x => {
      t.equal(x.id, 'TheGateway');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should add a gateway.', (t) => {

  let configuration = JSON.stringify({
    endpoint: 'http://localhost:8080/apiman-gateway-api-new',
    username: 'foo',
    password: 'bar'
  });

  let gw = {
    name: 'The New Gateway3',
    description: 'This is the new gateway.',
    type: 'REST',
    configuration: configuration
  };

  apiman({}).gatewayAdd(gw)
    .then(x => {
      t.equals(x.name, gw.name);
      t.end();
    }).catch(e => console.log(e));

});

test('The client should export the data.', (t) => {

  apiman({}).exportData()
    .then(x => {
      t.equal(x.Metadata.apimanVersion.indexOf('Final') > 0, true);
      t.end();
    }).catch(e => console.log(e));
});

test('The client should return permissions.', (t) => {

  apiman({}).permissions()
    .then(x => {
      t.equal(x.userId, 'admin');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should return permissions of the user.', (t) => {

  apiman({}).permissionsUser('admin')
    .then(x => {
      let permissionFound = x.permissions.find(x => x.name === 'apiAdmin');
      t.equal(permissionFound.name, 'apiAdmin');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should return one plugin.', (t) => {

  apiman({}).plugin(1)
    .then(x => {
      t.equal(x.id, 1);
      t.end();
    }).catch(e => console.log(e));

});

test('The client should add one plugin.', (t) => {

  let plug = {
    type: 'war',
    version: '1.2.6.Final',
    groupId: 'io.apiman.plugins',
    artifactId: 'apiman-plugins-log-policy'
  };

  apiman({}).pluginAdd(plug)
    .then(x => {
      t.equal(x.artifactId, 'apiman-plugins-log-policy');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should return plugins.', (t) => {

  apiman({}).plugins()
    .then(x => {
      let pluginFound = x.find(x => x.name === 'Transformation Policy Plugin');
      t.equal(pluginFound.name, 'Transformation Policy Plugin');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should return available plugins.', (t) => {

  apiman({}).availablePlugins()
    .then(x => {
      let availablePluginFound = x.find(x => x.artifactId === 'apiman-plugins-cors-policy');
      t.equal(availablePluginFound.artifactId, 'apiman-plugins-cors-policy');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should return roles.', (t) => {

  apiman({}).roles()
    .then(x => {
      let roleFound = x.find(x => x.id === 'APIDeveloper');
      t.equal(roleFound.id, 'APIDeveloper');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should return one role.', (t) => {

  apiman({}).role('ClientAppDeveloper')
    .then(x => {
      t.equal(x.id, 'ClientAppDeveloper');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should return one policy definition.', (t) => {

  apiman({}).policyDefinition('AuthorizationPolicy')
    .then(x => {
      t.equal(x.id, 'AuthorizationPolicy');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should return policy definitions.', (t) => {

  apiman({}).policyDefinitions()
    .then(x => {
      let policyFound = x.find((x) => x.id === 'AuthorizationPolicy');
      t.equal(policyFound.id, 'AuthorizationPolicy');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should return current user API organizations.', (t) => {

  apiman({}).currentUserAPIOrganizations()
    .then(x => {
      let organizationFound = x.find(x => x.id === 'bucharest-gold');
      t.equal(organizationFound.id, 'bucharest-gold');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should return current user APIs.', (t) => {

  apiman({}).currentUserAPIs()
    .then(x => {
      let apiFound = x.find(x => x.id === 'testAPI');
      t.equal(apiFound.id, 'testAPI');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should return current user client organizations.', (t) => {

  apiman({}).currentUserClientOrganizations()
    .then(x => {
      let organizationFound = x.find(x => x.id === 'bucharest-gold');
      t.equal(organizationFound.id, 'bucharest-gold');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should return current user clients.', (t) => {

  apiman({}).currentUserClients()
    .then(x => {
      let clientAppFound = x.find(x => x.id === 'bucharest-gold-client-app');
      t.equal(clientAppFound.id, 'bucharest-gold-client-app');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should get informations about current user.', (t) => {

  apiman({}).currentUserInfo()
    .then(x => {
      t.equal(x.username, 'admin');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should update informations about current user.', (t) => {

  apiman({}).currentUserUpdate('admin2@example.org', 'The super admin.')
    .then(x => {
      t.equal(x, 204);
      t.end();
    }).catch(e => console.log(e));

});

test('The client should return current user organizations able to edit plans.', (t) => {

  apiman({}).currentUserPlanOrganizations()
    .then(x => {
      let organizationFound = x.find(x => x.id === 'bucharest-gold');
      t.equal(organizationFound.id, 'bucharest-gold');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should return one organization.', (t) => {

  apiman({}).organization('bucharest-gold')
    .then(x => {
      t.equal(x.id, 'bucharest-gold');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should create one organization.', (t) => {

  apiman({}).organizationAdd('bucharest-gold2', 'the super org.')
    .then(x => {
      t.equal(x.name, 'bucharest-gold2');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should return one user.', (t) => {

  apiman({}).user('admin')
    .then(x => {
      t.equal(x.username, 'admin');
      t.end();
    }).catch(e => console.log(e));

});

test('The client should remove one gateway.', (t) => {

  apiman({}).gatewayDelete('TheNewGateway3')
    .then(x => {
      t.equal(x, 204);
      t.end();
      console.log('Gateway removed.');
    }).catch(e => console.log(e));

});

test('The client should remove one plugin.', (t) => {

  apiman({}).pluginDelete(1)
    .then(x => {
      t.equal(x, 204);
      t.end();
      console.log('Plugin removed.');
    }).catch(e => console.log(e));

});

test('The client should remove one organization.', (t) => {

  apiman({}).organizationDelete('bucharest-gold')
    .then(x => {
      t.equal(x, 204);
      t.end();
      console.log('Organization removed.');
    }).catch(e => console.log(e));

});

test('The client should remove one role.', (t) => {

  apiman({}).roleDelete('APIDeveloper')
    .then(x => {
      t.equal(x, 204);
      t.end();
      console.log('Role removed.');
    }).catch(e => console.log(e));

});

test('The client should remove one policy definition.', (t) => {

  apiman({}).policyDefinitionDelete('AuthorizationPolicy')
    .then(x => {
      t.equal(x, 204);
      t.end();
      console.log('Policy definition removed.');
    }).catch(e => console.log(e));

});

test('teardown', t => {

  console.log('done.');
  t.end();

});