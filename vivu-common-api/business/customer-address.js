const BPromise = require('bluebird');
const helpers = require('node-helpers');
const options = helpers.ttypes.options;

class CustomerAddressBusiness {

  static getStringAddress(request, reply, opts) {
    let result = {
        country: '',
        province: '',
        district: '',
        ward: ''
      },
      getStore = (storeName) => {
        return request.dataStore.getStore(storeName);
      },
      countryStore = getStore('Country'),
      provinceStore = getStore('Province'),
      districtStore = getStore('District'),
      wardStore = getStore('Ward'),
      listPromise = [countryStore.getOneByCountryCode(opts.countryCode || request.config.i18n.country), provinceStore.getOneByProvinceCode(opts.provinceCode), districtStore.getOneByDistrictCode(opts.districtCode), wardStore.getOneByWardCode(opts.wardCode)];

    return BPromise.all(listPromise).then(results => {
      result = {
        country: results[0].countryCode,
        province: results[1].provinceCode,
        district: results[2].districtCode,
        ward: results[3].wardCode,
        fullName: `${request.payload.data.street},${results[3].type} ${results[3].name},${results[2].type} ${results[2].name},${results[1].type}  ${results[1].name},${results[0].name}`
      };

      return result;
    }).catch(err => {
      return err;
    });
  }

  static handleCustomerAddressDefault(request, reply, customerAddressId, update, func) {
    let customerAddressStore = request.dataStore.getStore('CustomerAddress');

    return customerAddressStore.getOneDefault().then(resp => {

      if (update ? resp.id === customerAddressId : false) {
        return func();
      }

      let formUpdateDefault = {
        id: resp.id,
        isDefault: false
      };
      return customerAddressStore.updateOne(customerAddressStore.createModel(formUpdateDefault), new options.SelectOptions()).then(() => {

        if (update) {
          return func();
        }
        return true;

      }).catch(err => {
        return helpers.HAPI.replyError(request, reply, err, {
          log: ['errors', 'update customer address default']
        });
      });

    }).catch(err => {
      return helpers.HAPI.replyError(request, reply, err, {
        log: ['errors', 'get default customer address']
      });
    });
  }

}

module.exports = CustomerAddressBusiness;