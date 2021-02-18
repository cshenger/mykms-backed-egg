const BaseController = require('./base');

class HomeController extends BaseController {
  async index() {
    const {
      ctx
    } = this;
    ctx.body = 'hi, egg';
  }

  // 角色列表
  async roles() {
    const roles = await this.ctx.service.home.roles();
    this.result(roles);
  }

  // 算法名称列表
  async algors() {
    const algors = await this.ctx.service.home.algors();
    this.result(algors);
  }

  // 算法模式下拉
  async allAlgorWays() {
    const allAlgorWays = await this.ctx.service.home.allAlgorWays();
    this.result(allAlgorWays);
  }

  // 获取所有用户
  async users() {
    const users = await this.ctx.service.home.users();
    this.result(users);
  }
}

module.exports = HomeController;