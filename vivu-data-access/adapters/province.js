/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-12T23:29:02+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-12T23:29:04+07:00
 */



'use strict';

const nodePg = require('node-pg');
const Province = require('vivu-common-api').models.Province;

class ProvinceAdapter extends nodePg.adapters.Province {

  /**
   * Model class for current adapter
   *
   * @return {Class} Class object
   */
  get modelClass() {
    return Province;
  }

}

module.exports = ProvinceAdapter;
