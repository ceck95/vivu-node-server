/*
 * @Author: toan.nguyen
 * @Date:   2016-07-27 17:31:23
* @Last modified by:   nhutdev
* @Last modified time: 2016-10-16T20:07:12+07:00
 */

'use strict';

const helpers = require('node-helpers');
const bookingTypes = require('../gen-nodejs/booking_types');

class BookingFilter {

  /**
   * Contructor, defines properies
   *
   * @param {Object} data Input data
   */
  constructor(data, opts) {

    this.status = '';
    this.bookingStatus = '';
    this.cleanerId = '';
    this.customerId = '';
    this.checkDateBooking = false;
    this.qualificationLevel = null;

    if (data) {
      helpers.Model.assignData(this, data, opts);
    }
  }

  /**
   * Converts to thrift object
   *
   * @return {[type]} [description]
   */
  toThriftObject(opts) {
    let form = new bookingTypes.BookingSearch();

    helpers.Model.assignCamelCase(form, this, opts);

    form.cleanerId = helpers.Data.toDataString(form.cleanerId);
    form.customerId = helpers.Data.toDataString(form.customerId);
    form.bookingStatus = helpers.Data.toDataString(form.bookingStatus);
    form.status = helpers.Data.toDataString(form.status);

    return form;
  }
}

module.exports = BookingFilter;
