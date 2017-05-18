/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-22T22:21:13+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-23T12:53:31+07:00
 */

'use strict';

const helpers = require('node-helpers');
const productColorTypes = require('../gen-nodejs/product_color_types');

class ProductColor extends helpers.models.Base {

  get tableName() {
    return 'product_color';
  }

  constructor(data, opts) {

    opts = opts || {};
    super(data, opts);

    this.id = null;
    this.productId = null;
    this.colorName = '';
    this.referProductImagePath = '';
    this.price = null
    this.priority = null;
    this.isSoldOut = null;

    if (data) {
      helpers.Model.assignData(this, data, opts);
    }
  }

  getAttributes() {
    return {
      id: this.id,
      product_id: this.productId,
      color_name: this.colorName,
      refer_product_image_path: this.referProductImagePath,
      price: this.price,
      priority: this.priority,
      is_sold_out: this.isSoldOut,
      status: this.status,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      created_by: this.createdBy,
      updated_at: this.updatedAt
    }
  }


  toThriftObject(opts) {

    let model = new productColorTypes.ProductColor();
    this.applyThrift(model, opts);

    return model;
  }

  responseObject(opts) {

    opts = opts || {};
    let result = helpers.Model.toObject(this, opts);

    return result;
  }

  get serviceActions() {
    return ['getManyByProduct'];
  }

}

module.exports = ProductColor;
