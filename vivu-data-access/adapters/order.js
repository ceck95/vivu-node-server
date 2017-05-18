const nodePg = require('node-pg');
const logger = require('../helpers/logger');
const vivuCommon = require('vivu-common-api');
const Order = vivuCommon.models.Order;
const CustomerAddress = vivuCommon.models.CustomerAddress;
const OrderPayment = vivuCommon.models.OrderPayment;

class OrderAdapter extends nodePg.adapters.Adapter {

  constructor() {
    super();
    this.log = logger.child({
      'namespace': 'postgres',
      'adapter': 'OrderAdapter'
    });
  }

  get modelClass() {
    return Order;
  }

  sqlRelation(model, opts, where, args) {

    where = where || [];
    if (!Array.isArray(where)) {
      where = [where];
    }

    args = args || [];

    let includes = [],
      joins = [],
      customerAddress = new CustomerAddress(),
      orderPayment = new OrderPayment(),
      tableAlias = model.tableAlias;

    includes.push({
      alias: tableAlias,
      model: model
    });

    if (opts.includes) {

      if (opts.includes.indexOf(customerAddress.tableAlias) > -1) {
        let jCondition = ' LEFT JOIN ' + customerAddress.fullTableName + ' ' + customerAddress.tableAlias + ' ON ' + customerAddress.tableAlias + '.id = ' + tableAlias + '.shipping_address_id ';
        joins.push(jCondition);
        includes.push({
          alias: customerAddress.tableAlias,
          model: customerAddress
        });
      }


      if (opts.includes.indexOf(orderPayment.tableAlias) > -1) {
        let jCondition = ' LEFT JOIN ' + orderPayment.fullTableName + ' ' + orderPayment.tableAlias + ' ON ' + orderPayment.tableAlias + '.order_id = ' + tableAlias + '.id ';
        joins.push(jCondition);
        includes.push({
          alias: orderPayment.tableAlias,
          model: orderPayment
        });
      }

    }


    let result = {
      joins: joins,
      includes: includes,
      where: where,
      args: args
    };

    return result;

  }

}

module.exports = OrderAdapter;