/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-12T23:16:44+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-12T23:17:21+07:00
 */



'use strict';

const helpers = require('node-helpers');

class Province extends helpers.models.Province {

  /**
   * Return table name of model
   *
   * @return {String} table name
   */
  get tableName() {
    return 'gis_province';
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
    return ['getOneByProvinceCode', 'getManyByCountry'];
  }

}

module.exports = Province;
