/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-13T11:21:35+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-27T16:02:19+07:00
 */

'use strict';

const nodePg = require('node-pg');
const logger = require('../helpers/logger');
const vivuCommon = require('vivu-common-api');
const Product = vivuCommon.models.Product;
const Category = vivuCommon.models.Category;
const CategoryGroup = vivuCommon.models.CategoryGroup;
const ProductColor = vivuCommon.models.ProductColor;
const helpers = require('node-helpers');

class ProductAdapter extends nodePg.adapters.Adapter {

  constructor() {
    super();
    this.log = logger.child({
      'namespace': 'postgres',
      'adapter': 'ProductAdapter'
    });
  }

  get modelClass() {
    return Product;
  }

  filterParams(params) {
    let model = new this.modelClass(),
      modelCategory = new Category(),
      modelCategoryGroup = new CategoryGroup(),
      tableAliasCategory = modelCategory.tableAlias,
      tableAliasCategoryGroup = modelCategoryGroup.tableAlias,
      tableAlias = model.tableAlias,
      paramCount = 1,
      where = [],
      args = [];

    if (params.name) {
      where.push(`${tableAlias}.name = $${paramCount++}`);
      args.push(params.name);
    }

    if (params.sku) {
      where.push(`${tableAlias}.sku = $${paramCount++}`);
      args.push(params.sku);
    }

    if (params.categoryId) {
      where.push(`${tableAliasCategory}.id IN (${params.categoryId})`);
    }

    if (params.categoryGroupId) {
      where.push(`${tableAliasCategoryGroup}.id IN (${params.categoryGroupId})`);
    }

    if (params.urlKeyCategory) {
      where.push(`${tableAliasCategory}.url_key = $${paramCount++}`);
      args.push(params.urlKeyCategory);
    }

    if (params.urlKeyCategoryGroup) {
      where.push(`${tableAliasCategoryGroup}.url_key = $${paramCount++}`);
      args.push(params.urlKeyCategoryGroup);
    }

    if (params.price ? params.price.length > 0 : false) {
      where.push(`${tableAlias}.base_price BETWEEN ${params.price[0]} AND ${params.price[1]} `);
    }

    if (params.search) {
      let toStringSplit = (str) => {
        let s = str.split(' ').join(`','`);
        return `'${s}'`;
      };
      where.push(`search && ARRAY[${toStringSplit(params.search)}] OR search_full && ARRAY[${toStringSplit(params.search)}]`);
    }

    where.push(`${tableAlias}.status = $${paramCount++}`);
    args.push(helpers.Const.status.ACTIVE);

    return {
      where: where,
      args: args
    };
  }

  sqlRelation(model, opts, where, args) {

    where = where || [];
    if (!Array.isArray(where)) {
      where = [where];
    }

    args = args || [];

    let includes = [],
      joins = [],
      category = new Category(),
      categoryGroup = new CategoryGroup(),
      productColor = new ProductColor(),
      tableAlias = model.tableAlias;

    includes.push({
      alias: tableAlias,
      model: model
    });

    if (opts.includes) {

      if (opts.includes.indexOf(category.tableAlias) > -1) {
        let jCondition = ' LEFT JOIN ' + category.fullTableName + ' ' + category.tableAlias + ' ON ' + category.tableAlias + '.id = ' + tableAlias + '.category_id ';
        joins.push(jCondition);
        includes.push({
          alias: category.tableAlias,
          model: category
        });
      }

      if (opts.includes.indexOf(categoryGroup.tableAlias) > -1) {
        let jCondition = ' LEFT JOIN ' + categoryGroup.fullTableName + ' ' + categoryGroup.tableAlias + ' ON ' + categoryGroup.tableAlias + '.id = ' + category.tableAlias + '.category_group_id ';
        joins.push(jCondition);
        includes.push({
          alias: categoryGroup.tableAlias,
          model: categoryGroup
        });
      }


      if (opts.includes.indexOf(productColor.tableAlias) > -1) {
        let jCondition = ' LEFT JOIN ' + productColor.fullTableName + ' ' + productColor.tableAlias + ' ON ' + productColor.tableAlias + '.product_id = ' + tableAlias + '.id ';
        joins.push(jCondition);
        includes.push({
          alias: productColor.tableAlias,
          model: productColor
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

}

module.exports = ProductAdapter;