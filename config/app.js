/*!
Copyright (c) 2018 - Kelvin Checo

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * Module dependencies.
 * @private
 */
const express = require('express');
const config = require('./config');
const routes = require('./routes');
const Server = require('../server');

/**
 * Creates and configures an Application (App)
 *
 * @constructor
 * @property { Object } options
 */
class App {
  constructor(options = {}) {
    this.database = options.database;
    this.express = express();
    this.middleware()
    this.routes()
  }

  // configuration for middleware
  middleware() {
  }

  // configuration for api endpoints
  routes() {
    this.express.use('/', routes);
  }

  // fires up server with its configuration
  start() {
    return new Promise((resolve) => {
      let serverOpts = {express: this.express, config: config};
      this.server = new Server(serverOpts);
      resolve(this.server.start());
    })
  }
}

module.exports = App;
