//
// Autogenerated by Thrift Compiler (0.9.3)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;

var product_ttypes = require('./product_types')
var product_color_ttypes = require('./product_color_types')


var ttypes = module.exports = {};
if (typeof vv === 'undefined') {
  vv = {};
}
if (typeof vv.models === 'undefined') {
  vv.models = {};
}
vv.models.OrderItem = module.exports.OrderItem = function(args) {
  this.id = null;
  this.orderId = null;
  this.productId = null;
  this.selectedProductColorId = null;
  this.quantity = null;
  this.basePrice = null;
  this.product = null;
  this.productColor = null;
  this.quoteItemId = null;
  if (args) {
    if (args.id !== undefined && args.id !== null) {
      this.id = args.id;
    }
    if (args.orderId !== undefined && args.orderId !== null) {
      this.orderId = args.orderId;
    }
    if (args.productId !== undefined && args.productId !== null) {
      this.productId = args.productId;
    }
    if (args.selectedProductColorId !== undefined && args.selectedProductColorId !== null) {
      this.selectedProductColorId = args.selectedProductColorId;
    }
    if (args.quantity !== undefined && args.quantity !== null) {
      this.quantity = args.quantity;
    }
    if (args.basePrice !== undefined && args.basePrice !== null) {
      this.basePrice = args.basePrice;
    }
    if (args.product !== undefined && args.product !== null) {
      this.product = new product_ttypes.Product(args.product);
    }
    if (args.productColor !== undefined && args.productColor !== null) {
      this.productColor = new product_color_ttypes.ProductColor(args.productColor);
    }
    if (args.quoteItemId !== undefined && args.quoteItemId !== null) {
      this.quoteItemId = args.quoteItemId;
    }
  }
};
vv.models.OrderItem.prototype = {};
vv.models.OrderItem.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.id = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.orderId = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.productId = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.I32) {
        this.selectedProductColorId = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.I32) {
        this.quantity = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.DOUBLE) {
        this.basePrice = input.readDouble();
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.STRUCT) {
        this.product = new product_ttypes.Product();
        this.product.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 8:
      if (ftype == Thrift.Type.STRUCT) {
        this.productColor = new product_color_ttypes.ProductColor();
        this.productColor.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 9:
      if (ftype == Thrift.Type.I32) {
        this.quoteItemId = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

vv.models.OrderItem.prototype.write = function(output) {
  output.writeStructBegin('OrderItem');
  if (this.id !== null && this.id !== undefined) {
    output.writeFieldBegin('id', Thrift.Type.I32, 1);
    output.writeI32(this.id);
    output.writeFieldEnd();
  }
  if (this.orderId !== null && this.orderId !== undefined) {
    output.writeFieldBegin('orderId', Thrift.Type.I32, 2);
    output.writeI32(this.orderId);
    output.writeFieldEnd();
  }
  if (this.productId !== null && this.productId !== undefined) {
    output.writeFieldBegin('productId', Thrift.Type.I32, 3);
    output.writeI32(this.productId);
    output.writeFieldEnd();
  }
  if (this.selectedProductColorId !== null && this.selectedProductColorId !== undefined) {
    output.writeFieldBegin('selectedProductColorId', Thrift.Type.I32, 4);
    output.writeI32(this.selectedProductColorId);
    output.writeFieldEnd();
  }
  if (this.quantity !== null && this.quantity !== undefined) {
    output.writeFieldBegin('quantity', Thrift.Type.I32, 5);
    output.writeI32(this.quantity);
    output.writeFieldEnd();
  }
  if (this.basePrice !== null && this.basePrice !== undefined) {
    output.writeFieldBegin('basePrice', Thrift.Type.DOUBLE, 6);
    output.writeDouble(this.basePrice);
    output.writeFieldEnd();
  }
  if (this.product !== null && this.product !== undefined) {
    output.writeFieldBegin('product', Thrift.Type.STRUCT, 7);
    this.product.write(output);
    output.writeFieldEnd();
  }
  if (this.productColor !== null && this.productColor !== undefined) {
    output.writeFieldBegin('productColor', Thrift.Type.STRUCT, 8);
    this.productColor.write(output);
    output.writeFieldEnd();
  }
  if (this.quoteItemId !== null && this.quoteItemId !== undefined) {
    output.writeFieldBegin('quoteItemId', Thrift.Type.I32, 9);
    output.writeI32(this.quoteItemId);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

vv.models.OrderItemInsert = module.exports.OrderItemInsert = function(args) {
  this.orderId = null;
  this.productId = null;
  this.selectedProductColorId = null;
  this.quantity = null;
  this.basePrice = null;
  this.quoteItemId = null;
  if (args) {
    if (args.orderId !== undefined && args.orderId !== null) {
      this.orderId = args.orderId;
    }
    if (args.productId !== undefined && args.productId !== null) {
      this.productId = args.productId;
    }
    if (args.selectedProductColorId !== undefined && args.selectedProductColorId !== null) {
      this.selectedProductColorId = args.selectedProductColorId;
    }
    if (args.quantity !== undefined && args.quantity !== null) {
      this.quantity = args.quantity;
    }
    if (args.basePrice !== undefined && args.basePrice !== null) {
      this.basePrice = args.basePrice;
    }
    if (args.quoteItemId !== undefined && args.quoteItemId !== null) {
      this.quoteItemId = args.quoteItemId;
    }
  }
};
vv.models.OrderItemInsert.prototype = {};
vv.models.OrderItemInsert.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.orderId = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.productId = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.selectedProductColorId = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.DOUBLE) {
        this.quantity = input.readDouble();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.DOUBLE) {
        this.basePrice = input.readDouble();
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.I32) {
        this.quoteItemId = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

vv.models.OrderItemInsert.prototype.write = function(output) {
  output.writeStructBegin('OrderItemInsert');
  if (this.orderId !== null && this.orderId !== undefined) {
    output.writeFieldBegin('orderId', Thrift.Type.I32, 1);
    output.writeI32(this.orderId);
    output.writeFieldEnd();
  }
  if (this.productId !== null && this.productId !== undefined) {
    output.writeFieldBegin('productId', Thrift.Type.I32, 2);
    output.writeI32(this.productId);
    output.writeFieldEnd();
  }
  if (this.selectedProductColorId !== null && this.selectedProductColorId !== undefined) {
    output.writeFieldBegin('selectedProductColorId', Thrift.Type.I32, 3);
    output.writeI32(this.selectedProductColorId);
    output.writeFieldEnd();
  }
  if (this.quantity !== null && this.quantity !== undefined) {
    output.writeFieldBegin('quantity', Thrift.Type.DOUBLE, 4);
    output.writeDouble(this.quantity);
    output.writeFieldEnd();
  }
  if (this.basePrice !== null && this.basePrice !== undefined) {
    output.writeFieldBegin('basePrice', Thrift.Type.DOUBLE, 5);
    output.writeDouble(this.basePrice);
    output.writeFieldEnd();
  }
  if (this.quoteItemId !== null && this.quoteItemId !== undefined) {
    output.writeFieldBegin('quoteItemId', Thrift.Type.I32, 6);
    output.writeI32(this.quoteItemId);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

vv.models.OrderItemForm = module.exports.OrderItemForm = function(args) {
  this.id = null;
  this.quantity = null;
  this.basePrice = null;
  this.status = null;
  if (args) {
    if (args.id !== undefined && args.id !== null) {
      this.id = args.id;
    }
    if (args.quantity !== undefined && args.quantity !== null) {
      this.quantity = args.quantity;
    }
    if (args.basePrice !== undefined && args.basePrice !== null) {
      this.basePrice = args.basePrice;
    }
    if (args.status !== undefined && args.status !== null) {
      this.status = args.status;
    }
  }
};
vv.models.OrderItemForm.prototype = {};
vv.models.OrderItemForm.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.id = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.quantity = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.DOUBLE) {
        this.basePrice = input.readDouble();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.I32) {
        this.status = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

vv.models.OrderItemForm.prototype.write = function(output) {
  output.writeStructBegin('OrderItemForm');
  if (this.id !== null && this.id !== undefined) {
    output.writeFieldBegin('id', Thrift.Type.I32, 1);
    output.writeI32(this.id);
    output.writeFieldEnd();
  }
  if (this.quantity !== null && this.quantity !== undefined) {
    output.writeFieldBegin('quantity', Thrift.Type.I32, 2);
    output.writeI32(this.quantity);
    output.writeFieldEnd();
  }
  if (this.basePrice !== null && this.basePrice !== undefined) {
    output.writeFieldBegin('basePrice', Thrift.Type.DOUBLE, 3);
    output.writeDouble(this.basePrice);
    output.writeFieldEnd();
  }
  if (this.status !== null && this.status !== undefined) {
    output.writeFieldBegin('status', Thrift.Type.I32, 4);
    output.writeI32(this.status);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};
