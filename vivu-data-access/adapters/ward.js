/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-12T23:30:32+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-12T23:30:41+07:00
 */



'use strict';

const nodePg = require('node-pg');
const Ward = require('vivu-common-api').models.Ward;

class WardAdapter extends nodePg.adapters.Ward {

  /**
   * Model class for current adapter
   *
   * @return {Class} Class object
   */
  get modelClass() {
    return Ward;
  }

}

module.exports = WardAdapter;
