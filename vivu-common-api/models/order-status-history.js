const helpers = require('node-helpers');
const orderStatusHistoryTypes = require('../gen-nodejs/order_status_history_types');


class OrderStatusHistory extends helpers.models.Base {

  get tableName() {
    return 'order_status_history';
  }

  constructor(data, opts) {

    opts = opts || {};
    super(data, opts);

    this.id = null;
    this.orderId = null;
    this.orderStatus = null;
    this.notes = '';


    if (data) {
      helpers.Model.assignData(this, data, opts);
    }

  }

  getAttributes() {

    return {
      id: this.id,
      order_id: this.orderId,
      order_status: this.orderStatus,
      notes: this.notes,
      status: this.status,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      created_by: this.createdBy,
      updated_by: this.updatedAt
    };

  }

  toThriftObject(opts) {

    let model = new orderStatusHistoryTypes.OrderStatusHistory();
    this.applyThrift(model, opts);
    return model;

  }

  //applyThrift(model,opts){
  //super.applyThrift(model,opts)
  //}

  toThriftInsert(opts) {

    let model = new orderStatusHistoryTypes.OrderStatusHistoryInsert();
    this.applyThrift(model, opts);
    return model;

  }

  toThriftForm(opts) {

    let model = new orderStatusHistoryTypes.OrderStatusHistoryForm();
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

module.exports = OrderStatusHistory;