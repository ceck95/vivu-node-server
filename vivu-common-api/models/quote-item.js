/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-22T22:21:13+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-23T22:46:47+07:00
 */

'use strict';

const helpers = require('node-helpers');
const quoteItemTypes = require('../gen-nodejs/quote_item_types');
const Product = require('./product');
const ProductColor = require('./product-color');

class QuoteItem extends helpers.models.Base {

  get tableName() {
    return 'quote_item';
  }

  constructor(data, opts) {

    opts = opts || {};
    super(data, opts);
    this.id = null;
    this.quoteId = null;
    this.productId = null;
    this.selectedProductColorId = null;
    this.quantity = null;
    this.basePrice = null;


    if (data) {
      helpers.Model.assignData(this, data, opts);

      let product = new Product(),
        productColor = new ProductColor();

      if (data.product) {
        this.product = data.product.getAttributes ? data.product : new Product(data.product);
      } else if (opts.includes ? opts.includes.indexOf(product.tableAlias) > -1 : false) {
        this.product = new Product(data, {
          prefix: product.tableAlias
        });
      }

      if (data.productColor) {
        this.productColor = data.productColor.getAttributes ? data.productColor : new ProductColor(data.productColor);
      } else if (opts.includes ? opts.includes.indexOf(productColor.tableAlias) > -1 : false) {
        this.productColor = new ProductColor(data, {
          prefix: productColor.tableAlias
        });
      }

    }

  }

  getAttributes() {
    return {
      id: this.id,
      quote_id: this.quoteId,
      product_id: this.productId,
      selected_product_color_id: this.selectedProductColorId,
      quantity: this.quantity,
      base_price: this.basePrice,
      status: this.status,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      created_by: this.createdBy,
      updated_by: this.updatedBy
    };
  }

  applyThrift(model, opts) {
    super.applyThrift(model, opts);
  }

  toThriftObject(opts) {

    let model = new quoteItemTypes.QuoteItem();
    this.applyThrift(model, opts);

    if (this.product) {
      model.product = this.product.toThriftObject();
    }

    if (this.productColor) {
      model.productColor = this.productColor.toThriftObject();
    }

    return model;
  }

  toThriftInsert(opts) {

    let model = new quoteItemTypes.QuoteItemInsert();
    this.applyThrift(model, opts);

    return model;
  }

  toThriftForm(opts) {

    let model = new quoteItemTypes.QuoteItemForm();
    this.applyThrift(model, opts);
    return model;
  }

  responseObject(opts) {

    opts = opts || {};
    let result = helpers.Model.toObject(this, opts);

    return result;

  }

  get serviceActions() {
    return ['getManyByQuote', 'getOneByProductAndProductColor'];
  }

}

module.exports = QuoteItem;
