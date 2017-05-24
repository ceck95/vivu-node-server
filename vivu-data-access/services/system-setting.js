const nodePg = require('node-pg');
const exceptionHelper = require('../helpers/exception');
const SystemSettingAdapter = require('../adapters/system-setting');


class SystemSettingService extends nodePg.services.Base {

  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return SystemSettingAdapter;
  }

  /**
   * Return exception handler
   *
   * @return {ExceptionHelper} Exception helpers
   */
  get exception() {
    return exceptionHelper;
  }

}

module.exports = SystemSettingService;