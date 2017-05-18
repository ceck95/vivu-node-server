/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   04-08-16 11:2:6
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-10T10:56:18+07:00
 */



'use strict';

const nexxMongo = require('node-mongo');
const logger = require('../helpers/logger');
const dataCommon = require('vivu-common-api');
const ClientId = dataCommon.models.ClientId;

class ClientIdAdapter extends nexxMongo.adapters.Base {


  /**
   * Constructor, set default values
   */
  constructor() {
    super();

    this.log = logger.child({
      'namespace': 'mongo',
      'adapter': 'ClientIdAdapter'
    });
  }


  /**
   * Returns model class for current adapter
   *
   * @return {Object} Model class
   */
  get modelClass() {
    return ClientId;
  }

  /**
   * Returns primary key for group find around
   *
   * @return {String}
   */
  get primaryKey() {
    return 'clientId';
  }

}

module.exports = ClientIdAdapter;
