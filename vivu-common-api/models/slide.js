const helpers = require('node-helpers');
const SlideTypes = require('../gen-nodejs/slide_types');


class Slide extends helpers.models.Base {

  get tableName() {
    return 'slide';
  }

  get tableSchema() {
    return 'public';
  }

  constructor(data, opts) {

    opts = opts || {};
    super(data, opts);

    this.id = null;
    this.image = '';
    this.link = '';
    this.priority = null;

    if (data) {
      helpers.Model.assignData(this, data, opts);
    }

  }

  getAttributes() {

    return {
      id: this.id,
      image: this.image,
      link: this.link,
      priority: this.priority,
      status: this.status,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      created_by: this.createdBy,
      updated_by: this.updatedAt
    };

  }

  toThriftObject(opts) {

    let model = new SlideTypes.Slide();
    this.applyThrift(model, opts);
    return model;

  }

  //applyThrift(model,opts){
  //super.applyThrift(model,opts)
  //}

  toThriftInsert(opts) {

    let model = new SlideTypes.SlideInsert();
    this.applyThrift(model, opts);
    return model;

  }

  toThriftForm(opts) {

    let model = new SlideTypes.SlideForm();
    this.applyThrift(model, opts);
    return model;

  }

  responseObject(opts) {

    opts = opts || {};
    let result = helpers.Model.toObject(this, opts);
    return result;

  }

  //get serviceActions(){
  //return []
  //}

}

module.exports = Slide;