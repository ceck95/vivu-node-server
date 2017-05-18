/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-12T09:59:01+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-02-20T23:16:38+07:00
 */

const helpers = require('node-helpers');
const customerTypes = require('../gen-nodejs/customer_types');
const CustomerAddress = require('../models/customer-address');

class Customer extends helpers.models.Base {

  get tableName() {
    return 'customer';
  }

  constructor(data, opts) {

    opts = opts || {};
    super(data, opts);

    this.id = null;
    this.email = '';
    this.phone = '';
    this.fullName = '';
    this.dob = null;
    this.gender = '';
    this.passwordHash = '';

    if (data) {
      helpers.Model.assignData(this, data, opts);
      let address = new CustomerAddress();

      if (data.address) {
        this.address = data.address.getAttributes ? data.address : new CustomerAddress(data.address);
      } else if (opts.includes ? opts.includes.indexOf(address.tableAlias) > -1 : false) {

        this.address = new CustomerAddress(data, {
          prefix: address.tableAlias
        });
      }

    }
  }

  getAttributes() {
    return {
      id: this.id,
      email: this.email,
      phone: this.phone,
      full_name: this.fullName,
      dob: this.dob,
      gender: this.gender,
      status: this.status,
      password_hash: this.passwordHash
    };
  }

  applyThrift(model, opts) {
    super.applyThrift(model, opts);
    model.dob = helpers.Data.toUtcString(model.dob);
  }

  toThriftInsert(opts) {
    let model = new customerTypes.CustomerInsert();
    this.applyThrift(model, opts);
    return model;
  }

  toThriftForm(opts) {
    let model = new customerTypes.CustomerForm();
    this.applyThrift(model, opts);
    return model;
  }

  toThriftObject(opts) {

    let model = new customerTypes.Customer();
    this.applyThrift(model, opts);
    if (this.address) {
      model.address = this.address.toThriftObject();
    }
    return model;
  }

  responseObject(opts) {

    opts = opts || {};
    let result = helpers.Model.toObject(this, opts);

    if (helpers.Model.checkAvailableKey('dob', opts)) {
      result.dob = helpers.Data.toTimestamp(this.dob);
    }

    return result;

  }

  get serviceActions() {
    return ['getOneByEmail', 'changePassword', 'getOneRelationCustomize'];
  }

}

module.exports = Customer;