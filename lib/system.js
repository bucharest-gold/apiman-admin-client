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
const http = require('http');
const request = require('request');

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

    let baseUrl = options.baseUrl;
    let port = baseUrl.substring(baseUrl.lastIndexOf(':') + 1);
    let host = baseUrl.substring(baseUrl.indexOf('//') + 2, baseUrl.lastIndexOf(':'));

    let opts = {
      host: host,
      port: port,
      path: options.uri,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      }
    };

    opts.headers.Authorization = options.headers.Authorization;

    return new Promise((resolve, reject) => {

      let req = http.request(opts, (res) => {
        const body = [];
        res.on('data', (chunk) => body.push(chunk));
        res.on('end', () => resolve(body.join('')));
      }).on('error', (error) => reject(error));

      let stream = fs.ReadStream(filePath);
      stream.pipe(req);
      stream.on('close', (res) => {
        req.end();
      });

    });

  }

  return Object.freeze({
    status,
    exportData,
    importData
  });

}

module.exports = system;