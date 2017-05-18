/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-10T09:36:21+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-23T10:55:58+07:00
 */



'use strict';

const nodePg = require('node-pg');
const exceptionHelper = require('../helpers/exception');
const CategoryGroupAdapter = require('../adapters/category-group');


class CategoryGroupService extends nodePg.services.Base {

  /**
   * Adapter class for current service
   *
   * @return {Object} Adapter object
   */
  get adapterClass() {
    return CategoryGroupAdapter;
  }

  /**
   * Return exception handler
   *
   * @return {ExceptionHelper} Exception helpers
   */
  get exception() {
    return exceptionHelper;
  }

}

module.exports = CategoryGroupService;
