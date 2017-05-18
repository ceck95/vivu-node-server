/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-10T09:36:21+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-13T11:25:57+07:00
 */



'use strict';

const nexxMongo = require('node-mongo');
const exceptionHelper = require('../helpers/exception');
const ClientIdAdapter = require('../adapters/client-id');


class ClientIdService extends nexxMongo.services.Base {

  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return ClientIdAdapter;
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

module.exports = ClientIdService;
