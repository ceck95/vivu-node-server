const nodePg = require('node-pg');
const logger = require('../helpers/logger');
const vivuCommon = require('vivu-common-api');
const OrderItem = vivuCommon.models.OrderItem;
const Product = vivuCommon.models.Product;
const ProductColor = vivuCommon.models.ProductColor;

class OrderItemAdapter extends nodePg.adapters.Adapter {

  constructor() {
    super();
    this.log = logger.child({
      'namespace': 'postgres',
      'adapter': 'OrderItemAdapter'
    });
  }

  get modelClass() {
    return OrderItem;
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

module.exports = OrderItemAdapter;