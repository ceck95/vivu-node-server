/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-13T11:21:35+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-23T10:52:04+07:00
 */

'use strict';

const nodePg = require('node-pg');
const logger = require('../helpers/logger');
const ProductColorPreviewImage = require('vivu-common-api').models.ProductColorPreviewImage;

class ProductColorPreviewImageAdapter extends nodePg.adapters.Adapter {

  constructor() {
    super();
    this.log = logger.child({
      'namespace': 'postgres',
      'adapter': 'ProductColorPreviewImageAdapter'
    });
  }

  get modelClass() {
    return ProductColorPreviewImage;
  }

}

module.exports = ProductColorPreviewImageAdapter;
