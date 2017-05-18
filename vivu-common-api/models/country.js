/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-12T09:59:01+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-21T13:16:18+07:00
 */



const helpers = require('node-helpers');
const countryTypes = require('../gen-nodejs/country_types');

class Country extends helpers.models.Base {

  get tableName() {
    return 'gis_country';
  }

  get tableSchema() {
    return 'public';
  }

  get primaryKeyName() {
    return 'country_code';
  }

  constructor(data, opts) {

    opts = opts || {};
    super(data, opts);

    this.countryCode = '';
    this.name = '';

    if (data) {
      helpers.Model.assignData(this, data, opts);
    }
  }

  getAttributes() {
    return {
      country_code: this.countryCode,
      name: this.name,
    };
  }

  toThriftObject(opts) {

    let model = new countryTypes.CountryOption();
    this.applyThrift(model, opts);

    return model;
  }

  responseObject(opts) {

    opts = opts || {};
    let result = helpers.Model.toObject(this, opts);

    return result;

  }

  get serviceActions() {
    return ['getOneByCountryCode'];
  }

}

module.exports = Country;
