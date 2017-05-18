const helpers = require('node-helpers');
const orderItemTypes = require('../gen-nodejs/order_item_types');
const Product = require('./product');
const ProductColor = require('./product-color');


class OrderItem extends helpers.models.Base {

  get tableName() {
    return 'order_item';
  }

  constructor(data, opts) {

    opts = opts || {};
    super(data, opts);

    this.id = null;
    this.orderId = null;
    this.quoteItemId = null;
    this.productId = null;
    this.selectedProductColorId = null;
    this.quantity = null;
    this.basePrice = null;

    if (data) {
      helpers.Model.assignData(this, data, opts);
      let product = new Product(),
        productColor = new ProductColor;

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
      order_id: this.orderId,
      quote_item_id: this.quoteItemId,
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

  toThriftObject(opts) {

    let model = new orderItemTypes.OrderItem();
    this.applyThrift(model, opts);
    if (this.product) {
      model.product = this.product.toThriftObject();
    }
    if (this.productColor) {
      model.productColor = this.productColor.toThriftObject();
    }
    return model;

  }

  //applyThrift(model,opts){
  //super.applyThrift(model,opts)
  //}

  toThriftInsert(opts) {

    let model = new orderItemTypes.OrderItemInsert();
    this.applyThrift(model, opts);
    return model;

  }

  toThriftForm(opts) {

    let model = new orderItemTypes.OrderItemForm();
    this.applyThrift(model, opts);
    return model;

  }

  responseObject(opts) {

    opts = opts || {};
    let result = helpers.Model.toObject(this, opts);
    return result;

  }

  get ignoreOnInsert() {
    return ['status', 'created_by', 'updated_by'];
  }

  get serviceActions() {
    return ['getManyByOrder'];
  }

}

module.exports = OrderItem;