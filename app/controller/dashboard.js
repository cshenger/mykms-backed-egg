const BaseController = require('./base');
const {
  secret
} = require('../../config/others');

class DashboardController extends BaseController {
  // 获取用户分布
  async userroles() {
    const data = await this.ctx.service.dashboard.userroles();
    this.result(data);
  }

  // 待办事项
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

  // 算法密钥分布
  async algorKeys() {
    const ctx = this.ctx;
    const params = ctx.query;
    const result = await ctx.service.dashboard.algorKeys(params);
    this.result(result);
  }

  // 密钥状态统计
  async statusKeys() {
    const ctx = this.ctx;
    const params = ctx.query;
    const result = await ctx.service.dashboard.statusKeys(params);
    this.result(result);
  }

  // 密钥日期趋势
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