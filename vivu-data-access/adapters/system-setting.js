const nodePg = require('node-pg');
const logger = require('../helpers/logger');
const SystemSetting = require('vivu-common-api').models.SystemSetting;

class SystemSettingAdapter extends nodePg.adapters.Adapter {

  constructor() {
    super();
    this.log = logger.child({
      'namespace': 'postgres',
      'adapter': 'SystemSettingAdapter'
    });
  }

  get modelClass() {
    return SystemSetting;
  }

}

module.exports = SystemSettingAdapter;