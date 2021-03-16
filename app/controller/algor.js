const BaseController = require('./base');

/**
 * @controller 算法管理
 */

class AlgorController extends BaseController {
  // 查询列表
  /**
   * @summary 算法列表
   * @description 所有算法的列表
   * @router get /api/algor/list
   ** @request query string name 算法名称
   ** @request query string status 启停状态
   * @response 200 algorList 返回结果
   */
  async list() {
    const ctx = this.ctx;
    const params = ctx.query;
    const records = await ctx.service.algor.list(params);
    this.result(records);
  }

  // 修改状态
  /**
   * @summary 修改状态
   * @description 修改算法的启停状态
   * @Router put /api/alogor/toggle
   * @Request body toggleAlgor * body
   * @Response 200 baseRespnse 返回结果
   */
  async toggle() {
    const body = this.ctx.request.body;
    const result = await this.ctx.service.algor.toggle(body);
    if (!!result.code && result.code != 200) {
      // 插入操作文档
      await this.ctx.service.home.addOperaLog({
        url: '/app/algor/toggle',
        method: 'PUT',
        action: '修改',
        status: 0
      });
      this.result(null, result.code, result.success, result.message);
    } else {
      // 插入操作文档
      await this.ctx.service.home.addOperaLog({
        url: '/app/algor/toggle',
        method: 'PUT',
        action: '修改',
        status: 1
      });
      this.result(result);
    }
  }
}

module.exports = AlgorController;