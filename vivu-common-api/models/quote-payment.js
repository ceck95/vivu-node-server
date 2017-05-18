const helpers = require('node-helpers');
const quotePaymentTypes = require('../gen-nodejs/quote_payment_types');


class QuotePayment extends helpers.models.Base {

  get tableName() {
    return 'quote_payment';
  }

  constructor(data, opts) {

    opts = opts || {};
    super(data, opts);

    this.id = null;
    this.quoteId = null;
    this.method = null;

    if (data) {
      helpers.Model.assignData(this, data, opts);
    }

  }

  getAttributes() {

    return {
      id: this.id,
      quote_id: this.quoteId,
      method: this.method,
      status: this.status,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      created_by: this.createdBy,
      updated_by: this.updatedBy
    };

  }

  toThriftObject(opts) {

    let model = new quotePaymentTypes.QuotePayment();
    this.applyThrift(model, opts);
    return model;

  }

  //applyThrift(model,opts){
  //super.applyThrift(model,opts)
  //}

  toThriftInsert(opts) {

    let model = new quotePaymentTypes.QuotePaymentInsert();
    this.applyThrift(model, opts);
    return model;

  }

  toThriftForm(opts) {

    let model = new quotePaymentTypes.QuotePaymentForm();
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

module.exports = QuotePayment;