/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-12T23:16:44+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-12T23:17:29+07:00
 */



'use strict';

const helpers = require('node-helpers');

class Ward extends helpers.models.Ward {

  /**
   * Return table name of model
   *
   * @return {String} table name
   */
  get tableName() {
    return 'gis_ward';
  }

  /**
   * Return table schema name
   *
   * @return {String} Schema name
   */
  get tableSchema() {
    return 'public';
  }

  get serviceActions() {
    return ['getOneByWardCode', 'getManyByDistrict'];
  }

}

module.exports = Ward;
