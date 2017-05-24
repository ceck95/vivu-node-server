const nodePg = require('node-pg');
const exceptionHelper = require('../helpers/exception');
const SlideAdapter = require('../adapters/slide');


class SlideService extends nodePg.services.Base {

  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return SlideAdapter;
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

module.exports = SlideService;