/*
 * @Author: toan.nguyen
 * @Date:   2016-07-14 11:38:18
* @Last modified by:   nhutdev
* @Last modified time: 2016-10-16T19:57:23+07:00
 */

'use strict';

const Path = require('path');
const nodeHelpers = require('node-helpers');
const config = require('./config');

let path = Path.join(__dirname + '/..', 'resources', 'errors', 'errors'),
  errorHelper = new nodeHelpers.models.Error([path], {
    locale: config.i18n.language
  });

module.exports = errorHelper;
