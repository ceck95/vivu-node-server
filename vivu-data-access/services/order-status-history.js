const nodePg = require('node-pg');
const exceptionHelper = require('../helpers/exception');
const orderStatusHistoryAdapter = require('../adapters/order-status-history');


class OrderStatusHistoryService extends nodePg.services.Base {

  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return orderStatusHistoryAdapter;
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

module.exports = OrderStatusHistoryService;