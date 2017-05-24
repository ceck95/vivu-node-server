/*
 * @Author: toan.nguyen
 * @Date:   2016-08-04 09:23:52
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-22T09:26:07+07:00
 */

'use strict';

module.exports = {
  customer: require('../schemas/customer'),
  customerAddress: require('../schemas/customer-address'),
  country: require('../schemas/country'),
  product: require('../schemas/product'),
  category: require('../schemas/category'),
  categoryGroup: require('../schemas/category-group'),
  province: require('../schemas/province'),
  district: require('../schemas/district'),
  ward: require('../schemas/ward'),
  productColor: require('../schemas/product-color'),
  productColorPreviewImage: require('../schemas/product-color-preview-image'),
  quote: require('../schemas/quote'),
  quoteItem: require('../schemas/quote-item'),
  order: require('../schemas/order'),
  orderItem: require('../schemas/order-item'),
  orderPayment: require('../schemas/order-payment'),
  setting: require('../schemas/setting'),
  slide: require('../schemas/slide')
};