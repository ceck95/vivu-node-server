/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-20T16:18:21+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-24T08:27:44+07:00
 */


'use strict';

const nodePg = require('node-pg');
const helpers = require('node-helpers');
const exceptionHelper = require('../helpers/exception');
const QuoteItemAdapter = require('../adapters/quote-item');
const vivuCommon = require('vivu-common-api');
const QuoteItem = vivuCommon.models.QuoteItem;


class QuoteItemService extends nodePg.services.Base {

  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return QuoteItemAdapter;
  }

  /**
   * Return exception handler
   *
   * @return {ExceptionHelper} Exception helpers
   */
  get exception() {
    return exceptionHelper;
  }

  getOneByProductAndProductColor(productId, productColorId, quoteId, result) {
    let tableAlias = (new QuoteItem()).tableAlias;
    return this.getOne({
      where: ['product_id=$1', 'selected_product_color_id = $2', 'quote_id=$3', `${tableAlias}.status = $4`],
      args: [productId, productColorId, quoteId, helpers.Const.status.ACTIVE]
    }, result);
  }

  getManyByQuote(quoteId, opts, result) {
    opts = opts || {};
    let model = new QuoteItem();
    opts.prefix = model.tableAlias;

    return this.responseMany(this.adapter.getAllConditionRelation({
      where: ['quote_id = $1', `${model.tableAlias}.status = $2`],
      args: [quoteId, helpers.Const.status.ACTIVE]
    }, opts), opts, result);
  }

}

module.exports = QuoteItemService;
