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
const uris = require('./uris');
const system = require('./system');
const gateway = require('./gateway');
const permissions = require('./permissions');
const plugins = require('./plugins');
const roles = require('./roles');

/** @module */
module.exports = apiman;

/**
 * Initializes the apiman client.
 * 
 * @instance
 * @param {object} options - Request options.
 * @param {string} options.baseUrl - The Base url, e.g. http://localhost:8080
 * @param {string} options.username - The Apiman admin username.
 * @param {string} options.password - The Apiman admin password.
 */
function apiman(options) {

  function handleOptions(path) {
    options = util.handleOptions(options);
    options.uri = path;
    return options;
  }

  /**
  * Returns the status of the apiman system. 
  * This is useful to use when testing a client's connection 
  * to the apiman API Manager REST services.
  *
  * @instance
  * @function status
  * @returns {Promise} A promise that will resolve with the status information.
  */
  function status() {
    return system(handleOptions(uris.STATUS)).status();
  }

  /**
   * Exports the data from the API Manager as JSON. All data in the API Manager, 
   * including global/admin information, will be exported.
   *
   * @instance
   * @function exportData
   * @returns {Promise} A promise that will resolve with the exported JSON data.
   */
  function exportData() {
    return system(handleOptions(uris.EXPORT)).exportData();
  }

  /**
  * Imports the backup settings into the API Manager.
  *
  * @instance
  * @function importData
  * @param {string} filePath - The full path of settings file.
  * @returns {Promise} A promise that will resolve with the output messages of the imported configurations.
  */
  function importData(filePath) {
    return system(handleOptions(uris.IMPORT)).importData(filePath);
  }

  /**
  * Returns a list of all the Gateways that have been configured. 
  *
  * @instance
  * @function listGateways
  * @returns {Promise} A promise that will resolve with the list of gateways.
  */
  function listGateways() {
    return gateway(handleOptions(uris.GATEWAYS)).list();
  }

  /**
  * This function is used to test the Gateway's settings prior to either creating or updating it. 
  * 
  * @instance
  * @function testGateway
  * @returns {Promise} A promise that will resolve with the result of testing the Gateway settings.
  */
  function testGateway() {
    return gateway(handleOptions(uris.GATEWAYS)).test();
  }

  /**
  * This function is used to create a new Gateway. 
  * 
  * @instance
  * @function createGateway
  * @returns {Promise} A promise that will resolve with the new Gateway created.
  */
  function createGateway() {
    return gateway(handleOptions(uris.GATEWAYS)).create();
  }

  /**
  * Returns all of the permissions assigned to the currently authenticated user.
  * 
  * @instance
  * @function listPermissions
  * @returns {Promise} A promise that will resolve with the list of permissions.
  */
  function listPermissions() {
    return permissions(handleOptions(uris.PERMISSIONS)).list();
  }
  
  /**
  * Returns a list of all plugins that have been added to the system.
  * 
  * @instance
  * @function listPlugins
  * @returns {Promise} A promise that will resolve with the list of plugins.
  */
  function listPlugins() {
    return plugins(handleOptions(uris.PLUGINS)).list();
  }
  
  /**
  * Returns a list of the roles currently defined in apiman.
  * 
  * @instance
  * @function listRoles
  * @returns {Promise} A promise that will resolve with the list of roles.
  */
  function listRoles() {
    return roles(handleOptions(uris.ROLES)).list();
  }

  return Object.freeze({
    status,
    exportData,
    importData,
    listGateways,
    testGateway,
    createGateway,
    listPermissions,
    listPlugins,
    listRoles,
  });

}