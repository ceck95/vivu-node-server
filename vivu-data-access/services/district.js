/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-12T23:31:23+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-12T23:31:25+07:00
 */



'use strict';

const nodePg = require('node-pg');

const DistrictAdapter = require('../adapters/district');

class DistrictService extends nodePg.services.District {
  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return DistrictAdapter;
  }

  getOneByDistrictCode(districtCode, result) {
    return this.getOne({
      where: 'district_code = $1',
      args: [districtCode]
    },result);
  }

}

module.exports = DistrictService;
