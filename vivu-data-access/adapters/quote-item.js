/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-13T11:21:35+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-22T15:34:14+07:00
 */

'use strict';

const nodePg = require('node-pg');
const logger = require('../helpers/logger');
const vivuCommon = require('vivu-common-api');
const QuoteItem = vivuCommon.models.QuoteItem;
const Product = vivuCommon.models.Product;
const ProductColor = vivuCommon.models.ProductColor;


class QuoteItemAdapter extends nodePg.adapters.Adapter {

  constructor() {
    super();
    this.log = logger.child({
      'namespace': 'postgres',
      'adapter': 'QuoteItemAdapter'
    });
  }

  get modelClass() {
    return QuoteItem;
  }

  sqlRelation(model, opts, where, args) {

    where = where || [];
    if (!Array.isArray(where)) {
      where = [where];
    }

    args = args || [];

    let includes = [],
      joins = [],
      product = new Product(),
      productColor = new ProductColor(),
      tableAlias = model.tableAlias;

    includes.push({
      alias: tableAlias,
      model: model
    });

    if (opts.includes) {

      if (opts.includes.indexOf(product.tableAlias) > -1) {
        let jCondition = ' LEFT JOIN ' + product.fullTableName + ' ' + product.tableAlias + ' ON ' + product.tableAlias + '.id = ' + tableAlias + '.product_id ';
        joins.push(jCondition);
        includes.push({
          alias: product.tableAlias,
          model: product
        });
      }


      if (opts.includes.indexOf(productColor.tableAlias) > -1) {
        let jCondition = ' LEFT JOIN ' + productColor.fullTableName + ' ' + productColor.tableAlias + ' ON ' + productColor.tableAlias + '.id = ' + tableAlias + '.selected_product_color_id ';
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

module.exports = QuoteItemAdapter;
