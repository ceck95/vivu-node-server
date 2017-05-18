/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-23T11:25:26+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-23T11:25:54+07:00
 */



'use strict';

const config = require('./helpers/config');
const errorHelpers = require('./helpers/error');
const languageHelpers = require('./helpers/language');

module.exports = {
  config: config,
  models: require('./includes/models'),
  ttypes: require('./includes/ttypes'),
  schemas: require('./includes/schemas'),
  business: require('./includes/business'),
  thrift: {
    vivu: require('./gen-nodejs/VIVUDataService')
  },
  helpers: {
    error: errorHelpers,
    language: languageHelpers
  },

  resources: {
    default: require('./resources/default')
  }
};
