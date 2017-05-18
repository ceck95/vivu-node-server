/*
 * @Author: toan.nguyen
 * @Date:   2016-08-24 11:41:03
* @Last modified by:   nhutdev
* @Last modified time: 2016-10-16T20:01:20+07:00
 */

'use strict';

const Path = require('path');
const config = require('./config');
const helpers = require('node-helpers');

let path = Path.join(__dirname, '/..', 'resources', 'locales', 'message'),
  languageHelpers = new helpers.Language([path], config.i18n);

module.exports = languageHelpers;
