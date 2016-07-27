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

module.exports = exports = {
  availablePlugins: availablePlugins,
  currentUserAPIOrganizations: currentUserAPIOrganizations,
  currentUserAPIs: currentUserAPIs,
  currentUserClientOrganizations: currentUserClientOrganizations,
  currentUserClients: currentUserClients,
  currentUserInfo: currentUserInfo,
  currentUserPlanOrganizations: currentUserPlanOrganizations,
  // currentUserUpdate: currentUserUpdate,
  exportData: exportData,
  gateway: gateway,
  gatewayAdd: gatewayAdd,
  gatewayDelete: gatewayDelete,
  gateways: gateways,
  importData: importData,
  organization: organization,
  // organizationAdd: organizationAdd,
  organizationDelete: organizationDelete,
  permissions: permissions,
  permissionsUser: permissionsUser,
  plugin: plugin,
  pluginAdd: pluginAdd,
  pluginDelete: pluginDelete,
  plugins: plugins,
  policyDefinition: policyDefinition,
  policyDefinitionDelete: policyDefinitionDelete,
  policyDefinitions: policyDefinitions,
  role: role,
  roleDelete: roleDelete,
  roles: roles,
  status: status,
  user: user,
  userAPIs: userAPIs,
  userClients: userClients,
  userOrganizations: userOrganizations
  // userUpdate: userUpdate
};

// const fs = require('fs');
// const util = require('./util');
// const requestHandler = require('./request-handler')
const roi = require('roi');
const uris = require('./uris');

// /**
//  * Initializes the apiman client.
//  *
//  * @instance
//  * @param {object} options - Request options.
//  * @param {string} options.baseUrl - The Base url, e.g. http://localhost:8080
//  * @param {string} options.username - The Apiman admin username.
//  * @param {string} options.password - The Apiman admin password.
//  */
// function apiman (options) {
//   const handleOptions = (uri) => {
//     options = util.handleOptions(options)
//     options.uri = uri
//     return options
//   }

//   const get = () => requestHandler.get(options)

//   const getById = (id) => {
//     options.uri += id
//     return requestHandler.get(options)
//   }

//   const post = () => requestHandler.post(options)

//   const remove = (id) => {
//     options.uri += id
//     return requestHandler.remove(options)
//   }

/**
* Returns the status of the apiman system.
* This is useful to use when testing a client's connection
* to the apiman API Manager REST services.
*
* @instance
* @function status
* @returns {Promise} A promise that will resolve with the status information.
*/
function status (options) {
  options.endpoint = options.baseUrl + uris.STATUS;
  return roi.get(options);
}

/**
 * Exports the data from the API Manager as JSON. All data in the API Manager,
 * including global/admin information, will be exported.
 *
 * @instance
 * @function exportData
 * @returns {Promise} A promise that will resolve with the exported JSON data.
 */
function exportData (options) {
  options.endpoint = options.baseUrl + uris.EXPORT;
  return roi.get(options);
}

/**
* Imports the backup settings into the API Manager.
*
* @instance
* @function importData
* @param {string} filePath - The full path of settings file.
* @returns {Promise} A promise that will resolve with the output messages of the imported configurations.
*/
function importData (options, filePath) {
  options.endpoint = options.baseUrl + uris.IMPORT;
  // options.body = fs.readFileSync(filePath, 'utf-8');
  // options.json = false;
  options.headers = {};
  options.headers.Accept = 'text/plain';
  console.log(filePath);
  return roi.upload(options, filePath);
}

/**
* Returns all the Gateways that have been configured.
*
* @instance
* @function gateways
* @returns {Promise} A promise that will resolve with gateways.
*/
function gateways (options) {
  options.endpoint = options.baseUrl + uris.GATEWAYS;
  return roi.get(options);
}

/**
* Returns information about the Gateway.
*
* @instance
* @param {string} id - The ID of the Gateway.
* @function gateway
* @returns {Promise} A promise that will resolve with gateway.
*/
function gateway (options, id) {
  options.endpoint = options.baseUrl + uris.GATEWAYS + id;
  return roi.get(options);
}

/**
* This function is used to create a new Gateway.
*
* @instance
* @param {object} gatewayRepresentation - An object representing the gateway.
* @function gatewayAdd
* @returns {Promise} A promise that will resolve with the new gateway created.
*/
function gatewayAdd (options, gatewayRepresentation) {
  options.endpoint = options.baseUrl + uris.GATEWAYS;
  return roi.post(options, gatewayRepresentation);
}

/**
* This function is used to remove a Gateway.
*
* @instance
* @param {string} id - The ID of the Gateway.
* @function gatewayDelete
* @returns {Promise} A promise that will resolve with 204 No Content if the delete is successful.
*/
function gatewayDelete (options, id) {
  options.endpoint = options.baseUrl + uris.GATEWAYS + id;
  return roi.del(options);
}

/**
* Returns all of the permissions assigned to the current authenticated user.
*
* @instance
* @function permissions
* @returns {Promise} A promise that will resolve with permissions.
*/
function permissions (options) {
  options.endpoint = options.baseUrl + uris.PERMISSIONS;
  return roi.get(options);
}

/**
* Returns all permissions of specific user.
*
* @instance
* @param {string} id - The ID of the user.
* @function permissionsUser
* @returns {Promise} A promise that will resolve with user permissions.
*/
function permissionsUser (options, id) {
  options.endpoint = options.baseUrl + uris.PERMISSIONS + id;
  return roi.get(options);
}

/**
* Returns information about the Plugin.
*
* @instance
* @param {string} id - The ID of the Plugin.
* @function plugin
* @returns {Promise} A promise that will resolve with plugin.
*/
function plugin (options, id) {
  options.endpoint = options.baseUrl + uris.PLUGINS + id;
  return roi.get(options);
}

/**
* Returns all plugins that have been added to the system.
*
* @instance
* @function plugins
* @returns {Promise} A promise that will resolve with plugins.
*/
function plugins (options) {
  options.endpoint = options.baseUrl + uris.PLUGINS;
  return roi.get(options);
}

/**
* This function is used to create a new Plugin.
*
* @instance
* @param {object} pluginRepresentation - An object representing the plugin.
* @function pluginAdd
* @returns {Promise} A promise that will resolve with the new plugin created.
*/
function pluginAdd (options, pluginRepresentation) {
  options.endpoint = options.baseUrl + uris.PLUGINS;
  return roi.post(options, pluginRepresentation);
}

/**
* Returns all available plugins.
*
* @instance
* @function availablePlugins
* @returns {Promise} A promise that will resolve with available plugins.
*/
function availablePlugins (options) {
  options.endpoint = options.baseUrl + uris.AVAILABLE_PLUGINS;
  return roi.get(options);
}

/**
* This function is used to remove a Plugin.
*
* @instance
* @param {string} id - The ID of the Plugin.
* @function pluginDelete
* @returns {Promise} A promise that will resolve with 204 No Content if the delete is successful.
*/
function pluginDelete (options, id) {
  options.endpoint = options.baseUrl + uris.PLUGINS + id;
  return roi.del(options);
}

/**
* Returns all the roles currently defined in apiman.
*
* @instance
* @function roles
* @returns {Promise} A promise that will resolve with roles.
*/
function roles (options) {
  options.endpoint = options.baseUrl + uris.ROLES;
  return roi.get(options);
}

/**
* Returns information about the role.
*
* @instance
* @param {string} id - The ID of the role.
* @function role
* @returns {Promise} A promise that will resolve with role.
*/
function role (options, id) {
  options.endpoint = options.baseUrl + uris.ROLES + id;
  return roi.get(options);
}

/**
* This function is used to remove a Role.
*
* @instance
* @param {string} id - The ID of the Role.
* @function roleDelete
* @returns {Promise} A promise that will resolve with 204 No Content if the delete is successful.
*/
function roleDelete (options, id) {
  options.endpoint = options.baseUrl + uris.ROLES + id;
  return roi.del(options);
}

/**
* Returns information about the policy definition.
*
* @instance
* @param {string} id - The ID of the policy definition.
* @function policyDefinition
* @returns {Promise} A promise that will resolve with policy definition.
*/
function policyDefinition (options, id) {
  options.endpoint = options.baseUrl + uris.POLICY_DEFINITIONS + id;
  return roi.get(options);
}

/**
* Returns all the policy definitions currently defined in apiman.
*
* @instance
* @function policyDefinitions
* @returns {Promise} A promise that will resolve with policy definitions.
*/
function policyDefinitions (options) {
  options.endpoint = options.baseUrl + uris.POLICY_DEFINITIONS;
  return roi.get(options);
}

/**
* This function is used to remove a policy definition.
*
* @instance
* @param {string} id - The ID of the policy definition.
* @function policyDefinitionDelete
* @returns {Promise} A promise that will resolve with 204 No Content if the delete is successful.
*/
function policyDefinitionDelete (options, id) {
  options.endpoint = options.baseUrl + uris.POLICY_DEFINITIONS + id;
  return roi.del(options);
}

/**
* Returns all the organizations with APIs for the current user.
*
* @instance
* @function currentUserAPIOrganizations
* @returns {Promise} A promise that will resolve with organizations.
*/
function currentUserAPIOrganizations (options) {
  options.endpoint = options.baseUrl + uris.CURRENT_USER_APIORGS;
  return roi.get(options);
}

/**
* Returns all of the APIs the current user has permission to edit.
*
* @instance
* @function currentUserAPIs
* @returns {Promise} A promise that will resolve with current user APIs.
*/
function currentUserAPIs (options) {
  options.endpoint = options.baseUrl + uris.CURRENT_USER_APIS;
  return roi.get(options);
}

/**
* Returns all the organizations with clients for the current user
* has permission to edit clients.
*
* @instance
* @function currentUserClientOrganizations
* @returns {Promise} A promise that will resolve with organizations.
*/
function currentUserClientOrganizations (options) {
  options.endpoint = options.baseUrl + uris.CURRENT_USER_CLIENTORGS;
  return roi.get(options);
}

/**
* Returnsall the clients for the current user
* has permission to edit clients.
*
* @instance
* @function currentUserClients
* @returns {Promise} A promise that will resolve with current user clients.
*/
function currentUserClients (options) {
  options.endpoint = options.baseUrl + uris.CURRENT_USER_CLIENTS;
  return roi.get(options);
}

/**
* Returns information about the current authenticated user.
*
* @instance
* @function currentUserInfo
* @returns {Promise} A promise that will resolve with the current user information.
*/
function currentUserInfo (options) {
  options.endpoint = options.baseUrl + uris.CURRENT_USER_INFO;
  return roi.get(options);
}

// /**
// * Updates information about the current authenticated user.
// *
// * @instance
// * @param {string} email - User's email.
// * @param {string} fullName - User's full name.
// * @function currentUserUpdate
// * @returns {Promise} A promise that will resolve with 204 No Content if the update is successful.
// */
// function currentUserUpdate (email, fullName) {
//   handleOptions(uris.CURRENT_USER_INFO);
//   options.body = { email: email, fullName: fullName };
//   return requestHandler.put(options);
// }

/**
* Returns all the organizations for which the current user
* has permission to edit plans.
*
* @instance
* @function currentUserPlanOrganizations
* @returns {Promise} A promise that will resolve with the list of organizations.
*/
function currentUserPlanOrganizations (options) {
  options.endpoint = options.baseUrl + uris.CURRENT_USER_PLANORGS;
  return roi.get(options);
}

/**
* Returns information about the organization.
*
* @instance
* @param {string} id - The ID of the organization.
* @function organization
* @returns {Promise} A promise that will resolve with organization.
*/
function organization (options, id) {
  options.endpoint = options.baseUrl + uris.ORGANIZATIONS + id;
  return roi.get(options);
}

// /**
// * This function is used to create a new Organization.
// *
// * @instance
// * @param {string} name - Organization's name.
// * @param {string} description - Organizations's description.
// * @function organizationAdd
// * @returns {Promise} A promise that will resolve with the new organization created.
// */
// function organizationAdd (name, description) {
//   handleOptions(uris.ORGANIZATIONS);
//   options.body = { name: name, description: description };
//   return post();
// }

/**
* This function is used to remove a Organization.
*
* @instance
* @param {string} id - The ID of the Organization.
* @function organizationDelete
* @returns {Promise} A promise that will resolve with 204 No Content if the delete is successful.
*/
function organizationDelete (options, id) {
  options.endpoint = options.baseUrl + uris.ORGANIZATIONS + id;
  return roi.del(options);
}

/**
* Returns information about the user.
*
* @instance
* @param {string} id - The ID of the user.
* @function user
* @returns {Promise} A promise that will resolve with user.
*/
function user (options, id) {
  options.endpoint = options.baseUrl + uris.USERS + id;
  return roi.get(options);
}

// /**
// * Updates information about the user.
// *
// * @instance
// * @param {string} userId - User's id.
// * @param {string} email - User's email.
// * @param {string} fullName - User's full name.
// * @function userUpdate
// * @returns {Promise} A promise that will resolve with 204 No Content if the update is successful.
// */
// function userUpdate (userId, email, fullName) {
//   handleOptions(uris.USERS + userId);
//   options.body = { email: email, fullName: fullName };
//   return requestHandler.put(options);
// }

/**
* Returns all of the User's APIs.
*
* @instance
* @function userAPIs
* @param {string} userId - User's id.
* @returns {Promise} A promise that will resolve with user APIs.
*/
function userAPIs (options, userId) {
  options.endpoint = options.baseUrl + uris.USERS + userId + '/apis';
  return roi.get(options);
}

/**
* Returns all of the User's clients.
*
* @instance
* @function userClients
* @param {string} userId - User's id.
* @returns {Promise} A promise that will resolve with user clients.
*/
function userClients (options, userId) {
  options.endpoint = options.baseUrl + uris.USERS + userId + '/clients';
  return roi.get(options);
}

/**
* Returns all of the User's organizations.
*
* @instance
* @function userOrganizations
* @param {string} userId - User's id.
* @returns {Promise} A promise that will resolve with user organizations.
*/
function userOrganizations (options, userId) {
  options.endpoint = options.baseUrl + uris.USERS + userId + '/organizations';
  return roi.get(options);
}

// }
