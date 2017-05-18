/*
 * @Author: toan.nguyen
 * @Date:   2016-04-19 15:50:22
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-20T11:50:22+07:00
 */

'use strict';

const vivuCommon = require('vivu-common-api');
const nodeDataAccess = require('node-data-access');
const DataService = vivuCommon.thrift.vivu;

let server = new nodeDataAccess.Server();

server.init(DataService).then(() => {
  server.run(vivuCommon.config.server);
});
