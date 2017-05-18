/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-10T09:36:21+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-02-20T11:17:39+07:00
 */



'use strict';

const nodePg = require('node-pg');
const exceptionHelper = require('../helpers/exception');
const CustomerAddressAdapter = require('../adapters/customer-address');
const helpers = require('node-helpers');

class CustomerAddressService extends nodePg.services.Base {

  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return CustomerAddressAdapter;
  }

  /**
   * Return exception handler
   *
   * @return {ExceptionHelper} Exception helpers
   */
  get exception() {
    return exceptionHelper;
  }

  getManyByCustomer(customerId, result) {
    let opts = {};
    return this.getAllCondition({
      where: ['customer_id = $1', 'status = $2'],
      args: [customerId, helpers.Const.status.ACTIVE],
      order: '-is_default'
    }, opts, result);
  }

  getOneDefault(result) {
    return this.getOne({
      where: ['is_default = $1', 'status = $2'],
      args: [true, helpers.Const.status.ACTIVE]
    }, result);
  }

}

module.exports = CustomerAddressService;