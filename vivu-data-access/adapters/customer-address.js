/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-13T11:21:35+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-20T11:16:49+07:00
 */

'use strict';

const nodePg = require('node-pg');
const logger = require('../helpers/logger');
const CustomerAddress = require('vivu-common-api').models.CustomerAddress;

class CustomerAddressAdapter extends nodePg.adapters.Adapter {

  constructor() {
    super();
    this.log = logger.child({
      'namespace': 'postgres',
      'adapter': 'CustomerAddressAdapter'
    });
  }

  get modelClass() {
    return CustomerAddress;
  }

}

module.exports = CustomerAddressAdapter;
