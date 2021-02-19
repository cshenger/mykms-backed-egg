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

  // 获取密钥管理员用户
  async keyAdminUsers() {
    const users = await this.ctx.service.home.keyAdminUsers();
    this.result(users);
  }

  // 获取密钥审核员用户
  async keyAuditUsers() {
    const users = await this.ctx.service.home.keyAuditUsers();
    this.result(users);
  }
}

module.exports = HomeController;