const nodePg = require('node-pg');
const logger = require('../helpers/logger');
const Slide = require('vivu-common-api').models.Slide;

class SlideAdapter extends nodePg.adapters.Adapter {

  constructor() {
    super();
    this.log = logger.child({
      'namespace': 'postgres',
      'adapter': 'SlideAdapter'
    });
  }

  get modelClass() {
    return Slide;
  }

}

module.exports = SlideAdapter;