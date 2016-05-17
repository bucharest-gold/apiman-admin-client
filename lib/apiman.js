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

const util = require('./util');
const uris = require('./uris');
const system = require('./system');
const gateways = require('./gateways');
const permissions = require('./permissions');
const plugins = require('./plugins');
const roles = require('./roles');
const policyDefs = require('./policy-defs');
const currentUser = require('./current-user');

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
    return gateways(handleOptions(uris.GATEWAYS)).list();
  }

  /**
  * This function is used to create a new Gateway. 
  * 
  * @instance
  * @function createGateway
  * @returns {Promise} A promise that will resolve with the new Gateway created.
  */
  function createGateway() {
    return gateways(handleOptions(uris.GATEWAYS)).create();
  }
  
  /**
  * This function is used to remove a Gateway. 
  * 
  * @instance
  * @param {string} id - The ID of the Gateway.
  * @function removeGateway
  * @returns {Promise} A promise that will resolve with 204 No Content if the delete is successful.
  */
  function removeGateway(id) {
    return gateways(handleOptions(uris.GATEWAYS)).remove(id);
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
  * This function is used to remove a Plugin. 
  * 
  * @instance
  * @param {string} id - The ID of the Plugin.
  * @function removePlugin
  * @returns {Promise} A promise that will resolve with 204 No Content if the delete is successful.
  */
  function removePlugin(id) {
    return plugins(handleOptions(uris.PLUGINS)).remove(id);
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
  
  /**
  * Returns a list of the policy definitions currently defined in apiman.
  * 
  * @instance
  * @function listPolicyDefs
  * @returns {Promise} A promise that will resolve with the list of policy definitions.
  */
  function listPolicyDefs() {
    return policyDefs(handleOptions(uris.POLICY_DEFS)).list();
  }
  
  /**
  * Returns a list of all the organizations for which the 
  * current user has permission to edit APIs.
  * 
  * @instance
  * @function listCurrentUserAPIOrganizations
  * @returns {Promise} A promise that will resolve with the list of organizations.
  */
  function listCurrentUserAPIOrganizations() {
    return currentUser(handleOptions(uris.CURRENT_USER_APIORGS)).listAPIOrganizations();
  }
  
  /**
  * Returns a list of all of the APIs the current user has permission to edit.
  * 
  * @instance
  * @function listCurrentUserAPIs
  * @returns {Promise} A promise that will resolve with the list of APIs.
  */
  function listCurrentUserAPIs() {
    return currentUser(handleOptions(uris.CURRENT_USER_APIS)).listAPIs();
  }
  
  /**
  * Returns a list of all the organizations for which the current user 
  * has permission to edit clients.
  * 
  * @instance
  * @function listCurrentUserClientOrganizations
  * @returns {Promise} A promise that will resolve with the list of organizations.
  */
  function listCurrentUserClientOrganizations() {
    return currentUser(handleOptions(uris.CURRENT_USER_CLIENTORGS)).listClientOrganizations();
  }
  
  /**
  * Returns a list of all the organizations for which the current user 
  * has permission to edit clients.
  * 
  * @instance
  * @function listCurrentUserClients
  * @returns {Promise} A promise that will resolve with the list of organizations.
  */
  function listCurrentUserClients() {
    return currentUser(handleOptions(uris.CURRENT_USER_CLIENTS)).listClients();
  }
  
  /**
  * Gets information about the currently authenticated user. 
  * 
  * @instance
  * @function currentUserInfo
  * @returns {Promise} A promise that will resolve with the current user information.
  */
  function currentUserInfo() {
    return currentUser(handleOptions(uris.CURRENT_USER_INFO)).info();
  }
  
  /**
  * Returns a list of all the organizations for which the current user 
  * has permission to edit plans.
  * 
  * @instance
  * @function listCurrentUserPlanOrganizations
  * @returns {Promise} A promise that will resolve with the list of organizations.
  */
  function listCurrentUserPlanOrganizations() {
    return currentUser(handleOptions(uris.CURRENT_USER_PLANORGS)).listPlanOrganizations();
  }

  return Object.freeze({
    status,
    exportData,
    importData,
    listGateways,
    createGateway,
    removeGateway,
    listPermissions,
    listPlugins,
    removePlugin,
    listRoles,
    listPolicyDefs,
    listCurrentUserAPIOrganizations,
    listCurrentUserAPIs,
    listCurrentUserClientOrganizations,
    listCurrentUserClients,
    currentUserInfo,
    listCurrentUserPlanOrganizations,
  });

}