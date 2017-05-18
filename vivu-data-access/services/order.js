const nodePg = require('node-pg');
const exceptionHelper = require('../helpers/exception');
const OrderAdapter = require('../adapters/order');
const helpers = require('node-helpers');
const vivuCommon = require('vivu-common-api');
const Order = vivuCommon.models.Order;


class OrderService extends nodePg.services.Base {

  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return OrderAdapter;
  }

  /**
   * Return exception handler
   *
   * @return {ExceptionHelper} Exception helpers
   */
  get exception() {
    return exceptionHelper;
  }

  getManyByCustomer(customerId, opts, result) {
    opts = opts || {};
    let model = new Order();

    return this.responseMany(this.adapter.getAllConditionRelation({
      where: [`${model.tableAlias}.customer_id = $1`, `${model.tableAlias}.status = $2`],
      args: [customerId, helpers.Const.status.ACTIVE]
    }, opts), opts, result);
  }

}

module.exports = OrderService;