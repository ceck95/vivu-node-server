const nodePg = require('node-pg');
const logger = require('../helpers/logger');
const OrderStatusHistory = require('vivu-common-api').models.OrderStatusHistory;

class OrderStatusHistoryAdapter extends nodePg.adapters.Adapter {

  constructor() {
    super();
    this.log = logger.child({
      'namespace': 'postgres',
      'adapter': 'OrderStatusHistoryAdapter'
    });
  }

  get modelClass() {
    return OrderStatusHistory;
  }

}

module.exports = OrderStatusHistoryAdapter;