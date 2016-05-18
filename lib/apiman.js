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
const requestHandler = require('./request-handler');
const uris = require('./uris');
const system = require('./system');
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

  const handleOptions = (uri) => {
    options = util.handleOptions(options);
    options.uri = uri;
    return options;
  };
  
  const all = () => requestHandler.get(options);
  
  const post = () => requestHandler.post(options);
  
  const remove = (id) => {
    options.uri += id;
    return requestHandler.remove(options);
  };
  
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
  * Returns all the Gateways that have been configured. 
  *
  * @instance
  * @function gateways
  * @returns {Promise} A promise that will resolve with gateways.
  */
  function gateways() {
    handleOptions(uris.GATEWAYS);
    return all();
  }

  /**
  * This function is used to create a new Gateway. 
  * 
  * @instance
  * @function gatewayAdd
  * @returns {Promise} A promise that will resolve with the new Gateway created.
  */
  function gatewayAdd() {
    handleOptions(uris.GATEWAYS);
    return post();
  }
  
  /**
  * This function is used to remove a Gateway. 
  * 
  * @instance
  * @param {string} id - The ID of the Gateway.
  * @function gatewayDelete
  * @returns {Promise} A promise that will resolve with 204 No Content if the delete is successful.
  */
  function gatewayDelete(id) {
    handleOptions(uris.GATEWAYS);
    return remove(id);
  }

  /**
  * Returns all of the permissions assigned to the currently authenticated user.
  * 
  * @instance
  * @function permissions
  * @returns {Promise} A promise that will resolve with permissions.
  */
  function permissions() {
    handleOptions(uris.PERMISSIONS);
    return all();
  }
  
  /**
  * Returns all plugins that have been added to the system.
  * 
  * @instance
  * @function plugins
  * @returns {Promise} A promise that will resolve with plugins.
  */
  function plugins() {
    handleOptions(uris.PLUGINS);
    return all();
  }
  
  /**
  * This function is used to remove a Plugin. 
  * 
  * @instance
  * @param {string} id - The ID of the Plugin.
  * @function pluginDelete
  * @returns {Promise} A promise that will resolve with 204 No Content if the delete is successful.
  */
  function pluginDelete(id) {
    handleOptions(uris.PLUGINS);
    return remove(id);
  }
  
  /**
  * Returns all the roles currently defined in apiman.
  * 
  * @instance
  * @function roles
  * @returns {Promise} A promise that will resolve with roles.
  */
  function roles() {
    handleOptions(uris.ROLES);
    return all();
  }
  
  /**
  * This function is used to remove a Role. 
  * 
  * @instance
  * @param {string} id - The ID of the Role.
  * @function roleDelete
  * @returns {Promise} A promise that will resolve with 204 No Content if the delete is successful.
  */
  function roleDelete(id) {
    handleOptions(uris.ROLES);
    return remove(id);
  }
  
  /**
  * Returns all the policy definitions currently defined in apiman.
  * 
  * @instance
  * @function policyDefinitions
  * @returns {Promise} A promise that will resolve with policy definitions.
  */
  function policyDefinitions() {
    handleOptions(uris.POLICY_DEFINITIONS);
    return all();
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
  * Updates information about the currently authenticated user. 
  * 
  * @instance
  * @param {string} email - User's email.
  * @param {string} fullName - User's full name.
  * @function currentUserUpdate
  * @returns {Promise} A promise that will resolve with 204 No Content if the update is successful.
  */
  function currentUserUpdate(email, fullName) {
    return currentUser(handleOptions(uris.CURRENT_USER_INFO)).update(email, fullName);
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
  
  /**
  * This function is used to remove a Organization. 
  * 
  * @instance
  * @param {string} id - The ID of the Organization.
  * @function organizationDelete
  * @returns {Promise} A promise that will resolve with 204 No Content if the delete is successful.
  */
  function organizationDelete(id) {
    handleOptions(uris.ORGANIZATIONS);
    return remove(id);
  }

  return Object.freeze({
    status,
    exportData,
    importData,
    gateways,
    gatewayAdd,
    gatewayDelete,
    permissions,
    plugins,
    pluginDelete,
    roles,
    roleDelete,
    policyDefinitions,
    listCurrentUserAPIOrganizations,
    listCurrentUserAPIs,
    listCurrentUserClientOrganizations,
    listCurrentUserClients,
    currentUserInfo,
    currentUserUpdate,
    listCurrentUserPlanOrganizations,
    organizationDelete,
  });

}