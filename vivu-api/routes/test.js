const nodeHapi = require('node-hapi');
const testController = require('../controllers/test');
const helpers = require('node-helpers');
const Joi = require('joi');
const SchemaGenerator = helpers.SchemaGenerator;
const tokenSchema = require('../schemas/token');

const testRoutes = new nodeHapi.Route({
  basePath: 'tests',
  controllerClass: testController,
  storeName: 'Quote',
  schemas: tokenSchema
});

testRoutes.addRoute({
  method: 'POST',
  path: '/tests',
  config: {
    // auth: 'validate_basic',
    handler: testRoutes.controller.test,
    description: 'Request test',
    notes: 'Returns a test',
    tags: ['api', 'test'],
    validate: {
      // headers: helpers.Schema.basicHeaders,
      payload: {
        data: {
          link: Joi.string(),
          categoryId: Joi.number()
        }
      }
    },
    response: {
      schema: SchemaGenerator.basicResponse()
    },
  }
});

module.exports = testRoutes.routes;