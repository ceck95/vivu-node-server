const helpers = require('node-helpers');
const vivuCommon = require('vivu-common-api');
const settingSchema = vivuCommon.schemas.setting;
const slideSchema = vivuCommon.schemas.slide;
const BaseController = require('node-hapi').Controller;
const BPromise = require('bluebird');

class SettingController extends BaseController {

  getSetting(request, reply) {
    let slideStore = request.dataStore.getStore('Slide'),
      settingStore = request.dataStore.getStore('SystemSetting');
    return BPromise.all([slideStore.getAllActive(), settingStore.getAllActive()]).then(results => {

      const respSlide = results[0].map(e => {
        return slideStore.createModel(e).responseObject({
          schema: slideSchema.responseItem
        });
      });

      const getKey = (key) => {
        return results[1].filter(e => {
          return e.key === key;
        })[0].value;
      };

      return reply(helpers.Json.response(request, {
        meta: {
          message: 'Get setting successfully'
        },
        data: {
          slides: respSlide,
          setting: {
            appName: getKey('app_name')
          }
        }
      }));

    }).catch(err => {
      return helpers.HAPI.replyError(request, reply, err, {
        log: ['error', 'get setting']
      });
    });
  }

}

module.exports = SettingController;