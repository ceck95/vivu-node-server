/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-12T23:19:03+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-22T09:18:09+07:00
 */



'use strict';

module.exports = {
  ClientId: require('../models/client-id'),
  AccessToken: require('../models/access-token'),
  Customer: require('../models/customer'),
  CustomerAddress: require('../models/customer-address'),
  Country: require('../models/country'),
  Product: require('../models/product'),
  ProductColor: require('../models/product-color'),
  ProductColorPreviewImage: require('../models/product-color-preview-image'),
  Category: require('../models/category'),
  CategoryGroup: require('../models/category-group'),
  District: require('../models/district'),
  Province: require('../models/province'),
  Ward: require('../models/ward'),
  Quote: require('../models/quote'),
  QuoteItem: require('../models/quote-item'),
  QuotePayment: require('../models/quote-payment'),
  Order: require('../models/order'),
  OrderItem: require('../models/order-item'),
  OrderPayment: require('../models/order-payment'),
  OrderStatusHistory: require('../models/order-status-history'),
  SystemSetting: require('../models/system-setting'),
  Slide: require('../models/slide')
};