/**
 * @Author: Tran Van Nhut (nhutdev) 
 * @Date: 2017-04-05 07:37:37 
 * @Email:  tranvannhut4495@gmail.com 
 * @Last modified by:   nhutdev 
 * @Last modified time: 2017-04-05 07:37:37 
 */

const helpers = require('node-helpers');
const orderPaymentTypes = require('../gen-nodejs/order_payment_types');


class OrderPayment extends helpers.models.Base {

  get tableName() {
    return 'order_payment';
  }

  constructor(data, opts) {

    opts = opts || {};
    super(data, opts);

    this.id = null;
    this.orderId = null;
    this.method = '';

    if (data) {
      helpers.Model.assignData(this, data, opts);
    }

  }

  getAttributes() {

    return {
      id: this.id,
      order_id: this.orderId,
      method: this.method,
      status: this.status,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      created_by: this.createdBy,
      updated_by: this.updatedBy
    };

  }

  toThriftObject(opts) {

    let model = new orderPaymentTypes.OrderPayment();
    this.applyThrift(model, opts);
    return model;

  }

  //applyThrift(model,opts){
  //super.applyThrift(model,opts)
  //}

  toThriftInsert(opts) {

    let model = new orderPaymentTypes.OrderPaymentInsert();
    this.applyThrift(model, opts);
    return model;

  }

  toThriftForm(opts) {

    let model = new orderPaymentTypes.OrderPaymentForm();
    this.applyThrift(model, opts);
    return model;

  }

  responseObject(opts) {

    opts = opts || {};
    let result = helpers.Model.toObject(this, opts);
    return result;

  }

  //get serviceActions(){
  //return []
  //}

}

module.exports = OrderPayment;