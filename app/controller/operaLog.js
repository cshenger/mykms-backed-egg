'use strict';

const BaseController = require('./base');

class OperaLogController extends BaseController {
  async list() {
    const ctx = this.ctx;
    const params = ctx.query;
    const records = await ctx.service.operaLog.list(params);
    this.result(records);
  }
}

module.exports = OperaLogController;