/*
 * @Author: toan.nguyen
 * @Date:   2016-06-17 15:43:47
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-20T12:06:39+07:00
 */

'use strict';

const BPromise = require('bluebird');
const helpers = require('node-helpers');

const nodeMongo = require('node-mongo');
const AccessToken = require('vivu-common-api').models.AccessToken;
const logger = require('../helpers/logger');

class AccessTokenAdapter extends nodeMongo.adapters.Base {

  constructor() {
    super();

    this.log = logger.child({
      'namespace': 'mongo',
      'adapter': 'AccessTokenAdapter'
    });
  }

  /**
   * Returns model class for current adapter
   *
   * @return {Object} Model class
   */
  get modelClass() {
    return AccessToken;
  }

  /**
   * Returns collection log name
   *
   * @return {String} Collection log name
   */
  getCollectionLogName(model) {
    return model.collectionName + 'Log';
  }

  /**
   * Upserts document into database
   *
   * @param  {Object} model Input model data
   *
   * @return {Promise}      Inserts promise
   */
  upsertOne(model) {

    let self = this,
      insertModel = new self.modelClass(model);

    return self.connect().then((db) => {
      let collection = db.collection(insertModel.collectionName),
        logCollection = db.collection(self.getCollectionLogName(insertModel));

      let params = helpers.Model.toSimpleObject({
          userId: insertModel.userId,
          applicationId: insertModel.applicationId,
        }),
        requestLogDoc = insertModel.toInsertObject(),
        requestDoc = insertModel.toUpsertObject();

      self.log.debug('Upsert AccessToken model ', requestDoc);

      // insert activity log
      logCollection.insertOne(requestLogDoc).then(result => {
        self.log.debug('Insert AccessToken Log model successfully', result.insertedId);
      }).catch((e) => {
        self.catchException(self, e, 'Insert AccessToken Log model failed', requestLogDoc);
      });

      return collection.updateOne(params, requestDoc, {
        upsert: true
      }).then(result => {
        self.log.debug('Upsert AccessToken successfully');
        if (result.upsertedId) {
          insertModel.uid = result.upsertedId._id.toString();
        }

        return BPromise.resolve(insertModel);
      });
    });
  }

}

module.exports = AccessTokenAdapter;
