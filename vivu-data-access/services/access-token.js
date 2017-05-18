/*
 * @Author: toan.nguyen
 * @Date:   2016-10-10 18:48:28
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-13T10:06:32+07:00
 */

'use strict';

const nodeMongo = require('node-mongo');
const exceptionHelper = require('../helpers/exception');
const AccessTokenAdapter = require('../adapters/access-token');

class AccessTokenService extends nodeMongo.services.Base {

  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return AccessTokenAdapter;
  }

  /**
   * Return exception handler
   *
   * @return {ExceptionHelper} Exception helpers
   */
  get exception() {
    return exceptionHelper;
  }

}

module.exports = AccessTokenService;
