/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-22T22:21:13+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-22T10:53:29+07:00
 */

'use strict';

const helpers = require('node-helpers');
const quoteTypes = require('../gen-nodejs/quote_types');

class Quote extends helpers.models.Base {

  get tableName() {
    return 'quote';
  }

  constructor(data, opts) {

    opts = opts || {};
    super(data, opts);

    this.id = null;
    this.orderId = null;
    this.subtotal = null;
    this.grandTotal = null;
    this.checkoutMethod = '';
    this.customerId = null;
    this.customerAddressId = null;

    if (data) {
      helpers.Model.assignData(this, data, opts);
    }
  }

  getAttributes() {
    return {
      id: this.id,
      order_id: this.orderId,
      subtotal: this.subtotal,
      grand_total: this.grandTotal,
      checkout_method: this.checkoutMethod,
      customer_id: this.customerId,
      customer_address_id: this.customerAddressId,
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

    let model = new quoteTypes.Quote();
    this.applyThrift(model, opts);

    return model;
  }

  toThriftInsert(opts) {

    let model = new quoteTypes.QuoteForm();
    this.applyThrift(model, opts);

    return model;
  }

  toThriftForm(opts) {

    let model = new quoteTypes.QuoteForm();
    this.applyThrift(model, opts);

    return model;
  }

  responseObject(opts) {

    opts = opts || {};
    let result = helpers.Model.toObject(this, opts);

    return result;

  }

  get serviceActions() {
    return ['getOneByCustomer'];
  }

}

module.exports = Quote;