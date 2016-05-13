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

module.exports = {
  STATUS: '/apiman/system/status/',
  EXPORT: '/apiman/system/export/',
  IMPORT: '/apiman/system/import/',
  GATEWAYS: '/apiman/gateways/',
  PERMISSIONS: '/apiman/permissions/',
  PLUGINS: '/apiman/plugins/',
  ROLES: '/apiman/roles/'
};

// DELETE  /gateways/{gatewayId}/
// DELETE  /organizations/{organizationId}/
// DELETE  /organizations/{organizationId}/apis/{apiId}/
// DELETE  /organizations/{organizationId}/apis/{apiId}/versions/{version}/definition/
// DELETE  /organizations/{organizationId}/apis/{apiId}/versions/{version}/policies/{policyId}/
// DELETE  /organizations/{organizationId}/clients/{clientId}/
// DELETE  /organizations/{organizationId}/clients/{clientId}/versions/{version}/contracts/
// DELETE  /organizations/{organizationId}/clients/{clientId}/versions/{version}/contracts/{contractId}/
// DELETE  /organizations/{organizationId}/clients/{clientId}/versions/{version}/policies/{policyId}/
// DELETE  /organizations/{organizationId}/members/{userId}/
// DELETE  /organizations/{organizationId}/plans/{planId}/
// DELETE  /organizations/{organizationId}/plans/{planId}/versions/{version}/policies/{policyId}/
// DELETE  /organizations/{organizationId}/roles/{roleId}/{userId}/
// DELETE  /plugins/{pluginId}/
// DELETE  /policyDefs/{policyDefinitionId}/
// DELETE  /roles/{roleId}/
// GET  /currentuser/apiorgs/
// GET  /currentuser/apis/
// GET  /currentuser/clientorgs/
// GET  /currentuser/clients/
// GET  /currentuser/info/
// GET  /currentuser/planorgs/
// GET  /downloads/{downloadId}/
// GET  /gateways/{gatewayId}/
// GET  /organizations/{organizationId}/
// GET  /organizations/{organizationId}/activity/
// GET  /organizations/{organizationId}/apis/
// GET  /organizations/{organizationId}/apis/{apiId}/
// GET  /organizations/{organizationId}/apis/{apiId}/activity/
// GET  /organizations/{organizationId}/apis/{apiId}/versions/
// GET  /organizations/{organizationId}/apis/{apiId}/versions/{version}/
// GET  /organizations/{organizationId}/apis/{apiId}/versions/{version}/activity/
// GET  /organizations/{organizationId}/apis/{apiId}/versions/{version}/contracts/
// GET  /organizations/{organizationId}/apis/{apiId}/versions/{version}/definition/
// GET  /organizations/{organizationId}/apis/{apiId}/versions/{version}/endpoint/
// GET  /organizations/{organizationId}/apis/{apiId}/versions/{version}/metrics/clientResponseStats/
// GET  /organizations/{organizationId}/apis/{apiId}/versions/{version}/metrics/clientUsage/
// GET  /organizations/{organizationId}/apis/{apiId}/versions/{version}/metrics/planResponseStats/
// GET  /organizations/{organizationId}/apis/{apiId}/versions/{version}/metrics/planUsage/
// GET  /organizations/{organizationId}/apis/{apiId}/versions/{version}/metrics/responseStats/
// GET  /organizations/{organizationId}/apis/{apiId}/versions/{version}/metrics/summaryResponseStats/
// GET  /organizations/{organizationId}/apis/{apiId}/versions/{version}/metrics/usage/
// GET  /organizations/{organizationId}/apis/{apiId}/versions/{version}/plans/
// GET  /organizations/{organizationId}/apis/{apiId}/versions/{version}/plans/{planId}/policyChain/
// GET  /organizations/{organizationId}/apis/{apiId}/versions/{version}/policies/
// GET  /organizations/{organizationId}/apis/{apiId}/versions/{version}/policies/{policyId}/
// GET  /organizations/{organizationId}/apis/{apiId}/versions/{version}/status/
// GET  /organizations/{organizationId}/clients/
// GET  /organizations/{organizationId}/clients/{clientId}/
// GET  /organizations/{organizationId}/clients/{clientId}/activity/
// GET  /organizations/{organizationId}/clients/{clientId}/versions/
// GET  /organizations/{organizationId}/clients/{clientId}/versions/{version}/
// GET  /organizations/{organizationId}/clients/{clientId}/versions/{version}/activity/
// GET  /organizations/{organizationId}/clients/{clientId}/versions/{version}/apikey/
// GET  /organizations/{organizationId}/clients/{clientId}/versions/{version}/apiregistry/json/
// GET  /organizations/{organizationId}/clients/{clientId}/versions/{version}/apiregistry/xml/
// GET  /organizations/{organizationId}/clients/{clientId}/versions/{version}/contracts/
// GET  /organizations/{organizationId}/clients/{clientId}/versions/{version}/contracts/{contractId}/
// GET  /organizations/{organizationId}/clients/{clientId}/versions/{version}/metrics/apiUsage/
// GET  /organizations/{organizationId}/clients/{clientId}/versions/{version}/policies/
// GET  /organizations/{organizationId}/clients/{clientId}/versions/{version}/policies/{policyId}/
// GET  /organizations/{organizationId}/members/
// GET  /organizations/{organizationId}/plans/
// GET  /organizations/{organizationId}/plans/{planId}/
// GET  /organizations/{organizationId}/plans/{planId}/activity/
// GET  /organizations/{organizationId}/plans/{planId}/versions/
// GET  /organizations/{organizationId}/plans/{planId}/versions/{version}/
// GET  /organizations/{organizationId}/plans/{planId}/versions/{version}/activity/
// GET  /organizations/{organizationId}/plans/{planId}/versions/{version}/policies/
// GET  /organizations/{organizationId}/plans/{planId}/versions/{version}/policies/{policyId}/
// GET  /permissions/{userId}/
// GET  /plugins/availablePlugins/
// GET  /plugins/{pluginId}/
// GET  /plugins/{pluginId}/policyDefs/
// GET  /plugins/{pluginId}/policyDefs/{policyDefId}/form/
// GET  /policyDefs/
// GET  /policyDefs/{policyDefinitionId}/
// GET  /roles/{roleId}/
// GET  /search/apiCatalog/namespaces/
// GET  /users/{userId}/
// GET  /users/{userId}/activity/
// GET  /users/{userId}/apis/
// GET  /users/{userId}/clients/
// GET  /users/{userId}/organizations/
// POST  /actions/
// POST  /organizations/
// POST  /organizations/{organizationId}/apis/
// POST  /organizations/{organizationId}/apis/{apiId}/versions/
// POST  /organizations/{organizationId}/apis/{apiId}/versions/{version}/definition/
// POST  /organizations/{organizationId}/apis/{apiId}/versions/{version}/policies/
// POST  /organizations/{organizationId}/apis/{apiId}/versions/{version}/reorderPolicies/
// POST  /organizations/{organizationId}/clients/
// POST  /organizations/{organizationId}/clients/{clientId}/versions/
// POST  /organizations/{organizationId}/clients/{clientId}/versions/{version}/contracts/
// POST  /organizations/{organizationId}/clients/{clientId}/versions/{version}/policies/
// POST  /organizations/{organizationId}/clients/{clientId}/versions/{version}/reorderPolicies/
// POST  /organizations/{organizationId}/plans/
// POST  /organizations/{organizationId}/plans/{planId}/versions/
// POST  /organizations/{organizationId}/plans/{planId}/versions/{version}/policies/
// POST  /organizations/{organizationId}/plans/{planId}/versions/{version}/reorderPolicies/
// POST  /organizations/{organizationId}/roles/
// POST  /plugins/
// POST  /policyDefs/
// POST  /roles/
// POST  /roles/search/
// POST  /search/apiCatalog/entries/
// POST  /search/apis/
// POST  /search/clients/
// POST  /search/organizations/
// POST  /users/search/
// PUT  /currentuser/info/
// PUT  /gateways/{gatewayId}/
// PUT  /organizations/{organizationId}/
// PUT  /organizations/{organizationId}/apis/{apiId}/
// PUT  /organizations/{organizationId}/apis/{apiId}/versions/{version}/
// PUT  /organizations/{organizationId}/apis/{apiId}/versions/{version}/definition/
// PUT  /organizations/{organizationId}/apis/{apiId}/versions/{version}/policies/{policyId}/
// PUT  /organizations/{organizationId}/clients/{clientId}/
// PUT  /organizations/{organizationId}/clients/{clientId}/versions/{version}/apikey/
// PUT  /organizations/{organizationId}/clients/{clientId}/versions/{version}/policies/{policyId}/
// PUT  /organizations/{organizationId}/plans/{planId}/
// PUT  /organizations/{organizationId}/plans/{planId}/versions/{version}/policies/{policyId}/
// PUT  /policyDefs/{policyDefinitionId}/
// PUT  /roles/{roleId}/
// PUT  /users/{userId}/