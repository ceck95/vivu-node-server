/*
 * @Author: toan.nguyen
 * @Date:   2016-05-23 01:49:13
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-13T09:33:35+07:00
 */

'use strict';

const helpers = require('node-helpers');
const accessTokenTypes = require('../gen-nodejs/access_token_types');

class AccessToken extends helpers.models.Mongo {

  /**
   * Return collection name of database
   *
   * @return {string}
   */
  get collectionName() {
    return 'accessToken';
  }

  /**
   * Constructor, set default data
   *
   * @param  {Object} data Raw data object
   *
   */
  constructor(data) {
    super(data);

    this.accessToken = null;
    this.applicationId = null;
    this.expiresIn = null;
    this.userId = null;
    this.refreshToken = null;
    this.createdAt = null;
    this.updatedAt = null;

    if (data) {
      helpers.Model.assignCamelCase(this, data);
    }
  }

  /**
   * Before save event
   */
  beforeSave(isNewRecord) {

    if (helpers.Data.isEmpty(this.createdAt)) {
      this.createdAt = new Date();
    } else if (!helpers.Data.isDate(this.createdAt)) {
      this.createdAt = new Date(this.createdAt);
    }

    if (!helpers.Data.isDate(this.expiresIn)) {
      this.expiresIn = new Date(this.expiresIn);
    }

    this.updatedAt = new Date();
  }

  /**
   * Applies thrift model
   *
   * @param  {Object} model Thrift model
   * @param  {Object} opts  Option data
   */
  applyThrift(model, opts) {

    helpers.Model.assignCamelCase(model, this, opts);

    if (model.expiresIn) {
      model.expiresIn = helpers.Data.toUtcString(this.expiresIn);
    }

    if (model.createdAt) {
      model.createdAt = helpers.Data.toUtcString(this.createdAt);
    }

    if (model.updatedAt) {
      model.updatedAt = helpers.Data.toUtcString(this.updatedAt);
    }
  }

  /**
   * To thrift object
   *
   * @return {accessTokenTypes.AccessToken} Thrift object
   */
  toThriftObject(opts) {
    let result = new accessTokenTypes.AccessToken();

    this.applyThrift(result, opts);

    return result;
  }

  /**
   * To thrift insert object
   *
   * @return {driverTypes.DriverActivity} Thrift object
   */
  toThriftInsert(opts) {
    let result = new accessTokenTypes.AccessTokenInsert();

    this.applyThrift(result, opts);

    return result;
  }

  /**
   * To thrift form object
   *
   * @return {driverTypes.DriverActivity} Thrift object
   */
  toThriftForm(opts) {
    let result = new accessTokenTypes.AccessTokenForm();

    this.applyThrift(result, opts);
    return result;
  }

  /**
   * To thrift query object
   *
   * @return {driverTypes.DriverActivity} Thrift object
   */
  toThriftQuery(data, opts) {
    data = data || this;
    let result = new accessTokenTypes.AccessTokenQuery();

    helpers.Model.assignCamelCase(result, data, opts);

    return result;
  }


  /**
   * Convert to insert object
   *
   * @return {Object} Insert object
   */
  toInsertObject() {

    let requestDoc = helpers.Model.toSimpleObject(this);

    return requestDoc;
  }

  /**
   * Convert to form object
   *
   * @return {Object} Insert object
   */
  toFormObject() {

    let requestDoc = {
      accessToken: this.accessToken,
      expiresIn: this.expiresIn,
      refreshToken: this.refreshToken,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
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
      accessToken: this.accessToken,
      expiresIn: this.expiresIn,
      refreshToken: this.refreshToken,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });

    let requestDoc = {
      $set: updateParams,
      $setOnInsert: {
        applicationId: this.applicationId,
        userId: this.userId,
      }
    };

    return requestDoc;
  }

  /**
   * Returns all service action strings
   *
   * @return {Array}
   */
  // get serviceActions() {
  //   return [];
  // }
}


module.exports = AccessToken;
