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

const request = require('request');
const util = require('./util');
const system = require('./system');
const gateway = require('./gateway');

function apiman(options) {
  
  function handleOptions(path) {
    options = util.handleOptions(options);
    options.uri = path;
    return options;
  }

  function status() {
    handleOptions('/apiman/system/status/');
    return system(options).status();
  }
  
  function exportData() {
    handleOptions('/apiman/system/export/');
    return system(options).exportData();
  }
  
  function importData(filePath) {
    handleOptions('/apiman/system/import/');
    return system(options).importData(filePath);
  }
  
  function listGateways() {
    handleOptions('/apiman/gateways/');
    return gateway(options).list();
  }
  
  function testGateway() {
    handleOptions('/apiman/gateways/');
    return gateway(options).test();
  }
  
  return Object.freeze({
    status,
    exportData,
    importData,
    listGateways,
    testGateway
  });

}

module.exports = apiman;