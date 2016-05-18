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
const requestHandler = require('./request-handler');

function system(options) {

  const status = () => requestHandler.get(options);

  const exportData = () => requestHandler.get(options);

  const importData = (filePath) => {
    options.body = fs.readFileSync(filePath, 'utf-8');
    options.json = false;
    options.headers.Accept = 'text/plain';
    return requestHandler.post(options);
  };

  return Object.freeze({
    status,
    exportData,
    importData
  });

}

module.exports = system;