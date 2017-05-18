const nodePg = require('node-pg');
const exceptionHelper = require('../helpers/exception');
const OrderPaymentAdapter = require('../adapters/order-payment');


class OrderPaymentService extends nodePg.services.Base {

  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return OrderPaymentAdapter;
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

module.exports = OrderPaymentService;