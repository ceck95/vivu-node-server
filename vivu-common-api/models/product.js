/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-22T22:21:13+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-27T21:37:28+07:00
 */

'use strict';

const helpers = require('node-helpers');
const productTypes = require('../gen-nodejs/product_types');
const Category = require('./category');
const CategoryGroup = require('./category-group');
const ProductColor = require('./product-color');

class Product extends helpers.models.Base {

  get tableName() {
    return 'product';
  }

  get paginationThriftClass() {
    return productTypes.PaginationProduct;
  }

  constructor(data, opts) {

    opts = opts || {};
    super(data, opts);

    this.id = null;
    this.categoryId = null;
    this.name = '';
    this.sku = '';
    this.metaDesc = {};
    this.notes = '';
    this.details = '';
    this.urlKey = '';
    this.imagePath = '';
    this.basePrice = null;
    this.isSoldOut = null;
    this.isProductColor = null;
    this.search = '';
    this.searchFull = '';

    if (data) {
      helpers.Model.assignData(this, data, opts);
      let category = new Category(),
        categoryGroup = new CategoryGroup(),
        productColor = new ProductColor();

      if (data.category) {
        this.category = data.category.getAttributes ? data.category : new Category(data.category);
      } else if (opts.includes ? opts.includes.indexOf(category.tableAlias) > -1 : false) {
        this.category = new Category(data, {
          prefix: category.tableAlias
        });
      }

      if (data.categoryGroup) {
        this.categoryGroup = data.categoryGroup.getAttributes ? data.categoryGroup : new CategoryGroup(data.categoryGroup);
      } else if (opts.includes ? opts.includes.indexOf(categoryGroup.tableAlias) > -1 : false) {
        this.categoryGroup = new CategoryGroup(data, {
          prefix: categoryGroup.tableAlias
        });
      }

      if (data.productColor) {
        this.productColor = data.productColor.getAttributes ? data.productColor : new ProductColor(data.productColor);
      } else if (opts.includes ? opts.includes.indexOf(productColor.tableAlias) > -1 : false) {
        this.productColor = new ProductColor(data, {
          prefix: productColor.tableAlias
        });
      }

    }
  }

  getAttributes() {
    return {
      id: this.id,
      category_id: this.categoryId,
      name: this.name,
      sku: this.sku,
      meta_desc: this.metaDesc,
      notes: this.notes,
      details: this.details,
      url_key: this.urlKey,
      image_path: this.imagePath,
      base_price: this.basePrice,
      is_sold_out: this.isSoldOut,
      status: this.status,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      created_by: this.createdBy,
      updated_by: this.updatedBy,
      is_product_color: this.isProductColor,
      search: this.search,
      search_full: this.searchFull
    };
  }

  applyThrift(model, opts) {
    super.applyThrift(model, opts);
    model.metaDesc = JSON.stringify(model.metaDesc);
    model.search = helpers.Data.toDataString(model.search);
    model.searchFull = helpers.Data.toDataString(model.searchFull);
  }

  toThriftObject(opts) {

    let model = new productTypes.Product();
    this.applyThrift(model, opts);
    if (this.category) {
      model.category = this.category.toThriftObject();
    }
    if (this.categoryGroup) {
      model.categoryGroup = this.categoryGroup.toThriftObject();
    }

    if (this.productColor) {
      model.productColor = this.productColor.toThriftObject();
    }

    return model;
  }

  toThriftFilter(opts) {

    let model = new productTypes.ProductFilter();
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

  get serviceActions() {
    return ['getManyByCategoryGroupHome', 'getOneProduct', 'getManyByCategory', 'getManyByCategoryDetail', 'getOneProductAndProductColor'];
  }

}

module.exports = Product;
