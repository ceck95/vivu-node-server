const nodePg = require('node-pg');
const logger = require('../helpers/logger');
const QuotePayment = require('vivu-common-api').models.QuotePayment;

class QuotePaymentAdapter extends nodePg.adapters.Adapter {

  constructor() {
    super();
    this.log = logger.child({
      'namespace': 'postgres',
      'adapter': 'QuotePaymentAdapter'
    });
  }

  get modelClass() {
    return QuotePayment;
  }

}

module.exports = QuotePaymentAdapter;