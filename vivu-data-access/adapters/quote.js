/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-13T11:21:35+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-20T16:18:00+07:00
 */

'use strict';

const nodePg = require('node-pg');
const logger = require('../helpers/logger');
const Quote = require('vivu-common-api').models.Quote;

class QuoteAdapter extends nodePg.adapters.Adapter {

  constructor() {
    super();
    this.log = logger.child({
      'namespace': 'postgres',
      'adapter': 'QuoteAdapter'
    });
  }

  get modelClass() {
    return Quote;
  }

}

module.exports = QuoteAdapter;
