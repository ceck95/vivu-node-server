/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-20T16:18:21+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-21T23:54:13+07:00
 */


'use strict';

const nodePg = require('node-pg');
const exceptionHelper = require('../helpers/exception');
const QuoteAdapter = require('../adapters/quote');


class QuoteService extends nodePg.services.Base {

  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return QuoteAdapter;
  }

  /**
   * Return exception handler
   *
   * @return {ExceptionHelper} Exception helpers
   */
  get exception() {
    return exceptionHelper;
  }

  getOneByCustomer(customerId, result) {
    return this.getOne({
      where: ['customer_id = $1'],
      args: [customerId]
    }, result);
  }

}

module.exports = QuoteService;
