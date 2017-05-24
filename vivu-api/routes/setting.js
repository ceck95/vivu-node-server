const nodeHapi = require('node-hapi');
const settingController = require('../controllers/setting');
const helpers = require('node-helpers');
const Joi = require('joi');
const SchemaGenerator = helpers.SchemaGenerator;
const vivuCommon = require('vivu-common-api');
const settingSchema = vivuCommon.schemas.setting;
const slideSchema = vivuCommon.schemas.slide;

const settingRoutes = new nodeHapi.Route({
  basePath: 'settings',
  schemas: settingSchema,
  storeName: 'SystemSetting',
  controllerClass: settingController
});

settingRoutes.addRoute({
  method: 'GET',
  path: '/settings',
  config: {
    auth: 'merge_validate',
    handler: settingRoutes.controller.getSetting,
    description: 'Get setting',
    notes: 'Returns successful setting',
    tags: ['api', 'get', 'setting'],

    validate: {
      headers: helpers.Schema.mergeHeaders
    },
    response: {
      schema: SchemaGenerator.basicResponse({
        setting: settingSchema.response,
        slides: Joi.array().items(slideSchema.responseItem)
      })
    }
  }
});

module.exports = settingRoutes.routes;