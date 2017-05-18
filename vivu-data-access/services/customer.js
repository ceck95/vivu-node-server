/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-10T09:36:21+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-20T23:15:30+07:00
 */



'use strict';

const nodePg = require('node-pg');
const exceptionHelper = require('../helpers/exception');
const CustomerAdapter = require('../adapters/customer');
const helpers = require('node-helpers');
const vivuCommon = require('vivu-common-api');
const CustomerAddress = vivuCommon.models.CustomerAddress;


class CustomerService extends nodePg.services.Base {

  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return CustomerAdapter;
  }

  /**
   * Return exception handler
   *
   * @return {ExceptionHelper} Exception helpers
   */
  get exception() {
    return exceptionHelper;
  }

  getOneByEmail(email, result) {
    let opts = {};
    return this.responseOne(this.adapter.getOne({
      where: 'email = $1',
      args: [email]
    }, opts), opts, result);
  }

  changePassword(id, password, result) {
    return this.responseDefault(this.adapter.changePassword(id, password), {}, result);
  }

  getOneRelationCustomize(id, opts, result) {
    let tableAlias = (new this.adapter.modelClass()).tableAlias,
      tableAliasCustomerAddress = (new CustomerAddress()).tableAlias;
    return this.getOneRelation({
      where: [`${tableAlias}.id = $1`, 'is_default = $2', `${tableAliasCustomerAddress}.status = $3`],
      args: [id, true, helpers.Const.status.ACTIVE]
    }, opts, result);
  }

}

module.exports = CustomerService;
