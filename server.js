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

/**
 * A "basic" http server class
 *
 * @constructor
 * @property { Object } options
 */
class Server {
  constructor(options) {
    this.config   = options.config;
    this.app      = options.express || express();
  }

  start(port, host) {
    return new Promise((resolve, reject) => {
      // check if server is already running
      if (this._self) {
        console.log('App server already running...');
        return;
      }

      // check if port is defined
      if (port === 'undefined' || this.config.http.port === 'undefined') {
        reject(new Error('The server must be started with an available port'));
      }

      // check if host is defined
      if (host === 'undefined' || this.config.http.host === 'undefined') {
        reject(new Error('The server must be started with an available host'));
      }

      // set port and host to varaibles
      port = port || this.config.http.port;
      host = host || this.config.http.host;

      this._self = this.app
        .listen(port, host)
        .on('listening', () => {
          console.log(`App server is running on http://${ host }:${ port }/\n`);
        })
        .on('error', (error) => {
          reject(console.log('Error firing up the app server: ', error));
        });

      resolve(this._self);
    });
  }

  stop() {
    return new Promise((resolve, reject) => {
      if (this._self.listening) {
        this.app.close(err => {
          if (err) reject(console.log("Unable to shutdown app server!", err));

          resolve(console.log("App server successfully shutdown"));
        })
      }
    });
  }
}

/**
 * Module exports.
 * @public
 */
module.exports = Server;
