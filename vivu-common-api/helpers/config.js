/*
 * @Author: toan.nguyen
 * @Date:   2016-09-06 18:25:59
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-23T12:18:19+07:00
 */

'use strict';


const Hoek = require('hoek');
let config = require('config');

let env = process.env.NODE_ENV || 'development';

let defaultConfig = require('../config/default');
try {
  let envConfig = require('../config/' + env);
  Hoek.merge(defaultConfig, envConfig, false, false);
} catch (e) {
  // statements
  // console.log(e);
}

process.env.NODE_CONFIG = JSON.stringify(defaultConfig);

module.exports = config.util.loadFileConfigs();
