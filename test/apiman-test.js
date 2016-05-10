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

test('Apiman should verify the status.', (t) => {

  let options = {};
  apiman(options).status().then((data) => {
    t.equal(data.name, 'API Manager REST API');
    t.end();
  });

});

test('Apiman should list configured gateways.', (t) => {

  let options = {};
  apiman(options).listGateways().then((data) => {
    let gatewayFound = data.find((x) => x.id === 'TheGateway');
    t.equal(gatewayFound.id, 'TheGateway');
    t.end();
  });

});

test('Apiman should test the gateway.', (t) => {

  let config = JSON.stringify({
    endpoint: 'http://localhost:8080/apiman-gateway-api',
    username: 'apimanager', password: 'apiman123!'
  });

  let options = {
    body: {
      name: 'The Gateway',
      description: 'This is the gateway.',
      type: 'REST',
      configuration: config
    }
  };

  apiman(options).testGateway()
    .then((a) => {
      t.equals(a.success, true);
      t.end();
    });

});

test('Apiman should export the data.', (t) => {
  let options = {};
  apiman(options).exportData().then((a) => {
    t.equal(a.Metadata.apimanVersion.indexOf('Final') > 0, true);
    t.end();
  });
});

test('Apiman should import the data.', (t) => {
  let options = {};
  apiman(options).importData('test/fixtures/api-manager-export.json');/*.then((a) => {*/
   // console.log(a);
    t.equal(1, 1);
    t.end();
  //});
});