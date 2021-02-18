const BaseController = require('./base');

class OperationController extends BaseController {
  async submit() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    const result = await ctx.service.operation.submit(body);
    if (!!result.code && result.code != 200) {
      this.result(null, 4001, false, '操作失败');
    } else {
      this.result(result);
    }
  }
}

module.exports = OperationController;