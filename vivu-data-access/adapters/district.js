/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-12T23:28:35+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-12T23:57:07+07:00
 */



'use strict';

const nodePg = require('node-pg');
const District = require('vivu-common-api').models.District;
class DistrictAdapter extends nodePg.adapters.District {

  /**
   * Model class for current adapter
   *
   * @return {Class} Class object
   */
  get modelClass() {
    return District;
  }
}

module.exports = DistrictAdapter;
