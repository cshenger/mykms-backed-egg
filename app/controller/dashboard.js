const BaseController = require('./base');
const {
  secret
} = require('../../config/others');

/**
 * @controller 首页
 */

class DashboardController extends BaseController {
  // 获取用户分布
  /**
   * @summary 获取用户分布
   * @description 系统管路员可以查看用户角色分布
   * @router get /api/dashboard/userroles
   * @request path
   * @response 200 userroles 返回结果
   */
  async userroles() {
    const data = await this.ctx.service.dashboard.userroles();
    this.result(data);
  }

  // 待办事项
  /**
   * @summary 待办事项
   * @description 获取用户待办事项，不同角色看到的待办不同
   * @router get /api/dashboard/todoList
   * @request path
   * @response 200 todoList 返回结果
   */
  async todoList() {
    const ctx = this.ctx;
    const token = ctx.request.header.authorization;
    const decode = ctx.app.jwt.verify(token, secret);
    let params = {
      loginName: decode.loginName
    }
    const todos = await this.ctx.service.dashboard.todoList(params);
    this.result(todos);
  }

  // 密钥算法统计
  /**
   * @summary 密钥算法统计
   * @description 密钥管理员可查看不同算法的密钥数量
   * @router get /api/dashboard/algorKeys
   * @request query string createUser 密钥创建人
   * @response 200 algorKeys 返回结果
   */
  async algorKeys() {
    const ctx = this.ctx;
    const params = ctx.query;
    const result = await ctx.service.dashboard.algorKeys(params);
    this.result(result);
  }

  // 密钥状态统计
  /**
   * @summary 密钥状态统计
   * @description 密钥审核员可查看不同算法的密钥的状态
   * @router get /api/dashboard/statusKeys
   * @request query string auditUser 密钥审核人
   * @response 200 statusKeys 返回结果
   */
  async statusKeys() {
    const ctx = this.ctx;
    const params = ctx.query;
    const result = await ctx.service.dashboard.statusKeys(params);
    this.result(result);
  }

  // 密钥日期趋势
  /**
   * @summary 密钥日期趋势
   * @description 用户可根据日期和具体用户查看每月密钥的数量
   * @router get /api/dashboard/keysMonth
   * * @request query string dated 查询月份
   * * @request query string createUser 密钥创建人
   * @response 200 keysMonth 返回结果
   */
  async keysMonth() {
    const ctx = this.ctx;
    const query = ctx.query;
    let params = {
      createUser: query.createUser
    };
    let dateds = query.dated.split("-");
    params.year = dateds[0];
    params.month = dateds[1];
    const result = await ctx.service.dashboard.keysMonth(params);
    this.result(result);
  }
}

module.exports = DashboardController;