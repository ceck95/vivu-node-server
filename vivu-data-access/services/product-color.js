/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-10T09:36:21+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-18T12:34:38+07:00
 */



'use strict';

const nodePg = require('node-pg');
const exceptionHelper = require('../helpers/exception');
const ProductColorAdapter = require('../adapters/product-color');


class ProductColorService extends nodePg.services.Base {

  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return ProductColorAdapter;
  }

  /**
   * Return exception handler
   *
   * @return {ExceptionHelper} Exception helpers
   */
  get exception() {
    return exceptionHelper;
  }

  getManyByProduct(productId, result) {
    let opts = {};

    return this.getAllCondition({
      where: ['product_id = $1'],
      args: [productId]
    }, opts, result);

  }

}

module.exports = ProductColorService;
