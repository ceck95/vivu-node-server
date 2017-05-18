/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-13T11:21:35+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-21T13:58:55+07:00
 */

'use strict';

const nodePg = require('node-pg');
const logger = require('../helpers/logger');
const commonVivu = require('vivu-common-api');
const Customer = commonVivu.models.Customer;
const CustomerAddress = commonVivu.models.CustomerAddress;
const BPromise = require('bluebird');

class CustomerAdapter extends nodePg.adapters.Adapter {

  constructor() {
    super();
    this.log = logger.child({
      'namespace': 'postgres',
      'adapter': 'CustomerAdapter'
    });
  }

  get modelClass() {
    return Customer;
  }

  sqlRelation(model, opts, where, args) {

    where = where || [];
    if (!Array.isArray(where)) {
      where = [where];
    }

    args = args || [];

    let includes = [],
      joins = [],
      customerAddress = new CustomerAddress(),
      tableAlias = model.tableAlias;

    includes.push({
      alias: tableAlias,
      model: model
    });

    if (opts.includes) {

      if (opts.includes.indexOf(customerAddress.tableAlias) > -1) {
        let jCondition = 'RIGHT JOIN ' + customerAddress.fullTableName + ' ' + customerAddress.tableAlias + ' ON ' + customerAddress.tableAlias + '.customer_id = ' + tableAlias + '.id ';
        joins.push(jCondition);
        includes.push({
          alias: customerAddress.tableAlias,
          model: customerAddress
        });
      }

    }


    let result = {
      joins: joins,
      includes: includes,
      where: where,
      args: args
    };

    return result;

  }

  changePassword(id, password) {

    let self = this,
      model = new this.modelClass(),
      tableName = model.fullTableName;

    return self.checkEmpty([{
      value: id,
      message: 'User ID is empty. Cannot change password ' + tableName,
      source: 'uid'
    }]).then(() => {
      let sql = 'UPDATE ' + model.fullTableName + ' SET password_hash=$1 WHERE id=$2;',
        args = [password, id];

      self.log.debug('Update SQL', sql, 'Args', args);

      return self.query(sql, args).then(result => {
        self.log.debug('Change password successfully. Count: ', result.rowCount);
        return BPromise.resolve(result.rowCount);
      });
    });

  }

}

module.exports = CustomerAdapter;
