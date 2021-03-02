const BaseController = require('./base');

/**
 * @controller 操作使用
 */
class OperationController extends BaseController {
  /**
   * @summary 发送文本
   * @description 发送需要加密或解密的文本
   * @Router post /api/operation/submit
   * @Request body getOpera * body
   * @Response 200 getOpera 返回结果
   */
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