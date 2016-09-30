/**
 * Copyright 2016 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
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
const apiman = require('../index');

function getOptions () {
  const options = {
    'baseUrl': 'http://localhost:8080',
    'username': 'admin',
    'password': 'admin123!'
  };
  return options;
}

test('setup', t => {
  apiman.importData(getOptions(), require('path').join(__dirname, '/fixtures/api-manager-export.json'))
    .then(x => {
      t.equals(x.body.includes('successfully'), true);
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should verify the status.', t => {
  apiman.status(getOptions())
    .then(x => {
      t.equal(JSON.parse(x.body).name, 'API Manager REST API');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return configured gateways.', t => {
  apiman.gateways(getOptions())
    .then(x => {
      x = JSON.parse(x.body);
      let gatewayFound = x.find(x => x.id === 'TheGateway');
      t.equal(gatewayFound.id, 'TheGateway');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return one gateway.', t => {
  apiman.gateway(getOptions(), 'TheGateway')
    .then(x => {
      t.equal(JSON.parse(x.body).id, 'TheGateway');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should add a gateway.', t => {
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

  apiman.gatewayAdd(getOptions(), gw)
    .then(x => {
      t.equals(x.statusCode, 200);
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should export the data.', t => {
  apiman.exportData(getOptions())
    .then(x => {
      t.equal(x.body.toString().includes('Final'), true);
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return permissions.', t => {
  apiman.permissions(getOptions())
    .then(x => {
      t.equal(JSON.parse(x.body).userId, 'admin');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return permissions of the user.', t => {
  apiman.permissionsUser(getOptions(), 'admin')
    .then(x => {
      const permissionFound = JSON.parse(x.body).permissions.find(x => x.name === 'apiAdmin');
      t.equal(permissionFound.name, 'apiAdmin');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return one plugin.', t => {
  apiman.plugin(getOptions(), 999)
    .then(x => {
      t.equal(JSON.parse(x.body).id, 999);
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should add one plugin.', t => {
  const plug = {
    type: 'war',
    version: '1.2.6.Final',
    groupId: 'io.apiman.plugins',
    artifactId: 'apiman-plugins-log-policy'
  };

  apiman.pluginAdd(getOptions(), plug)
    .then(x => {
      t.equal(x.statusCode, 200);
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return plugins.', t => {
  apiman.plugins(getOptions())
    .then(x => {
      const pluginFound = JSON.parse(x.body).find(x => x.name === 'Transformation Policy Plugin');
      t.equal(pluginFound.name, 'Transformation Policy Plugin');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return available plugins.', t => {
  apiman.availablePlugins(getOptions())
    .then(x => {
      const availablePluginFound = JSON.parse(x.body).find(x => x.artifactId === 'apiman-plugins-cors-policy');
      t.equal(availablePluginFound.artifactId, 'apiman-plugins-cors-policy');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return roles.', t => {
  apiman.roles(getOptions())
    .then(x => {
      const roleFound = JSON.parse(x.body).find(x => x.id === 'APIDeveloper');
      t.equal(roleFound.id, 'APIDeveloper');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return one role.', t => {
  apiman.role(getOptions(), 'ClientAppDeveloper')
    .then(x => {
      t.equal(JSON.parse(x.body).id, 'ClientAppDeveloper');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return one policy definition.', t => {
  apiman.policyDefinition(getOptions(), 'AuthorizationPolicy')
    .then(x => {
      t.equal(JSON.parse(x.body).id, 'AuthorizationPolicy');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return policy definitions.', t => {
  apiman.policyDefinitions(getOptions())
    .then(x => {
      const policyFound = JSON.parse(x.body).find((x) => x.id === 'AuthorizationPolicy');
      t.equal(policyFound.id, 'AuthorizationPolicy');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return current user API organizations.', t => {
  apiman.currentUserAPIOrganizations(getOptions())
    .then(x => {
      const organizationFound = JSON.parse(x.body).find(x => x.id === 'bucharest-gold');
      t.equal(organizationFound.id, 'bucharest-gold');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return current user APIs.', t => {
  apiman.currentUserAPIs(getOptions())
    .then(x => {
      const apiFound = JSON.parse(x.body).find(x => x.id === 'testAPI');
      t.equal(apiFound.id, 'testAPI');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return current user client organizations.', t => {
  apiman.currentUserClientOrganizations(getOptions())
    .then(x => {
      const organizationFound = JSON.parse(x.body).find(x => x.id === 'bucharest-gold');
      t.equal(organizationFound.id, 'bucharest-gold');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return current user clients.', t => {
  apiman.currentUserClients(getOptions())
    .then(x => {
      const clientAppFound = JSON.parse(x.body).find(x => x.id === 'bucharest-gold-client-app');
      t.equal(clientAppFound.id, 'bucharest-gold-client-app');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should get informations about current user.', t => {
  apiman.currentUserInfo(getOptions())
    .then(x => {
      t.equal(JSON.parse(x.body).username, 'admin');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should update informations about current user.', t => {
  apiman.currentUserUpdate(getOptions(), 'admin2@example.org', 'The super admin.')
    .then(x => {
      t.equal(x.statusCode, 204);
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return current user organizations able to edit plans.', t => {
  apiman.currentUserPlanOrganizations(getOptions())
    .then(x => {
      const organizationFound = JSON.parse(x.body).find(x => x.id === 'bucharest-gold');
      t.equal(organizationFound.id, 'bucharest-gold');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return one organization.', t => {
  apiman.organization(getOptions(), 'bucharest-gold')
    .then(x => {
      t.equal(JSON.parse(x.body).id, 'bucharest-gold');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should create one organization.', t => {
  apiman.organizationAdd(getOptions(), 'bucharest-gold2', 'the super org.')
    .then(x => {
      t.equal(JSON.parse(x.body).name, 'bucharest-gold2');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return one user.', t => {
  apiman.user(getOptions(), 'admin')
    .then(x => {
      t.equal(JSON.parse(x.body).username, 'admin');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should update informations about user.', t => {
  apiman.userUpdate(getOptions(), 'admin', 'admin3@example.org', 'The super admin again.')
    .then(x => {
      t.equal(x.statusCode, 204);
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return user APIs.', t => {
  apiman.userAPIs(getOptions(), 'admin')
    .then(x => {
      const apiFound = JSON.parse(x.body).find(x => x.id === 'testAPI');
      t.equal(apiFound.id, 'testAPI');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return user organizations.', t => {
  apiman.userOrganizations(getOptions(), 'admin')
    .then(x => {
      const organizationFound = JSON.parse(x.body).find(x => x.id === 'bucharest-gold');
      t.equal(organizationFound.id, 'bucharest-gold');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should return user clients.', t => {
  apiman.userClients(getOptions(), 'admin')
    .then(x => {
      const clientAppFound = JSON.parse(x.body).find(x => x.id === 'bucharest-gold-client-app');
      t.equal(clientAppFound.id, 'bucharest-gold-client-app');
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should remove one gateway.', t => {
  apiman.gatewayDelete(getOptions(), 'TheNewGateway3')
    .then(x => {
      t.equal(x.statusCode, 204);
      t.end();
      console.log('Gateway removed.');
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should remove one plugin.', t => {
  apiman.pluginDelete(getOptions(), 999)
    .then(x => {
      t.equal(x.statusCode, 204);
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should remove one organization.', t => {
  apiman.organizationDelete(getOptions(), 'bucharest-gold')
    .then(x => {
      t.equal(x.statusCode, 204);
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should remove one role.', t => {
  apiman.roleDelete(getOptions(), 'APIDeveloper')
    .then(x => {
      t.equal(x.statusCode, 204);
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});

test('Should remove one policy definition.', t => {
  apiman.policyDefinitionDelete(getOptions(), 'AuthorizationPolicy')
    .then(x => {
      t.equal(x.statusCode, 204);
      t.end();
    }).catch(e => {
      console.error(e.stack);
      t.fail(e);
    });
});
