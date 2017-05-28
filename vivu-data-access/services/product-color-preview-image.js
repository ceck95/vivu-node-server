/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-10T09:36:21+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-19T19:47:08+07:00
 */



'use strict';

const nodePg = require('node-pg');
const exceptionHelper = require('../helpers/exception');
const ProductColorPreviewImageAdapter = require('../adapters/product-color-preview-image');
const helpers = require('node-helpers');

class ProductColorPreviewImageService extends nodePg.services.Base {

  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return ProductColorPreviewImageAdapter;
  }

  /**
   * Return exception handler
   *
   * @return {ExceptionHelper} Exception helpers
   */
  get exception() {
    return exceptionHelper;
  }

  getManyByProductColor(listProductColorId, result) {
    let opts = {};
    let tableAlias = this.adapterClass.modelClass().tableAlias;
    return this.getAllCondition({
      where: [`product_color_id IN (${listProductColorId.join(',')})`, `${tableAlias}.status = $1`],
      args: [helpers.Const.status.ACTIVE]
    }, opts, result);

  }

}

module.exports = ProductColorPreviewImageService;
