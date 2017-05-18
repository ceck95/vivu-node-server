/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-13T11:21:35+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-23T10:51:51+07:00
 */

'use strict';

const nodePg = require('node-pg');
const logger = require('../helpers/logger');
const ProductColor = require('vivu-common-api').models.ProductColor;

class ProductColorAdapter extends nodePg.adapters.Adapter {

  constructor() {
    super();
    this.log = logger.child({
      'namespace': 'postgres',
      'adapter': 'ProductColorAdapter'
    });
  }

  get modelClass() {
    return ProductColor;
  }

}

module.exports = ProductColorAdapter;
