const nodePg = require('node-pg');
const exceptionHelper = require('../helpers/exception');
const QuotePaymentAdapter = require('../adapters/quote-payment');


class QuotePaymentService extends nodePg.services.Base {

  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return QuotePaymentAdapter;
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

module.exports = QuotePaymentService;