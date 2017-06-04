/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-12T09:59:01+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   root
 * @Last modified time: 2017-03-15T14:51:05+07:00
 */



const helpers = require('node-helpers');
const customerAddressTypes = require('../gen-nodejs/customer_address_types');

const TYPE = {
  CustomerAddress: 'CUSTOMER_HOME'
};

class CustomerAddress extends helpers.models.Base {

  get tableName() {
    return 'customer_address';
  }

  get typeAddress() {
    return TYPE;
  }

  constructor(data, opts) {

    opts = opts || {};
    super(data, opts);

    this.id = null;
    this.customerId = null;
    this.type = '';
    this.isDefault = null;
    this.fullName = '';
    this.phone = '';
    this.street = '';
    this.postalCode = '';
    this.province = '';
    this.district = '';
    this.ward = '';
    this.countryCode = '';
    this.customerName = '';

    if (data) {
      helpers.Model.assignData(this, data, opts);

    }
  }

  getAttributes() {
    return {
      id: this.id,
      customer_id: this.customerId,
      type: this.type,
      is_default: this.isDefault,
      full_name: this.fullName,
      phone: this.phone,
      street: this.street,
      province: this.province,
      postal_code: this.postalCode,
      district: this.district,
      country_code: this.countryCode,
      status: this.status,
      ward: this.ward,
      customer_name: this.customerName
    };
  }


  toThriftInsert(opts) {
    let model = new customerAddressTypes.CustomerAddressInsert();
    this.applyThrift(model, opts);
    return model;
  }

  toThriftObject(opts) {

    let model = new customerAddressTypes.CustomerAddress();
    this.applyThrift(model, opts);

    return model;
  }

  toThriftForm(opts) {

    let model = new customerAddressTypes.CustomerAddressForm();
    this.applyThrift(model, opts);
    console.log(model);
    return model;

  }

  responseObject(opts) {

    opts = opts || {};
    let result = helpers.Model.toObject(this, opts);

    return result;

  }

  get serviceActions() {
    return ['getManyByCustomer', 'getOneDefault'];
  }

}

module.exports = CustomerAddress;