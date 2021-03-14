const BaseController = require('./base');

/**
 * @controller 公共接口
 */

class HomeController extends BaseController {
  async index() {
    const {
      ctx
    } = this;
    ctx.body = 'hi, egg';
  }

  // 角色列表
  /**
   * @summary 查询全部角色
   * @description 查询全部角色
   * @router get /api/dict/roles
   * @request path
   * @response 200 dictRoles 返回结果
   */
  async roles() {
    const roles = await this.ctx.service.home.roles();
    this.result(roles);
  }

  // 算法名称列表
  /**
   * @summary 算法名称列表
   * @description 获取算法名称分类
   * @router get /api/dict/algors
   * @request path
   * @response 200 dictAlgors 返回结果
   */
  async algors() {
    const algors = await this.ctx.service.home.algors();
    this.result(algors);
  }

  // 算法模式下拉
  /**
   * @summary 算法模式下拉
   * @description 算法模式的下拉查询
   * @router get /api/dict/allAlgorWays
   * @request path
   * @response 200 daictWay 返回结果
   */
  async allAlgorWays() {
    const allAlgorWays = await this.ctx.service.home.allAlgorWays();
    this.result(allAlgorWays);
  }

  // 获取所有用户
  /**
   * @summary 获取所有用户
   * @description 获取所有用户下拉
   * @router get /api/dict/users
   * @request path
   * @response 200 dictUsers 返回结果
   */
  async users() {
    const users = await this.ctx.service.home.users();
    this.result(users);
  }

  // 获取密钥管理员用户
  /**
   * @summary 获取密钥管理员用户
   * @description 获取密钥管理员用户下拉
   * @router get /api/dict/keyAdminUsers
   * @request path
   * @response 200 dictUsers 返回结果
   */
  async keyAdminUsers() {
    const users = await this.ctx.service.home.keyAdminUsers();
    this.result(users);
  }

  // 获取密钥审核员用户
  /**
   * @summary 获取密钥审核员用户
   * @description 获取密钥审核员用户下拉
   * @router get /api/dict/keyAuditUsers
   * @request path
   * @response 200 dictUsers 返回结果
   */
  async keyAuditUsers() {
    const users = await this.ctx.service.home.keyAuditUsers();
    this.result(users);
  }
}

module.exports = HomeController;