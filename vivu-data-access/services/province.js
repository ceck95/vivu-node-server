/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-12T23:31:40+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-12T23:32:01+07:00
 */



'use strict';

const nodePg = require('node-pg');

const ProvinceAdapter = require('../adapters/province');

class ProvinceService extends nodePg.services.Province {
  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return ProvinceAdapter;
  }

  getOneByProvinceCode(provinceCode, result) {
    return this.getOne({
      where: 'province_code = $1',
      args: [provinceCode]
    },result);
  }

}


module.exports = ProvinceService;
