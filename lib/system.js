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
const request = require('request');
//request.debug = true;

function system(options) {

  function status() {
    return new Promise((resolve, reject) => {
      request.get(options, (error, response, body) => {
        if (error) {
          return reject(error);
        }
        return resolve(body);
      });
    });
  }

  function exportData() {
    return new Promise((resolve, reject) => {
      request.get(options, (error, response, body) => {
        if (error) {
          return reject(error);
        }
        return resolve(body);
      });
    });
  }

  function importData(filePath) {

    /*var formData = {
      file: {
        value: fs.createReadStream(filePath),
        options: {
          filename: 'api-manager-export.json',
          contentType: 'application/json'
        }
      }
    };*/
    let url = options.baseUrl + options.uri;

    //return new Promise((resolve, reject) => {
    let req = request.post({ url: url, headers: options.headers }, (error, response, body) => {
      if (error) {
        console.log(error);
        //return reject(error);
      }
      console.log(body);
      //return resolve(body);
    });
    let form = req.form();
    form.append('file', fs.createReadStream(filePath), { filename: 'api-manager-export.json' });
    //});
  }

  return Object.freeze({
    status,
    exportData,
    importData
  });

}

module.exports = system;