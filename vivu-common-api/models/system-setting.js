const helpers = require('node-helpers');
const systemSettingTypes = require('../gen-nodejs/system_setting_types');


class SystemSetting extends helpers.models.Base {

  get tableName() {
    return 'system_settings';
  }

  get tableSchema() {
    return 'public';
  }

  constructor(data, opts) {

    opts = opts || {};
    super(data, opts);

    this.id = null;
    this.key = '';
    this.value = '';
    this.type = '';

    if (data) {
      helpers.Model.assignData(this, data, opts);
    }

  }

  getAttributes() {

    return {
      id: this.id,
      key: this.key,
      value: this.value,
      type: this.type,
      status: this.status,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      created_by: this.createdBy,
      updated_by: this.updatedAt
    };

  }

  toThriftObject(opts) {

    let model = new systemSettingTypes.SystemSetting();
    this.applyThrift(model, opts);
    return model;

  }

  //applyThrift(model,opts){
  //super.applyThrift(model,opts)
  //}

  toThriftInsert(opts) {

    let model = new systemSettingTypes.SystemSettingInsert();
    this.applyThrift(model, opts);
    return model;

  }

  toThriftForm(opts) {

    let model = new systemSettingTypes.SystemSettingForm();
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

module.exports = SystemSetting;