const nodePg = require('node-pg');
const logger = require('../helpers/logger');
const OrderPayment = require('vivu-common-api').models.OrderPayment;

class OrderPaymentAdapter extends nodePg.adapters.Adapter {

  constructor() {
    super();
    this.log = logger.child({
      'namespace': 'postgres',
      'adapter': 'OrderPaymentAdapter'
    });
  }

  get modelClass() {
    return OrderPayment;
  }

}

module.exports = OrderPaymentAdapter;