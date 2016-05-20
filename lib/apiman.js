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

const fs = require('fs');
const util = require('./util');
const requestHandler = require('./request-handler');
const uris = require('./uris');

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
  
  const get = () => requestHandler.get(options);
  
  const getById = (id) => {
    options.uri += id;
    return requestHandler.get(options);
  };
  
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
    handleOptions(uris.STATUS);
    return get();
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
    handleOptions(uris.EXPORT);
    return get();
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
    handleOptions(uris.IMPORT);
    options.body = fs.readFileSync(filePath, 'utf-8');
    options.json = false;
    options.headers.Accept = 'text/plain';
    return post();
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
    return get();
  }
  
  /**
  * Returns information about the Gateway. 
  *
  * @instance
  * @param {string} id - The ID of the Gateway.
  * @function gateway
  * @returns {Promise} A promise that will resolve with gateway.
  */
  function gateway(id) {
    handleOptions(uris.GATEWAYS);
    return getById(id);
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
    return get();
  }
  
  /**
  * Returns all permissions of specific user. 
  *
  * @instance
  * @param {string} id - The ID of the user.
  * @function permissionsUser
  * @returns {Promise} A promise that will resolve with user permissions.
  */
  function permissionsUser(id) {
    handleOptions(uris.PERMISSIONS);
    return getById(id);
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
    return get();
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
    return get();
  }
  
  /**
  * Returns information about the role. 
  *
  * @instance
  * @param {string} id - The ID of the role.
  * @function role
  * @returns {Promise} A promise that will resolve with role.
  */
  function role(id) {
    handleOptions(uris.ROLES);
    return getById(id);
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
    return get();
  }
  
  /**
  * This function is used to remove a policy definition. 
  * 
  * @instance
  * @param {string} id - The ID of the policy definition.
  * @function policyDefinitionDelete
  * @returns {Promise} A promise that will resolve with 204 No Content if the delete is successful.
  */
  function policyDefinitionDelete(id) {
    handleOptions(uris.POLICY_DEFINITIONS);
    return remove(id);
  }
  
  /**
  * Returns all the organizations with APIs for the current user.
  * 
  * @instance
  * @function currentUserAPIOrganizations
  * @returns {Promise} A promise that will resolve with organizations.
  */
  function currentUserAPIOrganizations() {
    handleOptions(uris.CURRENT_USER_APIORGS);
    return get();
  }
  
  /**
  * Returns all of the APIs the current user has permission to edit.
  * 
  * @instance
  * @function listCurrentUserAPIs
  * @returns {Promise} A promise that will resolve with current user APIs.
  */
  function currentUserAPIs() {
    handleOptions(uris.CURRENT_USER_APIS);
    return get();
  }
  
  /**
  * Returns all the organizations with clients for the current user 
  * has permission to edit clients.
  * 
  * @instance
  * @function currentUserClientOrganizations
  * @returns {Promise} A promise that will resolve with organizations.
  */
  function currentUserClientOrganizations() {
    handleOptions(uris.CURRENT_USER_CLIENTORGS);
    return get();
  }
  
  /**
  * Returnsall the clients for the current user 
  * has permission to edit clients.
  * 
  * @instance
  * @function currentUserClients
  * @returns {Promise} A promise that will resolve with current user clients.
  */
  function currentUserClients() {
    handleOptions(uris.CURRENT_USER_CLIENTS);
    return get();
  }
  
  /**
  * Returns information about the currently authenticated user. 
  * 
  * @instance
  * @function currentUserInfo
  * @returns {Promise} A promise that will resolve with the current user information.
  */
  function currentUserInfo() {
    handleOptions(uris.CURRENT_USER_INFO);
    return get();
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
    handleOptions(uris.CURRENT_USER_INFO);
    options.body = { email: email, fullName: fullName };
    return requestHandler.put(options);
  }
  
  /**
  * Returns all the organizations for which the current user 
  * has permission to edit plans.
  * 
  * @instance
  * @function currentUserPlanOrganizations
  * @returns {Promise} A promise that will resolve with the list of organizations.
  */
  function currentUserPlanOrganizations() {
    handleOptions(uris.CURRENT_USER_PLANORGS);
    return get();
  }
  
  /**
  * Returns information about the organization. 
  *
  * @instance
  * @param {string} id - The ID of the organization.
  * @function organization
  * @returns {Promise} A promise that will resolve with organization.
  */
  function organization(id) {
    handleOptions(uris.ORGANIZATIONS);
    return getById(id);
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
    gateway,
    gateways,
    gatewayAdd,
    gatewayDelete,
    permissions,
    permissionsUser,
    plugins,
    pluginDelete,
    role,
    roles,
    roleDelete,
    policyDefinitions,
    policyDefinitionDelete,
    currentUserAPIOrganizations,
    currentUserAPIs,
    currentUserClientOrganizations,
    currentUserClients,
    currentUserInfo,
    currentUserUpdate,
    currentUserPlanOrganizations,
    organization,
    organizationDelete,
  });

}