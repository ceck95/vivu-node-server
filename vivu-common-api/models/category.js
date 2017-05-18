/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-22T22:21:13+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-26T21:16:26+07:00
 */

'use strict';

const helpers = require('node-helpers');
const categoryTypes = require('../gen-nodejs/category_types');

class Category extends helpers.models.Base {

  get tableName() {
    return 'category';
  }

  constructor(data, opts) {

    opts = opts || {};
    super(data, opts);

    this.id = null;
    this.name = '';
    this.priority = null;
    this.notes = '';
    this.urlKey = '';
    this.metaDesc = {};
    this.categoryGroupId = null;


    if (data) {
      helpers.Model.assignData(this, data, opts);
    }
  }

  getAttributes() {
    return {
      id: this.id,
      name: this.name,
      priority: this.priority,
      url_key: this.urlKey,
      meta_desc: this.metaDesc,
      status: this.status,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      created_by: this.createdBy,
      updated_by: this.updatedBy,
      category_group_id: this.categoryGroupId
    };
  }

  applyThrift(model, opts) {
    super.applyThrift(model, opts);
    model.metaDesc = JSON.stringify(model.metaDesc);
  }

  toThriftObject(opts) {

    let model = new categoryTypes.Category();
    this.applyThrift(model, opts);

    return model;
  }

  responseObject(opts) {

    opts = opts || {};
    let result = helpers.Model.toObject(this, opts);

    if (helpers.Model.checkAvailableKey('metaDesc', opts)) {
      result.metaDesc = JSON.stringify(this.metaDesc);
    }

    return result;

  }

}

module.exports = Category;
