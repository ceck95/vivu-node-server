const nodePg = require('node-pg');
const exceptionHelper = require('../helpers/exception');
const OrderItemAdapter = require('../adapters/order-item');
const helpers = require('node-helpers');
const vivuCommon = require('vivu-common-api');
const OrderItem = vivuCommon.models.OrderItem;


class OrderItemService extends nodePg.services.Base {

  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return OrderItemAdapter;
  }

  /**
   * Return exception handler
   *
   * @return {ExceptionHelper} Exception helpers
   */
  get exception() {
    return exceptionHelper;
  }

  getManyByOrder(orderIds, opts, result) {
    opts = opts || {};
    let model = new OrderItem();

    return this.responseMany(this.adapter.getAllConditionRelation({
      where: [`order_id IN (${orderIds.join(',')})`, `${model.tableAlias}.status = $1`],
      args: [helpers.Const.status.ACTIVE]
    }, opts), opts, result);

  }

}

module.exports = OrderItemService;