/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   04-08-16 10:27:51
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-16T15:39:26+07:00
 */



'use strict';

const helpers = require('node-helpers');
const clientIdTypes = require('../gen-nodejs/client_id_types');


class ClientId extends helpers.models.Mongo {

  /**
   * Return collection name of database
   *
   * @return {string}
   */
  get collectionName() {
    return 'clientId';
  }

  /**
   * Constructor, set default data
   *
   * @param  {Object} data Raw data object
   *
   */
  constructor(data) {
    super(data);

    this.clientId = '';
    this.status = null;
    this.createdAt = new Date();
    this.updatedAt = '';
    this.expiry = null;
    this.applicationId = null;

    if (data) {
      helpers.Model.assignData(this, data);
    }
  }

  /**
   * Before save event
   */
  beforeSave(isNewRecord) {
    if (typeof(this.createdAt) !== 'object') {
      this.createdAt = new Date(this.createdAt);
    } else if (helpers.Data.isEmpty(this.createdAt)) {
      this.createdAt = new Date();
    }
    if (isNewRecord) {
      this.status = 1;
      if (typeof(this.createdAt) !== 'object') {
        this.createdAt = new Date(this.createdAt);
      } else if (helpers.Data.isEmpty(this.createdAt)) {
        this.createdAt = new Date();
      }
    }
  }

  /**
   * Set location with new point
   * Calculate new trip distance
   *
   * @param {Object} p New point data
   */

  /**
   * To thrift object
   *
   * @return {driverTypes.DriverActivity} Thrift object
   */
  toThriftObject(opts) {
    let result = new clientIdTypes.ClientId();

    helpers.Model.assignData(result, this, opts);
    result.createdAt = helpers.Data.toUtcString(this.createdAt);

    return result;
  }

  /**
   * To thrift insert object
   *
   * @return {driverTypes.DriverActivity} Thrift object
   */
  toThriftInsert(opts) {
    let result = new clientIdTypes.ClientIdInsert();
    helpers.Model.assignData(result, this, opts);

    result.createdAt = helpers.Data.toUtcString(this.createdAt);

    return result;
  }

  /**
   * To thrift form object
   *
   * @return {driverTypes.DriverActivity} Thrift object
   */
  toThriftForm(opts) {
    let result = new clientIdTypes.ClientIdForm();
    helpers.Model.assignData(result, this, opts);

    result.createdAt = helpers.Data.toUtcString(this.createdAt);
    return result;
  }

  /**
   * To thrift query object
   *
   * @return {driverTypes.DriverActivity} Thrift object
   */
  toThriftQuery(opts) {
    let result = new clientIdTypes.ClientIdQuery();

    helpers.Model.assignData(result, this, opts);

    return result;
  }


  /**
   * Convert to insert object
   *
   * @return {Object} Insert object
   */
  toInsertObject() {

    let requestDoc = {
      clientId: this.clientId,
      applicationId: this.applicationId,
      expiry: this.expiry,
      createdAt: this.createdAt,
      status: this.status || 0
    };

    return requestDoc;
  }

  /**
   * Convert to form object
   *
   * @return {Object} Insert object
   */
  toFormObject() {

    let requestDoc = {
      clientId: this.clientId,
      createdAt: this.createdAt,
      status: this.status
    };

    return helpers.Model.toSimpleObject(requestDoc);
  }

  /**
   * Convert to insert object
   *
   * @return {Object} Insert object
   */
  toUpsertObject() {

    let updateParams = helpers.Model.toSimpleObject({
      clientId: this.clientId,
      applicationId: this.applicationId,
      expiry: this.expiry
    });


    let requestDoc = {
      $set: updateParams,
      $setOnInsert: updateParams
    };

    return requestDoc;
  }


  responseObject(opts) {

    opts = opts || {};
    let result = helpers.Model.toObject(this, opts);

    return result;
  }

}



module.exports = ClientId;
