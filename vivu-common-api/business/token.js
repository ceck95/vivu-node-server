/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-13T21:51:20+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-12T15:30:27+07:00
 */

'use strict';

const BPromise = require('bluebird');
const helpers = require('node-helpers');
const EmptyError = helpers.errors.EmptyError;

class TokenBusiness {

  createBearerToken(request, opts) {
    let tokenStore = request.dataStore.getStore('AccessToken');

    return new BPromise((resolve, reject) => {
      let token = helpers.Token.createBearerToken({
          hasRefreshToken: opts.hasRefreshToken,
          expiry: opts.expiry
        }),
        expiry = new Date();

      expiry.setSeconds(expiry.getSeconds() + token.expiresIn);

      let tokenModel = tokenStore.createModel({
        accessToken: token.accessToken,
        applicationId: opts.applicationId,
        expiresIn: expiry
      });

      if (token.refreshToken) {
        tokenModel.refreshToken = token.refreshToken;
      }
      tokenModel.userId = opts.rawCustomer.id;
      return tokenStore.upsertOne(tokenModel).then(() => {

        return resolve(token);

      }).catch(err => {

        return reject(err);

      });
    });

  }

  revokeTokens(request, params) {
    params = params || {};

    if (!params.applicationId) {
      let message = 'Application ID is empty',
        errors = new EmptyError({
          message: message,
          source: 'applicationId'
        });
      if (request) {
        request.log(['error', 'revoke-token'], message);
      }

      return BPromise.reject(errors);
    }

    let tokenStore = request.dataStore.getStore('AccessToken'),
      model = tokenStore.createModel(),
      query = model.toThriftQuery(params);

    return tokenStore.deleteMany(query);
  }

}

module.exports = new TokenBusiness();
