const BaseController = require('./base');

class AlgorController extends BaseController {
  // 查询列表
  async list() {
    const ctx = this.ctx;
    const params = ctx.query;
    const records = await ctx.service.algor.list(params);
    this.result(records);
  }

  // 修改状态
  async toggle() {
    const body = this.ctx.request.body;
    const result = await this.ctx.service.algor.toggle(body);
    if (!!result.code && result.code != 200) {
      this.result(null, result.code, result.success, result.message);
    } else {
      this.result(result);
    }
  }
}

module.exports = AlgorController;