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

const test = require('tape');
const util = require('../lib/util');

test('Util should handle the default options.', (t) => {
  t.equal(util.handleOptions({}).baseUrl, 'http://localhost:8080');
  let headers = { 'Authorization': 'Basic YWRtaW46YWRtaW4xMjMh' };
  t.deepEqual(util.handleOptions({}).headers, headers);
  t.end();
});

test('Util should handle the options.', (t) => {
  const opts = {
    username: 'foo',
    password: 'bar'
  };
  let headers = { 'Authorization': 'Basic Zm9vOmJhcg==' };

  t.deepEqual(util.handleOptions(opts).headers, headers);
  t.end();
});
