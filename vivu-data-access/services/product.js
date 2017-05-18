/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-10T09:36:21+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-27T16:15:07+07:00
 */



'use strict';

const nodePg = require('node-pg');
const exceptionHelper = require('../helpers/exception');
const ProductAdapter = require('../adapters/product');
const vivuCommon = require('vivu-common-api');
const ProductColor = vivuCommon.models.ProductColor;
const Product = vivuCommon.models.Product;
const CategoryGroup = vivuCommon.models.CategoryGroup;
const helpers = require('node-helpers');


class ProductService extends nodePg.services.Base {

  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return ProductAdapter;
  }

  /**
   * Return exception handler
   *
   * @return {ExceptionHelper} Exception helpers
   */
  get exception() {
    return exceptionHelper;
  }

  getManyByCategoryGroup(categoryGroupId, opts, result) {

    opts = opts || {};
    let categoryGroup = new CategoryGroup(),
      tableAlias = (new Product()).tableAlias;

    return this.getAllConditionRelation({
      where: [`${categoryGroup.tableAlias}.id = $1`, `${tableAlias}.status = ${helpers.Const.status.ACTIVE}`],
      args: [categoryGroupId],
      limit: opts.limit,
      order: opts.order
    }, opts, result);

  }

  getManyByCategory(categoryId, opts, result) {

    opts = opts || {};
    let tableAlias = (new Product()).tableAlias;

    return this.getAllCondition({
      where: ['category_id = $1', `${tableAlias}.status = ${helpers.Const.status.ACTIVE}`],
      args: [categoryId],
      limit: opts.limit,
      order: opts.order
    }, opts, result);

  }

  getOneProduct(urlKey, result) {

    return this.getOne({
      where: ['url_key = $1'],
      args: [urlKey]
    }, result);

  }

  getOneProductAndProductColor(productId, productColorId, opts, result) {

    let tableAliasProductColor = (new ProductColor()).tableAlias,
      tableAlias = (new Product()).tableAlias;
    opts = opts || {};

    return this.getOneRelation({
      where: [`${tableAlias}.id = $1`, `${tableAliasProductColor}.id = $2`],
      args: [productId, productColorId]
    }, opts, result);

  }

}

module.exports = ProductService;
