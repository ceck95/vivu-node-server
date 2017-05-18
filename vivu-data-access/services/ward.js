/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-12T23:31:52+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-12T23:31:56+07:00
 */



'use strict';

const nodePg = require('node-pg');

const WardAdapter = require('../adapters/ward');

class WardService extends nodePg.services.Ward {
  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return WardAdapter;
  }

  getOneByWardCode(wardCode, result) {
    return this.getOne({
      where: 'ward_code = $1',
      args: [wardCode]
    },result);
  }

}

module.exports = WardService;
